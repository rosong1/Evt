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
        const add2 = () => i += 2;

        e.on('add', add);
        e.emit('add');
        expect(i).toBe(1);

        e.on('add', add2);
        e.emit('add');
        expect(i).toBe(4);
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

    test('once', () => {
        const e = new Evt();
        let i = 0;
        const add = () => ++i;
        
        e.once('add', add);
        e.emit('add');
        e.emit('add');
        expect(i).toBe(1);
    });

    describe('removeAll', () => {
        let i = 0;
        const add = () => ++i;
        const add2 = () => i += 2;

        test('with key', () => {
            const e = new Evt();
            e.on('add', add);
            e.on('add2', add2);
            e.removeAll('add');
            e.emit('add');
            e.emit('add2');

            expect(i).toBe(2);
            i = 0;
        });

        test('without key', () => {
            const e = new Evt();
            e.on('add', add);
            e.on('add2', add2);
            e.removeAll();
            e.emit('add');
            e.emit('add2');

            expect(i).toBe(0);
        });
    })
});