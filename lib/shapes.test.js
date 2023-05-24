const {Circle, Square, Triangle} = require('./shapes');

// Circle test
describe('Circle', () => {
    it('renders a plum circle', () => {
        const shape = new Circle();
        shape.setColor('plum');
        expect(shape.render()).toEqual('<circle cx="150" cy="100" r="100" fill="plum"/>');
    });
});

// Square test
describe('Square', () => {
    it('renders a light green(using hexidecimal) circle', () => {
        const shape = new Square();
        shape.setColor('#aaffaa');
        expect(shape.render()).toEqual('<rect x="50" y="0" width="200" height="200" fill="#aaffaa"/>')
    });
});

// Triangle test
describe('Triangle', () => {
    it('renders a blue triangle', () => {
        const shape = new Triangle();
        shape.setColor('blue');
        expect(shape.render()).toEqual('<polygon points="150, 0 300, 200 0, 200" fill="blue"/>');
    });
});