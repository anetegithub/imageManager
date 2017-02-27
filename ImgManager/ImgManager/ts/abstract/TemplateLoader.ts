abstract class TemplateLoader extends ServerLinked {
    public async fromTemplate(template: string) {
        return await this.request<string>('interface/template/', { name: template });
    }
}