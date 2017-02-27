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

    public request<T>(url: string, data?: any, httpMethod?: string, contentType?: string): JQueryPromise<T> {
        var response = $.ajax({
            url: url,
            type: httpMethod || 'post',
            data: data,
            beforeSend: function (xhr, settings) { console.warn("authorization doesn't exists!"); },
            error: (xhr, z, u) => { this.errorCatch(xhr); },
            contentType: contentType || "application/x-www-form-urlencoded"
        });
        return response;
    }
}