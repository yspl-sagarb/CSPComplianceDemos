$(() =>
{
    const url = 'http://localhost:64713/api/DataGridWebApi';
    $('#grid').dxDataGrid({
        dataSource: {
            // Specify your ASP.NET MVC controller action to retrieve data
            remoteOperations: {
                sorting: true,
                filtering: true,
                paging: true,
                groupPaging: false,
                grouping: false,
                summary: false
            },
            pageSize: 20,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
            store: DevExpress.data.AspNet.createStore({
                key: 'OrderID',
                loadUrl: `${url}/Orders`,
                insertUrl: `${url}/InsertOrder`,
                updateUrl: `${url}/UpdateOrder`,
                deleteUrl: `${url}/DeleteOrder`,
                onBeforeSend(method, ajaxOptions)
                {
                    ajaxOptions.xhrFields = { withCredentials: true };
                },
            }),
        },
         
        editing: {
            mode: 'row',
            allowAdding: true,
            allowDeleting: true,
            allowUpdating: true,
            confirmDelete: true,
            useIcons: true,
            newRowPosition: 'viewportBottom',
        },

        //filterPanel: { visible: true },

        headerFilter: { visible: true },
        filterRow: {
            visible: true,
            applyFilter: 'auto',
        },

        //filterBuilderPopup: {
        //    position: {
        //        of: window, at: 'top', my: 'top', offset: { y: 10 },
        //    },
        //},
        //rowDragging: {
        //    allowReordering: true,

        //},

        rowAlternationEnabled: true,
        showColumnLines: true,
        showRowLines: true,
        focusedRowEnabled: true,
        focusedRowIndex: 0,
        columnAutoWidth: true,
        columnResizingMode: 'nextColumn',
        cellHintEnabled: true,
        cacheEnabled: false,
        allowColumnResizing: true,
        // repaintChangesOnly: true,
        remoteOperations: true,
        columnChooser: {
            enabled: true,
            mode: "select", // or "dragAndDrop"
            position: {
                my: "right top",
                at: "right bottom",
                of: ".dx-datagrid-column-chooser-button"
            }
        },
        columns: [

            {
                dataField: 'AttachmentIcon',
                caption: '',
                allowFiltering: false,
                allowSorting: false,
                width: "auto",
                cellTemplate(container, options)
                {
                    $('<div>')
                        .append($('<img>', {
                            src: 'http://localhost:64713/Content/image/icon-attachment.png'
                        }).attr('attachmentonclick', 'attachmentonclick'))
                        .appendTo(container);
                }
                ,
            },
            {
                dataField: 'CustomerID',
                caption: 'Customer',
                width: "auto",
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field Customer must be a string with a maximum length of 5.',
                    max: 5,
                }],
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: 'Value',
                        loadUrl: `${url}/CustomersLookup`,
                        onBeforeSend(method, ajaxOptions)
                        {
                            ajaxOptions.xhrFields = { withCredentials: true };
                        },
                    }),
                    valueExpr: 'Value',
                    displayExpr: 'Text',
                },
            },
            {
                dataField: 'OrderDate',
                dataType: 'date',
                width: "auto",
                validationRules: [{
                    type: 'required',
                    message: 'The OrderDate field is required.',
                }],
            },
            {
                dataField: 'Freight',
                width: "auto",
                allowEditing: false,
                headerFilter: {
                    groupInterval: 100,
                },
                validationRules: [{
                    type: 'range',
                    message: 'The field Freight must be between 0 and 2000.',
                    min: 0,
                    max: 2000,
                }],
            },
            {
                dataField: 'ShipCountry',
                width: "auto",
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field ShipCountry must be a string with a maximum length of 15.',
                    max: 15,
                }],
            },
            {
                dataField: 'ShipVia',
                caption: 'Shipping Company',
                width: "auto",
                dataType: 'number',
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: 'Value',
                        loadUrl: `${url}/ShippersLookup`,
                        onBeforeSend(method, ajaxOptions)
                        {
                            ajaxOptions.xhrFields = { withCredentials: true };
                        },
                    }),
                    valueExpr: 'Value',
                    displayExpr: 'Text',
                },
            },
        ],

        allowColumnReordering: true,
        hoverStateEnabled: true,

        grouping: {
            autoExpandAll: true,
        },

        groupPanel: {
            visible: true,
        },

        height: 900,
        showBorders: true,

        selection: {
            mode: 'single',
        },
         
        //toolbar: {
        //    items: [

        //        {
        //            location: 'after',
        //            widget: 'dxButton',
        //            options: {
        //                icon: 'refresh',
        //                onClick()
        //                {
                            
        //                },
        //            },
        //        },


        //    ],

        //},
        summary: {
            totalItems: [{
                column: 'Freight',
                summaryType: 'sum',
            }],
            groupItems: [{
                column: 'Freight',
                summaryType: 'sum',
            }, {
                summaryType: 'count',
            },
            ],
        },
    });

    $(document).off('click', '[attachmentonclick]'); //Event is de-registered properly.
    $(document).on('click', '[attachmentonclick]', function (args)
    {
        alert('attachment clicked');

    });
});
