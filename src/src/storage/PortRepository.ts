import { ExtensionContext, Memento } from "vscode";
import { Port } from "../data/Port";
import { UUID } from "../utils/UUID";

class PortRepository {
  private PORT_REPORSITORY_KEY: string = "CH_PORT_REPORSITORY_KEY";
  public static INSTANCE: PortRepository = new PortRepository();

  private constructor() {}

  private ports: Array<Port> = [];

  private globalState!: Memento;

  public init(context: ExtensionContext) {
    this.globalState = context.globalState;
    let data = context.globalState.get<Array<Port>>(this.PORT_REPORSITORY_KEY);
    if (data) {
      this.ports = data;
    }
  }

  public all(): Array<Port> {
    return this.ports;
  }

  public get(id: UUID): Port | null {
    if (this.ports.length === 0) {
      return null;
    }

    let results: Array<Port> = this.ports.filter((p, i) => {
      return p.id.equals(id);
    });

    if (results.length === 0) {
      return null;
    }
    return results[0];
  }

  public add(port: Port) {
    this.ports.push(port);

    this.globalState.update(this.PORT_REPORSITORY_KEY, this.ports);
  }
}

export { PortRepository };
