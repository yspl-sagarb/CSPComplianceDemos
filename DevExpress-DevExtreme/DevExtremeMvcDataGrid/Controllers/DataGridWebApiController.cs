﻿using datagrid_webapi.Models;
using DevExtreme.AspNet.Data;
using DevExtreme.MVC.Demos.Models.DataGrid;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace DevExtremeMvcDataGrid.Controllers
{
    [Route("api/DataGridWebApi/{action}", Name = "DataGridWebApi")]
    public class DataGridWebApiController : ApiController
    {
        private Northwind _nwind = new Northwind();

        [HttpGet]
        public HttpResponseMessage Orders(DataSourceLoadOptions loadOptions)
        {
            return Request.CreateResponse(DataSourceLoader.Load(_nwind.Orders, loadOptions));
        }

        [HttpPost]
        public HttpResponseMessage InsertOrder(FormDataCollection form)
        {
            var values = form.Get("values");

            var newOrder = new Order();
            JsonConvert.PopulateObject(values, newOrder);

            Validate(newOrder);
            if (!ModelState.IsValid)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState.GetFullErrorMessage());

            _nwind.Orders.Add(newOrder);
            _nwind.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.Created, newOrder);
        }

        [HttpPut]
        public HttpResponseMessage UpdateOrder(FormDataCollection form)
        {
            var key = Convert.ToInt32(form.Get("key"));
            var values = form.Get("values");
            var order = _nwind.Orders.First(o => o.OrderID == key);

            JsonConvert.PopulateObject(values, order);

            Validate(order);
            if (!ModelState.IsValid)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState.GetFullErrorMessage());

            _nwind.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK, order);
        }

        [HttpDelete]
        public void DeleteOrder(FormDataCollection form)
        {
            var key = Convert.ToInt32(form.Get("key"));
            var order = _nwind.Orders.First(o => o.OrderID == key);

            _nwind.Orders.Remove(order);
            _nwind.SaveChanges();
        }

        // additional actions

        [HttpGet]
        public HttpResponseMessage OrderDetails(int orderID, DataSourceLoadOptions loadOptions)
        {
            return Request.CreateResponse(DataSourceLoader.Load(
                from i in _nwind.Order_Details
                where i.OrderID == orderID
                select new
                {
                    Product = i.Product.ProductName,
                    Price = i.UnitPrice,
                    i.Quantity,
                    Sum = i.UnitPrice * i.Quantity
                },
                loadOptions
            ));
        }

        [HttpGet]
        public HttpResponseMessage ShippersLookup(DataSourceLoadOptions loadOptions)
        {
            var lookup = from i in _nwind.Shippers
                         orderby i.CompanyName
                         select new
                         {
                             Value = i.ShipperID,
                             Text = i.CompanyName
                         };

            return Request.CreateResponse(DataSourceLoader.Load(lookup, loadOptions));
        }

        [HttpGet]
        public HttpResponseMessage CustomersLookup(DataSourceLoadOptions loadOptions)
        {
            var lookup = from i in _nwind.Customers
                         let text = i.CompanyName + " (" + i.Country + ")"
                         orderby i.CompanyName
                         select new
                         {
                             Value = i.CustomerID,
                             Text = text
                         };

            return Request.CreateResponse(DataSourceLoader.Load(lookup, loadOptions));
        }

        [HttpPost]
        public HttpResponseMessage Batch(List<DataChange> changes)
        {
            foreach (var change in changes)
            {
                Order order;

                if (change.Type == "update" || change.Type == "remove")
                {
                    var key = Convert.ToInt32(change.Key);
                    order = _nwind.Orders.First(o => o.OrderID == key);
                }
                else
                {
                    order = new Order();
                }

                if (change.Type == "insert" || change.Type == "update")
                {
                    JsonConvert.PopulateObject(change.Data.ToString(), order);

                    Validate(order);
                    if (!ModelState.IsValid)
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState.GetFullErrorMessage());

                    if (change.Type == "insert")
                    {
                        _nwind.Orders.Add(order);
                    }
                    change.Data = order;
                }
                else if (change.Type == "remove")
                {
                    _nwind.Orders.Remove(order);
                }
            }

            _nwind.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK, changes);
        }


        private IQueryable<Order> ApplyDataSourceLoadOptions(DataSourceLoadOptions options)
        {
            IQueryable<Order> data = _nwind.Orders.AsQueryable();
            // Apply sorting
            if (options.Sort != null && options.Sort.Length > 0)
            {
                foreach (var sortInfo in options.Sort)
                {
                    var parameter = Expression.Parameter(typeof(Order), "x");
                    var property = Expression.Property(parameter, sortInfo.Selector);
                    var lambda = Expression.Lambda<Func<Order, object>>(Expression.Convert(property, typeof(object)), parameter);
                    data = sortInfo.Desc ? data.OrderByDescending(lambda) : data.OrderBy(lambda);
                }
            }

            // Apply filtering
            if (options.Filter != null)
            {
                var parameter = Expression.Parameter(typeof(Order), "x");
                var predicate = Expression.Lambda<Func<Order, bool>>((Expression)options.Filter, parameter);
                data = data.Where(predicate);
            }

            // Apply paging
            data = data.Skip(options.Skip).Take(options.Take);

            return data;
        }
    }
}