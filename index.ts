export default class Evt {
    constructor(public container = Object.create(null) as ListenMap) {
        this.container = container;
    }
    public on(key: ListenKey, fn: Function) {
        (this.container[key] || (this.container[key] = [])).push(fn);
        return () => this.off(key, fn);
    }
    public off(key: ListenKey, fn: Function) {
        const listener = this.container[key] || [];
        ~listener.indexOf(fn) && listener.splice(listener.indexOf(fn), 1);
    }
    public emit(key: ListenKey, ...args: any[]) {
        (this.container[key] || []).forEach((fn) => fn(...args));
    }
    public once(key: ListenKey, fn: Function) {
        const onceWrapper = (...args) => {
            fn.apply(this, args);
            this.off(key, onceWrapper);
        };
        return this.on(key, onceWrapper);
    }
    public removeAll(key?: ListenKey) {
        key 
            ? (delete this.container[key])
            : (this.container = Object.create(null));
    }
}
type ListenKey = string | number;
type ListenMap = {ListenKey: Function[]}