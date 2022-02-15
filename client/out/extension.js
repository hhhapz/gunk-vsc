"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
let client;
function activate(context) {
    const config = vscode_1.workspace.getConfiguration("gunk");
    // If the LSP isn't enabled, don't start it.
    if (!config.get("lsp.enabled")) {
        return;
    }
    let args = [];
    if (config.get("lsp.linting")) {
        args.push("--lint");
    }
    if (config.get("lsp.commandArgs").trim() !== "") {
        args = config.get("lsp.commandArgs").split(" ");
    }
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions = {
        command: config.get("lsp.commandPath"),
        args: args,
    };
    // Options to control the language client
    const clientOptions = {
        documentSelector: ["gunk"],
    };
    // Create the language client and start the client.
    client = new node_1.LanguageClient("gunkls", "Gunk Language Server", serverOptions, clientOptions);
    // Start the client. This will also launch the server
    client.start();
}
exports.activate = activate;
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map