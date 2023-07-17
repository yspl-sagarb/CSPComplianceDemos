const tabs = [{ name: 'From This Device', value: ['file'] }, { name: 'From the Web', value: ['url'] }, { name: 'Both', value: ['file', 'url'] }];

const markup = `
    <h2>
        <img src="images/widgets/HtmlEditor.svg" alt="HtmlEditor">
        Formatted Text Editor (HTML Editor)
    </h2>
    <br>
    <p>DevExtreme JavaScript HTML Editor is a client-side WYSIWYG text editor that allows its users to format textual and visual content and store it as HTML or Markdown.</p>
    <p>Supported features:</p>
    <ul>
        <li>Inline formats:
            <ul>
                <li><strong>Bold</strong>, <em>italic</em>, <s>strikethrough</s> text formatting</li>
                <li>Font, size, color changes (HTML only)</li>
            </ul>
        </li>
        <li>Block formats:
            <ul>
                <li>Headers</li>
                <li>Text alignment</li>
                <li>Lists (ordered and unordered)</li>
                <li>Code blocks</li>
                <li>Quotes</li>
            </ul>
        </li>
        <li>Custom formats</li>
        <li>HTML and Markdown support</li>
        <li>Mail-merge placeholders (for example, %username%)</li>
        <li>Adaptive toolbar for working images, links, and color formats</li>
        <li>Image upload: drag-and-drop images onto the form, select files from the file system, or specify a URL.</li>
        <li>Copy-paste rich content (unsupported formats are removed)</li>
        <li>Tables support</li>
    </ul>
    <br>
    <p>Supported frameworks and libraries</p>
    <table>
        <tr>
            <td><strong>jQuery</strong></td>
            <td style="text-align: right;">v2.1 - v2.2 and v3.x</td>
        </tr>
        <tr>
            <td><strong>Angular</strong></td>
            <td style="text-align: right;">v7.0+</td>
        </tr>
        <tr>
            <td><strong>React</strong></td>
            <td style="text-align: right;">v16.2+</td>
        </tr>
        <tr>
            <td><strong>Vue</strong></td>
            <td style="text-align: right;">v2.6.3+</td>
        </tr>
    </table>
`;

$(() =>
{
    const editor = $('.html-editor').dxHtmlEditor({
        height: 725,
        value: markup,
        imageUpload: {
            tabs: ['file', 'url'],
            fileUploadMode: 'base64',
        },
        toolbar: {
            items: [
                'undo', 'redo', 'separator',
                {
                    name: 'size',
                    acceptedValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
                },
                {
                    name: 'font',
                    acceptedValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'],
                },
                'separator', 'bold', 'italic', 'strike', 'underline', 'separator',
                'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'separator',
                'orderedList', 'bulletList', 'separator',
                {
                    name: 'header',
                    acceptedValues: [false, 1, 2, 3, 4, 5],
                }, 'separator',
                'color', 'background', 'separator',
                'link', 'image', 'separator',
                'clear', 'codeBlock', 'blockquote', 'separator',
                'insertTable', 'deleteTable',
                'insertRowAbove', 'insertRowBelow', 'deleteRow',
                'insertColumnLeft', 'insertColumnRight', 'deleteColumn',
            ],
        },
        mediaResizing: {
            enabled: true,
        },
    }).dxHtmlEditor('instance');

    $('#multiline').dxCheckBox({
        text: 'Multiline toolbar',
        value: true,
        onValueChanged(e)
        {
            editor.option('toolbar.multiline', e.value);
        },
    });

    $('#image-uploader-tabs').dxSelectBox({
        items: tabs,
        value: tabs[2].value,
        inputAttr: { 'aria-label': 'Tab' },
        valueExpr: 'value',
        displayExpr: 'name',
        onValueChanged: (e) =>
        {
            editor.option('imageUpload.tabs', e.value);
        },
    });
});