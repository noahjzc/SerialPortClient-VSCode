// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { PortNodeProvider } from "./portNodeProvider";
import { PortRepository } from "./storage/PortRepository";
import { Port, Parity, StopBits, Handshake } from "./data/Port";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const portNodeProvider = new PortNodeProvider();
  const portRepository = PortRepository.INSTANCE;
  portRepository.init(context);

  portRepository.add(
    new Port("testA", "COM1", 1, Parity.Even, 1, StopBits.None, Handshake.None)
  );
  portRepository.add(
    new Port("testB", "COM2", 1, Parity.Even, 1, StopBits.None, Handshake.None)
  );
  portRepository.add(
    new Port("testC", "COM3", 1, Parity.Even, 1, StopBits.None, Handshake.None)
  );

  vscode.window.registerTreeDataProvider("portNodes", portNodeProvider);
  vscode.commands.registerCommand("serialportclient.refresh", () =>
    portNodeProvider.refresh()
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
