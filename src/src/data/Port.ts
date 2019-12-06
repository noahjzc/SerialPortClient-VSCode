import { UUID } from "../utils/UUID";

class Port {
  constructor(
    name: string,
    portName: string,
    baudRate: Number,
    parity: Parity,
    dataBits: Number,
    stopBits: StopBits,
    handshake: Handshake
  ) {
    this._id = UUID.newId();
    this._name = name;
    this._portName = portName;
    this._baudRate = baudRate;
    this._parity = parity;
    this._dataBits = dataBits;
    this._stopBits = stopBits;
    this._handshake = handshake;
  }

  private _id: UUID;
  public get id(): UUID {
    return this._id;
  }
  public set id(v: UUID) {
    this._id = v;
  }

  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(v: string) {
    this._name = v;
  }

  private _portName: string;
  public get portName(): string {
    return this._portName;
  }
  public set portName(v: string) {
    this._portName = v;
  }

  private _baudRate: Number;
  public get baudRate(): Number {
    return this._baudRate;
  }
  public set baudRate(v: Number) {
    this._baudRate = v;
  }

  private _parity: Parity;
  public get parity(): Parity {
    return this._parity;
  }
  public set parity(v: Parity) {
    this._parity = v;
  }

  private _dataBits: Number;
  public get dataBits(): Number {
    return this._dataBits;
  }
  public set dataBits(v: Number) {
    this._dataBits = v;
  }

  private _stopBits: StopBits;
  public get stopBits(): StopBits {
    return this._stopBits;
  }
  public set stopBits(v: StopBits) {
    this._stopBits = v;
  }

  private _handshake: Handshake;
  public get value(): Handshake {
    return this._handshake;
  }
  public set value(v: Handshake) {
    this._handshake = v;
  }
}

enum Parity {
  None,
  Odd,
  Even,
  Mark,
  Space
}

enum StopBits {
  None,
  One,
  Twho,
  OnePointFive
}

enum Handshake {
  None,
  XOnXOff,
  RequestToSend,
  RequestToSendXOnXOff
}

export { Port, StopBits, Parity, Handshake };
