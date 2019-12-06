"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const PortRepository_1 = require("./storage/PortRepository");
class PortNodeProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this
            ._onDidChangeTreeData.event;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        let ports = PortRepository_1.PortRepository.INSTANCE.all();
        if (ports.length === 0) {
            return Promise.resolve([]);
        }
        return Promise.resolve(ports.map(p => {
            return new PortNode(p.name, p.portName, vscode.TreeItemCollapsibleState.None);
        }));
    }
}
exports.PortNodeProvider = PortNodeProvider;
class PortNode extends vscode.TreeItem {
    constructor(label, portName, collapsibleState, command) {
        super(label, collapsibleState);
        this.label = label;
        this.portName = portName;
        this.collapsibleState = collapsibleState;
        this.command = command;
        this.iconPath = {
            light: path.join(__filename, "..", "..", "resources", "light", "node.svg"),
            dark: path.join(__filename, "..", "..", "resources", "dark", "node.svg")
        };
        this.contextValue = "port-node";
    }
    get tooltip() {
        return this.label;
    }
    get description() {
        return this.portName;
    }
}
//# sourceMappingURL=portNodeProvider.js.map