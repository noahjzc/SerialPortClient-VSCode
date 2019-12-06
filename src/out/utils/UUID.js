"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UUID {
    constructor() {
        this.mostSigBits = 0n;
        this.leastSigBits = 0n;
    }
    init(data) {
        let msb = 0n;
        let lsb = 0n;
        for (let i = 0; i < 8; i++) {
            msb = (msb << 8n) | BigInt(data[i] & 0xff);
        }
        for (let i = 8; i < 16; i++) {
            lsb = (lsb << 8n) | BigInt(data[i] & 0xff);
        }
        this.initByValue(msb, lsb);
    }
    initByValue(msb, lsb) {
        this.mostSigBits = msb;
        this.leastSigBits = lsb;
    }
    static newId() {
        let randomBytes = [];
        for (let index = 0; index < 16; index++) {
            randomBytes.push(this.getRandomByte());
        }
        randomBytes[6] &= 0x0f;
        randomBytes[6] |= 0x40;
        randomBytes[8] &= 0x3f;
        randomBytes[8] |= 0x80;
        let newId = new UUID();
        newId.init(randomBytes);
        return newId;
    }
    static fromString(value) {
        let components = value.split("-");
        if (components.length !== 5) {
            throw new Error(`Invalid UUID string: ${value}`);
        }
        for (let i = 0; i < 5; i++) {
            components[i] = "0x" + components[i];
        }
        let mostSigBits = BigInt(components[0]);
        mostSigBits <<= 16n;
        mostSigBits |= BigInt(components[1]);
        mostSigBits <<= 16n;
        mostSigBits |= BigInt(components[2]);
        let leastSigBits = BigInt(components[3]);
        leastSigBits <<= 48n;
        leastSigBits |= BigInt(components[4]);
        let id = new UUID();
        id.initByValue(mostSigBits, leastSigBits);
        return id;
    }
    toString() {
        return (this.digits(this.mostSigBits >> 32n, 8) +
            "-" +
            this.digits(this.mostSigBits >> 16n, 4) +
            "-" +
            this.digits(this.mostSigBits, 4) +
            "-" +
            this.digits(this.leastSigBits >> 48n, 4) +
            "-" +
            this.digits(this.leastSigBits, 12));
    }
    hashCode() {
        let hilo = this.mostSigBits ^ this.leastSigBits;
        return parseInt((hilo >> 32n).toString()) ^ parseInt(hilo.toString());
    }
    equals(value) {
        if (value === null) {
            return false;
        }
        if (value instanceof UUID) {
            let id = value;
            return (this.mostSigBits === id.mostSigBits &&
                this.leastSigBits === id.leastSigBits);
        }
        return false;
    }
    digits(value, digits) {
        let hi = 1n << BigInt(digits * 4);
        hi = hi | (value & (hi - 1n));
        let hexString = hi.toString(16);
        return hexString.substring(1);
    }
    static getRandomByte() {
        return (Math.floor(Math.random() * 1000) % 256) - 128;
    }
}
exports.UUID = UUID;
//# sourceMappingURL=UUID.js.map