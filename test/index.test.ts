import Evt from '../index';

describe('包含的api', () => {
    const e = new Evt();
    ['on', 'off', 'emit', 'once', 'removeAll'].forEach((name) => {
        test(name, () => expect(typeof e[name] === 'function').toBe(true))
    });
});

describe('基本使用', () => {
    test('on emit', () => {
        const e = new Evt();
        let i = 0;

        const add = () => ++i;
        e.on('add', add);
        e.emit('add');
        expect(i).toBe(1);
    });
    test('emit with arguments', () => {
        const e = new Evt();
        let i = 0;
        const replace = (...args) => {
            const n = args.reduce((acc, cur) => acc + cur, 0);
            i = n;
        };
        e.on('replace', replace);
        e.emit('replace', 3, 4);
        expect(i).toBe(7);
    });
    test('on off', () => {
        const e = new Evt();
        let i = 0;

        const add = () => ++i;
        e.on('add', add);
        e.off('add', add);
        e.emit('add');
        expect(i).toBe(0);

        const disposer = e.on('add', add);
        e.emit('add');
        disposer();
        e.emit('add');
        expect(i).toBe(1);
    });
});