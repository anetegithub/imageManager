class ServerLinked extends Request {
    constructor() {
        super((xhr) => {
            if (xhr != null) {
                if (xhr.status == 400) {
                    var errObj = JSON.parse(xhr.responseText);
                    if (errObj.ModelState != null)
                        $.each(errObj.ModelState[""], (i, v) => Materialize.toast(v, 4000, 'red'));
                    else
                        Materialize.toast(errObj.error_description, 4000, 'red');
                }
                if (xhr.status == 401)
                    Materialize.toast('Wrong email or password!', 4000, 'red');
            }
        });
    }
    request(url, data) {
        var request = super.request(url, data);
        request.done(() => {
            $.each(globalBindings, (i, v) => {
                v.execute();
            });
        });
        return request;
    }
}
//# sourceMappingURL=ServerLinked.js.map