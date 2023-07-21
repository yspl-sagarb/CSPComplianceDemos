using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DevExtremeMvcDataGrid.Controllers
{
    public class PopUpController : Controller
    {
        // GET: PopUp
        public ActionResult Index()
        {
            return View("~/Views/PopUp/_PopUp.cshtml");
        }
    }
}