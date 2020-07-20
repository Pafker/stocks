export class ViewRenderer {
    public async getView(context: any) {
        const content = `
            <!DOCTYPE html>
            <html>
                <head>
                    <style>
                    table {
                        border-collapse: collapse;
                        margin-top: 10px;
                    }

                    table, th, td {
                        border: 1px solid black;
                    }

                    h1 {
                        color: red;
                    }
                    </style>
                    <title>Stocks</title>
                </head>
                <body onload="getStocks()">
                    <h1>Stocks</h1>
                    <p>Stocks website</p>
                    <br>

                    <label for="stockName">Stock name:</label><br>
                    <input type="text" id="stockName" name="stockName">
                    <button onclick="addStock()">Add</button>

                    <table>
                    </table>

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
                            location.reload();
                            return;
                        });
                    }

                    function getStocks() {
                        const opts = {
                            method: 'GET'
                        };
                        fetch('/stocks', opts).then(function (response) {
                            return response.json();
                        })
                        .then(function (body) {
                            let table = document.querySelector("table");

                            for (let element of body) {
                                let row = table.insertRow();
                                let cell = row.insertCell();
                                let text = document.createTextNode(element);
                                cell.appendChild(text);

                                let cell2 = row.insertCell();
                                let button = document.createElement('button');
                                button.textContent = 'remove';
                                button.onclick = function(){
                                    const opts = {
                                        method: 'DELETE',
                                    };
                                    fetch('/stocks/' + element, opts).then(function (response) {
                                        location.reload();
                                        return;
                                    });

                                    return false;
                                };
                                cell2.appendChild(button);
                            }
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