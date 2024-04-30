import { IProgramLang } from "./program-lang.interface";

export class TSClass implements IProgramLang{
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}
