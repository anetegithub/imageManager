class UploadedImagesBinding extends Binding {
    public Contract: SortingContract;

    constructor() {
        super($('.screen'));
        this.Contract = new SortingContract({
            page: 1,
            pageSize: 9,
            property: 'Id',
            order: Order.Descending
        });
    }

    fieldUrlCollection() {
        var handler = this.imageGridHandler;
        return [
            new BindingField({
                field: 'image-grid',
                url: '/api/images/read/',
                datahandler: handler,
                requestParams: this.Contract
            })
        ];
    }
    
    increment() {
        this.Contract.page++;
        this.execute();
    }

    decrement() {
        this.Contract.page--;
        this.execute();
    }

    async imageGridHandler($this: Binding, data: any) {
        var html = $();
        //for (let i = 0; i < data.length; i++) {
        //    var transaction = data[i];
        //    var template = await $this.request<string>('/templates/get/', { name: 'TransactionHistory' });
        //    template = template.replace('{{Operation}}', transaction.operation == 0 ? "Debit" : "Credit");
        //    template = template.replace('{{From/To}}', transaction.operation == 0 ? "To" : "From");
        //    template = template.replace('{{Person}}', transaction.UserName);
        //    template = template.replace('{{OperationSign}}', transaction.operation == 0 ? "-" : "+");
        //    template = template.replace('{{PW}}', transaction.amount);
        //    template = template.replace('{{When}}', transaction.when);
        //    template = template.replace('{{Total}}', transaction.total);
        //    html = html.add($(template));
        //}
        //debugger;
        $this["usertransactions"] = html.wrapAll($("<div>")).parent().html();
    }
}