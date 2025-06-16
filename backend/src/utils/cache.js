class Cache {
  constructor() {
    this.map = new Map();
  }
  get(key) {
    return this.map.get(key);
  }
  set(key, value) {
    this.map.set(key, value);
  }
  delete(key) {
    this.map.delete(key);
  }
  clear() {
    this.map.clear();
  }
}

module.exports = new Cache();
