class Uploading extends ViewModel {
    
    modelValidation(): Validator {
        return new Validator('Uploading', x => { return this.validFiles(); }, 'Not suitable files! Not more then 9 picture files!');
    }
    submit() { this.upload(this); }

    back($this) {
        
        Application.MainScreen();
    }

    validFiles(): boolean {
        

        var valid = true;
        var validExtensions = [
            "jpg",
            "jpeg",
            "gif",
            "tiff",
            "png",
        ];

        var files = $('form')[0][0].files as FileList;
        for (let i = 0; i < files.length; i++) {
            if (validExtensions.indexOf(files[i].name.fileNameExtension().toLowerCase()) == -1)
                valid = false;
        }

        if (valid)
            valid = files.length > 0
                && files.length < 9;

        return valid;
    }

    async upload($this) {
        var uploaded = await ($this as Uploading).requestXHR<UploadedImages>($.ajax({
            url: 'api/images/create',
            type: 'PUT',
            data: new FormData($('form')[0] as HTMLFormElement),
            cache: false,
            contentType: false,
            processData: false,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', function (e) {
                        
                        if (e.lengthComputable) {
                            $('.determinate').css('width', ((e.loaded / e.total) * 100).toString() + "%");
                        }
                    }, false);
                }
                return myXhr;
            },
        }));

        var template = await ($this as Uploading).request<string>('/interface/template/', { name: 'image-grid' });
        for (let i = 0; i < 9; i++) {
            var replacedBy: string;
            if (uploaded.data[i] != undefined) {
                var imgInfo = uploaded.data[i];
                replacedBy = '<div class="card">\
                    <div class="card-image">\
                        <img src="'+ imgInfo.VirtualPath + '">\
                        <span class="card-title">'+ imgInfo.Name + '</span>\
                    </div>\
                </div>';
            } else
                replacedBy = '';
            template = template.replace('{{' + i + '}}', replacedBy);
        }

        $('.image-grid').html('');
        $('.image-grid').append($(template));
    }
}