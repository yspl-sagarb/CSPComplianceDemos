$(document).ready(function ()
{
    $("#btnClick").click(function ()
    {
        //debugger;
        $.get('http://localhost:64713/HTMLEditor/PaintHTMLEditor',
            function (response)
            {
                //debugger;
                //var popup = $("#detailsPopup").dxPopup('instance');
                popup.option("contentTemplate", response);
                popup.show();
            });
    })

    const popup = $('#popup')
        .dxPopup({
            width: 360,
            height: 320,
            visible: false,
            title: "Information",
            //showTitle: false,
            //visible: true,
            hideOnOutsideClick: true,
            showCloseButton: true, showfooter: () =>
            {

            },
        })
        .dxPopup('instance');
});