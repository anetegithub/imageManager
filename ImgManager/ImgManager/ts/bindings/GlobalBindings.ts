class GlobalBindings {
    private static get globalBindings(): Binding[] {
        if (window['globalBindings'] == null)
            window['globalBindings'] = new Array();
        return window['globalBindings'] as Binding[];
    }
    private static set setGlobal(bindings: Binding[]) {
        window['globalBindings'] = bindings;
    }

    static bind<T extends Binding>(binding: T) {        
        GlobalBindings.globalBindings.push(binding);
    }
    static unbind<T extends Binding>(ctor: { new (...args: any[]): T }) {
        var binding = GlobalBindings.getBinding(ctor);
        if (binding != null)
            GlobalBindings.setGlobal = GlobalBindings.globalBindings.remove(binding);
    }
    static getBinding<T extends Binding>(ctor: { new (...args: any[]): T }): any {
        var enumerable = GlobalBindings.globalBindings
            .filter(x => x instanceof ctor);
        if (enumerable.length > 0)
            return enumerable[0];
        return null;
    }

    static execute<T extends Binding>();
    static execute<T extends Binding>(ctor: { new (...args: any[]): T });
    static execute<T extends Binding>(...args: any[]) {
        let executable = GlobalBindings.globalBindings;
        if (args.length > 0)
            executable = executable.filter(x => x instanceof (args[0] as { new (...args: any[]): T }));
        $.each(executable, (i, v) => {
            v.execute();
        });
    }
}