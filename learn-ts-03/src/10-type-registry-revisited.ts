import { DataTypeRegistry } from './10-type-registry-revisited/lib/registry';

type foo = keyof DataTypeRegistry & string;
