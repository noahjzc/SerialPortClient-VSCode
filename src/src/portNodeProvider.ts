import * as vscode from "vscode";
import * as path from "path";
import { PortRepository } from "./storage/PortRepository";

export class PortNodeProvider implements vscode.TreeDataProvider<PortNode> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    PortNode | undefined
  > = new vscode.EventEmitter<PortNode | undefined>();
  readonly onDidChangeTreeData: vscode.Event<PortNode | undefined> = this
    ._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: PortNode): vscode.TreeItem {
    return element;
  }

  getChildren(element?: PortNode | undefined): Thenable<PortNode[]> {
    let ports = PortRepository.INSTANCE.all();

    if (ports.length === 0) {
      return Promise.resolve([]);
    }

    return Promise.resolve(
      ports.map(p => {
        return new PortNode(
          p.name,
          p.portName,
          vscode.TreeItemCollapsibleState.None
        );
      })
    );
  }
}

class PortNode extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    private portName: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }

  get tooltip(): string {
    return this.label;
  }

  get description(): string {
    return this.portName;
  }

  iconPath = {
    light: path.join(__filename, "..", "..", "resources", "light", "node.svg"),
    dark: path.join(__filename, "..", "..", "resources", "dark", "node.svg")
  };

  contextValue = "port-node";
}
