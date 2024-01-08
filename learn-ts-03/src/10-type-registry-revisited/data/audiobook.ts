export class AudioBook {
  deweyDecimalNumber(): number {
    return 42;
  }
}

declare module '../lib/registry' {
  export interface DataTypeRegistry {
    audiobook: AudioBook;
  }
}
