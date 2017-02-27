abstract class Request extends HtmlPusher {
    errorCatch: (xhr: JQueryXHR) => void;
    constructor(error: (xhr: JQueryXHR) => void) {
        super();
        this.errorCatch = error;
    }

    public requestXHR<T>(xhr: JQueryXHR): JQueryPromise<T> {
        var response = xhr;
        return response;
    }

    public request<T>(url: string, data?: any): JQueryPromise<T> {        
        var response = $.ajax({
            url: url,
            type: 'post',
            data: data,
            beforeSend: function (xhr, settings) { console.warn("authorization doesn't exists!"); },
            error: (xhr, z, u) => { this.errorCatch(xhr); }
        });        
        return response;
    }
}