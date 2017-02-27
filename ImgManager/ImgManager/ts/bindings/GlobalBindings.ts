class GlobalBindings {
    private static get globalBindings(): Binding[] {
        if (window['globalBindings'] == null)
            window['globalBindings'] = new Array();
        return window['globalBindings'] as Binding[];
    }
    private static set setGlobal(bindings: Binding[]) {
        window['globalBindings'] = bindings;
    }

    static bind(binding: Binding) {
        GlobalBindings.globalBindings.push(binding);
    }
    static unbind<T extends Binding>(ctor: { new (...args: any[]): T }) {
        var enumerable = GlobalBindings.globalBindings
            .filter(x => x instanceof ctor);
        if (enumerable.length > 0)
            GlobalBindings.setGlobal = GlobalBindings.globalBindings.remove(enumerable[0]);
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