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
                        padding: 10px 10px 10px 10px;
                    }

                    h1 {
                        color: black;
                    }
                    </style>
                    <title>Stocks</title>
                </head>
                <body onload="getStocks()">
                    <h1>Stocks</h1>
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
                            let header = table.createTHead();
                            let headerRow = header.insertRow(0);

                            const cells = ["Stock name", "Opening price", "Current price", "Change", "Action"];
                            let cell;
                            cells.forEach((c) => {
                                cell = headerRow.insertCell();
                                cell.innerHTML = \`<b>\${c}</b>\`;
                            })

                            for (let element of body) {
                                let row = table.insertRow();
                                
                                const elements = [element.name, element.quote.o || 0, element.quote.c || 0, \`\${element.change.toFixed(2)} %\`];
                                let cell, text;
                                elements.forEach((e) => {
                                    cell = row.insertCell();
                                    text = document.createTextNode(e);
                                    cell.appendChild(text);
                                })

                                let actionCell = row.insertCell();
                                let button = document.createElement('button');
                                button.textContent = 'remove';
                                button.onclick = function(){
                                    const opts = {
                                        method: 'DELETE',
                                    };
                                    fetch('/stocks/' + element.name, opts).then(function (response) {
                                        location.reload();
                                        return;
                                    });

                                    return false;
                                };
                                actionCell.appendChild(button);
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