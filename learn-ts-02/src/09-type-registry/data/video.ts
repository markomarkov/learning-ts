export class Video {
  duration(): number {
    return 43;
  }
}

declare module '../lib/registry' {
  export interface DataTypeRegistry {
    video: Video;
  }
}
