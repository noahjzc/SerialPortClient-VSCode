"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PortRepository {
    constructor() {
        this.PORT_REPORSITORY_KEY = "CH_PORT_REPORSITORY_KEY";
        this.ports = [];
    }
    init(context) {
        this.globalState = context.globalState;
        let data = context.globalState.get(this.PORT_REPORSITORY_KEY);
        if (data) {
            this.ports = data;
        }
    }
    all() {
        return this.ports;
    }
    get(id) {
        if (this.ports.length === 0) {
            return null;
        }
        let results = this.ports.filter((p, i) => {
            return p.id.equals(id);
        });
        if (results.length === 0) {
            return null;
        }
        return results[0];
    }
    add(port) {
        this.ports.push(port);
        this.globalState.update(this.PORT_REPORSITORY_KEY, this.ports);
    }
}
exports.PortRepository = PortRepository;
PortRepository.INSTANCE = new PortRepository();
//# sourceMappingURL=PortRepository.js.map