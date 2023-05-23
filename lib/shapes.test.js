const {Circle, Square, Triangle} = require('./shapes');

describe('Circle', () => {
    it('renders plum circle', () => {
        const shape = new Circle();
        shape.setColor('plum');
        expect(shape.render()).toEqual('<circle cx="25" cy="75" r="20" fill="plum"/>');
    });
});

describe('Square', () => {
    it('renders light green circle', () => {
        const shape = new Square();
        shape.setColor('#aaffaa');
        expect(shape.render()).toEqual('<rect x="10" y="10" width="30" height="30" fill="#aaffaa"/>')
    });
});

describe('Triangle', () => {
    it('renders blue triangle', () => {
        const shape = new Triangle();
        shape.setColor('blue');
        expect(shape.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue"/>');
    });
});