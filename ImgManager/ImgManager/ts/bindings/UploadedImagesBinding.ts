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
                requestParams: JSON.stringify(this.Contract),
                contentType: 'application/json'
            })
        ];
    }

    async imageGridHandler($this: UploadedImagesBinding, uploaded: UploadedImages) {
        var template = await $this.request<string>('/interface/template/', { name: 'image-grid' });
        for (let i = 0; i < 9; i++) {
            var replacedBy: string;
            if (uploaded.data[i] != undefined) {
                var imgInfo = uploaded.data[i];
                replacedBy = '<div class="card '+(imgInfo.itsNew ? 'glow' : '')+'">\
                    <div class="card-image">\
                        <img src="'+ imgInfo.VirtualPath + '">\
                        <span class="card-title">'+ imgInfo.Name + '</span>\
                    </div>\
                </div>';
            } else
                replacedBy = '';
            template = template.replace('{{' + i + '}}', replacedBy);
        }
        await $this.pagination($this, uploaded);
        $this["image-grid"] = $(template).wrapAll($("<div>")).parent().html();
    }

    async pagination($this: UploadedImagesBinding, uploaded: UploadedImages) {
        var template = await $this.request<string>('/interface/template/', { name: 'paging' });
        let ul: string = '';
        var total = Math.fround(uploaded.total / $this.Contract.pageSize) + 1;
        for (let i = 1; i < total; i++) {
            ul += '<li data-model-submit="true" data-model-action="turn" data-model-param-turn="' + i + '" class="waves-effect ' + ($this.Contract.page == i ? 'active' : '') + '"><a href="#!">' + i + '</a></li>';
        }
        var $template = $(template.replace('{{pagination}}', ul));
        debugger;
        new Paging($template, total);
    }
}