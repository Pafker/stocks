export class ViewRenderer {
    public async getView(context: any) {
        const content = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Stocks</title>
                </head>
                <body>
                    <h1 style="color: red"=>Stocks</h1>
                    <br>
                    <p>Stocks website</p>
                    <form action="/stocks" enctype="multipart/form-data" method="post">
                        <label for="name">First name:</label><br>
                        <input type="text" id="name" name="name"><br>
                        <input type="submit" value="Submit">
                    </form>
                </body>
            </html>
        `;
        context.response.type = 'text/html';
        context.response.body = content;
    }
}