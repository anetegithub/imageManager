class ServerTimeBinding extends Binding {

    constructor() {
        super($('.nav-wrapper'));
        GlobalBindings.execute(ServerTimeBinding);
    }

    fieldUrlCollection() {
        return [
            new BindingField({
                field: 'updated',
                url: '/api/utils/servertime/'
            })
        ];
    }
}