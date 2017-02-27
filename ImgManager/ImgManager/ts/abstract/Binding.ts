abstract class Binding extends Request {

    constructor(view: JQuery) {
        super((xhr) => { });
        debugger;
        view.find('[data-binding-field]').each((i, v) => {
            var $jE = $(v);
            var field = $jE.attr('data-binding-field');
            var stageAttr = $jE.attr('data-binding-stage');

            Object.defineProperty(this, field, {
                set: (val) => {
                    if (stageAttr == null || stageAttr == 'text')
                        $jE.text(val);
                    else
                        $jE.html(val);
                }
            });
            $jE.removeAttr('data-binding-field');
            $jE.removeAttr('data-binding-stage');
        });

        view.find('[data-binding-action]').each((i, e) => {
            var jB = $(e);            
            var action = this[jB.attr('data-binding-action')];
            if (action != null)
                jB.click(x => {
                    action(this);
                });
            jB.removeAttr('data-binding-action');
        });
    }

    execute() {
        var fieldUrl = this.fieldUrlCollection();
        $.each(fieldUrl, (i, v) => {
            this.fieldBind(v);
        });
    }

    private fieldBind(binding: BindingField) {
        var promise = this.request(binding.url, binding.requestParams);
        promise.then(
            (x) => {
                if (binding.datahandler != null)
                    binding.datahandler(this,x);
                else
                    this[binding.field] = x || '';
            }, (x) => {
                this[binding.field] = '';
            });
    }

    abstract fieldUrlCollection(): BindingField[];
}

class BindingField {
    field: string;
    url: string;
    requestParams: any;
    datahandler: ($this: Binding, data: any) => void;

    public constructor(
        fields?: {
            field?: string,
            url?: string,
            datahandler?: ($this: Binding, data: any) => void,
            requestParams?: any
        }) {
        if (fields) Object.assign(this, fields);
    }
}