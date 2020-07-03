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
                    <br>

                    <label for="test">Stock name:</label><br>
                    <input type="text" id="stockName" name="stockName">
                    <button onclick="addStock()">Add</button>
                    <p id="demo"></p>

                    <script>
                    function addStock() {
                        const stockName = document.getElementById("stockName").value;

                        const opts = {
                            method: 'POST',
                            body: JSON.stringify({"name": stockName})
                        };
                        fetch('/stocks', opts).then(function (response) {
                            return response.json();
                        })
                        .then(function (body) {
                            document.getElementById("demo").innerHTML = JSON.stringify(body);
                        });
                    }
                    </script>
                </body>
            </html>
        `;
        context.response.type = 'text/html';
        context.response.body = content;
    }
}