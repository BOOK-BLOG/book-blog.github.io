var consoleLogger = function (state, text) {
    switch (state) {
        case "success":
            console.info("%c " + text + " ", "color:#00b700;background-color:#d9ffd9;border-radius:4px;padding:initial 4px;");
            break;
        default:
            console.info(text);
    }
}
