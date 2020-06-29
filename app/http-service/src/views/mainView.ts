export class ViewRenderer {
    public async getView(context: any) {
        const content = `<h1 style="color: red"=>Stocks</h1><br><p>Stocks website</p>`;
        context.response.type = 'text/html';
        context.response.body = content;
    }
}