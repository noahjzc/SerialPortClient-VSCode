class UUID {
  public mostSigBits: bigint;
  public leastSigBits: bigint;

  constructor() {
    this.mostSigBits = 0n;
    this.leastSigBits = 0n;
  }

  private init(data: number[]) {
    let msb: bigint = 0n;
    let lsb: bigint = 0n;
    for (let i = 0; i < 8; i++) {
      msb = (msb << 8n) | BigInt(data[i] & 0xff);
    }

    for (let i = 8; i < 16; i++) {
      lsb = (lsb << 8n) | BigInt(data[i] & 0xff);
    }
    this.initByValue(msb, lsb);
  }

  private initByValue(msb: bigint, lsb: bigint) {
    this.mostSigBits = msb;
    this.leastSigBits = lsb;
  }

  public static newId(): UUID {
    let randomBytes: number[] = [];
    for (let index = 0; index < 16; index++) {
      randomBytes.push(this.getRandomByte());
    }

    randomBytes[6] &= 0x0f;
    randomBytes[6] |= 0x40;
    randomBytes[8] &= 0x3f;
    randomBytes[8] |= 0x80;
    let newId: UUID = new UUID();
    newId.init(randomBytes);
    return newId;
  }

  public static fromString(value: string): UUID {
    let components: string[] = value.split("-");
    if (components.length !== 5) {
      throw new Error(`Invalid UUID string: ${value}`);
    }
    for (let i = 0; i < 5; i++) {
      components[i] = "0x" + components[i];
    }
    let mostSigBits: bigint = BigInt(components[0]);
    mostSigBits <<= 16n;
    mostSigBits |= BigInt(components[1]);
    mostSigBits <<= 16n;
    mostSigBits |= BigInt(components[2]);

    let leastSigBits: bigint = BigInt(components[3]);
    leastSigBits <<= 48n;
    leastSigBits |= BigInt(components[4]);

    let id: UUID = new UUID();
    id.initByValue(mostSigBits, leastSigBits);
    return id;
  }

  public toString(): string {
    return (
      this.digits(this.mostSigBits >> 32n, 8) +
      "-" +
      this.digits(this.mostSigBits >> 16n, 4) +
      "-" +
      this.digits(this.mostSigBits, 4) +
      "-" +
      this.digits(this.leastSigBits >> 48n, 4) +
      "-" +
      this.digits(this.leastSigBits, 12)
    );
  }

  public hashCode(): number {
    let hilo: bigint = this.mostSigBits ^ this.leastSigBits;
    return parseInt((hilo >> 32n).toString()) ^ parseInt(hilo.toString());
  }

  public equals(value: any): boolean {
    if (value === null) {
      return false;
    }
    if (value instanceof UUID) {
      let id = value as UUID;
      return (
        this.mostSigBits === id.mostSigBits &&
        this.leastSigBits === id.leastSigBits
      );
    }
    return false;
  }

  private digits(value: bigint, digits: number): string {
    let hi: bigint = 1n << BigInt(digits * 4);
    hi = hi | (value & (hi - 1n));
    let hexString = hi.toString(16);
    return hexString.substring(1);
  }

  private static getRandomByte(): number {
    return (Math.floor(Math.random() * 1000) % 256) - 128;
  }
}

export { UUID };
