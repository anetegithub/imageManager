class Request extends HtmlPusher {
    constructor(error) {
        super();
        this.errorCatch = error;
    }
    request(url, data) {
        var response = $.ajax({
            url: url,
            type: 'post',
            data: data,
            beforeSend: function (xhr, settings) { xhr.setRequestHeader('Authorization', 'Bearer ' + globalAuthToken); },
            error: (xhr, z, u) => { console.log(xhr); console.log(z); console.log(u); debugger; this.errorCatch(xhr); }
        });
        return response;
    }
}
//# sourceMappingURL=Request.js.map