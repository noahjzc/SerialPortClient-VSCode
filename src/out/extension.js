"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const portNodeProvider_1 = require("./portNodeProvider");
const PortRepository_1 = require("./storage/PortRepository");
const Port_1 = require("./data/Port");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const portNodeProvider = new portNodeProvider_1.PortNodeProvider();
    const portRepository = PortRepository_1.PortRepository.INSTANCE;
    portRepository.init(context);
    portRepository.add(new Port_1.Port("testA", "COM1", 1, Port_1.Parity.Even, 1, Port_1.StopBits.None, Port_1.Handshake.None));
    portRepository.add(new Port_1.Port("testB", "COM2", 1, Port_1.Parity.Even, 1, Port_1.StopBits.None, Port_1.Handshake.None));
    portRepository.add(new Port_1.Port("testC", "COM3", 1, Port_1.Parity.Even, 1, Port_1.StopBits.None, Port_1.Handshake.None));
    vscode.window.registerTreeDataProvider("portNodes", portNodeProvider);
    vscode.commands.registerCommand("serialportclient.refresh", () => portNodeProvider.refresh());
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map