import { ExtensionContext, workspace } from "vscode";

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  const config = workspace.getConfiguration("gunk");

  // If the LSP isn't enabled, don't start it.
  if (!config.get("lsp.enabled")) {
    return;
  }

  let args = [];
  if (config.get("lsp.linting")) {
    args.push("--lint");
  }
  if (config.get<string>("lsp.commandArgs").trim() !== "") {
    args = config.get<string>("lsp.commandArgs").split(" ");
  }

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    command: config.get("lsp.commandPath"),
    args: args,
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    documentSelector: ["gunk"],
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    "gunkls",
    "Gunk Language Server",
    serverOptions,
    clientOptions
  );

  // Start the client. This will also launch the server
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
