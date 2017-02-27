class HtmlPusher {
    pushOnScreen(html, attach) {
        var target = $('.screen');
        switch (attach) {
            case AttachType.After:
                target.after(html);
                break;
            case AttachType.Before:
                target.before(html);
                break;
            case AttachType.Append:
                target.append(html);
                break;
            case AttachType.Prepend:
                target.prepend(html);
                break;
            case AttachType.Inside:
                target.html('');
                target.append(html);
                break;
            case AttachType.Replace:
                target.replaceWith(html);
                break;
            default: break;
        }
    }
}
//# sourceMappingURL=HtmlPusher.js.map