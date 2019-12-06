"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUID_1 = require("../utils/UUID");
class Port {
    constructor(name, portName, baudRate, parity, dataBits, stopBits, handshake) {
        this._id = UUID_1.UUID.newId();
        this._name = name;
        this._portName = portName;
        this._baudRate = baudRate;
        this._parity = parity;
        this._dataBits = dataBits;
        this._stopBits = stopBits;
        this._handshake = handshake;
    }
    get id() {
        return this._id;
    }
    set id(v) {
        this._id = v;
    }
    get name() {
        return this._name;
    }
    set name(v) {
        this._name = v;
    }
    get portName() {
        return this._portName;
    }
    set portName(v) {
        this._portName = v;
    }
    get baudRate() {
        return this._baudRate;
    }
    set baudRate(v) {
        this._baudRate = v;
    }
    get parity() {
        return this._parity;
    }
    set parity(v) {
        this._parity = v;
    }
    get dataBits() {
        return this._dataBits;
    }
    set dataBits(v) {
        this._dataBits = v;
    }
    get stopBits() {
        return this._stopBits;
    }
    set stopBits(v) {
        this._stopBits = v;
    }
    get value() {
        return this._handshake;
    }
    set value(v) {
        this._handshake = v;
    }
}
exports.Port = Port;
var Parity;
(function (Parity) {
    Parity[Parity["None"] = 0] = "None";
    Parity[Parity["Odd"] = 1] = "Odd";
    Parity[Parity["Even"] = 2] = "Even";
    Parity[Parity["Mark"] = 3] = "Mark";
    Parity[Parity["Space"] = 4] = "Space";
})(Parity || (Parity = {}));
exports.Parity = Parity;
var StopBits;
(function (StopBits) {
    StopBits[StopBits["None"] = 0] = "None";
    StopBits[StopBits["One"] = 1] = "One";
    StopBits[StopBits["Twho"] = 2] = "Twho";
    StopBits[StopBits["OnePointFive"] = 3] = "OnePointFive";
})(StopBits || (StopBits = {}));
exports.StopBits = StopBits;
var Handshake;
(function (Handshake) {
    Handshake[Handshake["None"] = 0] = "None";
    Handshake[Handshake["XOnXOff"] = 1] = "XOnXOff";
    Handshake[Handshake["RequestToSend"] = 2] = "RequestToSend";
    Handshake[Handshake["RequestToSendXOnXOff"] = 3] = "RequestToSendXOnXOff";
})(Handshake || (Handshake = {}));
exports.Handshake = Handshake;
//# sourceMappingURL=Port.js.map