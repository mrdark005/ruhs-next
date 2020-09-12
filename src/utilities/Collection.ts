class Collection<V> extends Map<string, V> {
  constructor(data?: unknown[] = [], indexKey?: string) {
    data.forEach((value, index) => {
      if(indexKey && value[indexKey]) {
        this.set(value[indexKey], value);
      } else {
        this.set(index, value);
      }
    });
  }

  array(): V[] {
    return [...this.values()];
  }

  keyArray(): string[] {
    return [...this.keys()];
  }

  some(callbackFn: ((value: V, index: number, array: V[]) => unknown)): boolean {
    return this.array().some(callbackFn);
  }

  map(callbackFn: ((value: V, index: number, array: V[]) => unknown)): unknown[] {
    return this.array().map(callbackFn);
  }

  filter(callbackFn: ((value: V, index: number, array: V[]) => unknown)): V[] {
    return this.array().map(callbackFn);
  }

  find(callbackFn: ((value: V, index: number, array: V[]) => unknown)): V | undefined {
    return this.array().find(callbackFn);
  }

  reduce(callbackFn: ((value: V, index: number, array: V[]) => unknown)): boolean {
    return this.array().map(callbackFn);
  }
}

export = Collection;
