const inquirer = require('inquirer');
const fs = require('fs');
const {Circle, Square, Triangle} = require('./lib/shapes.js');

const questions = [
    {
        type: "input",
        name: "text",
        message: "LOGO TEXT: Enter no more than 3 characters."
    },
    {
        type: "input",
        name: "textColor",
        message: "LOGO TEXT COLOR: Enter a CSS color keyword OR hexadecimal number."  
    },
    {
        type: "list",
        name: "shape",
        message: "SHAPE: Choose a logo background shape.",
        choices: ["Circle", "Square", "Triangle"]
    },
    {
        type: "input",
        name: "shapeColor",
        message: "SHAPE COLOR: Enter a CSS color keyword OR hexadecimal number."  
    }
];

function renderShape(shape, colorChoice) {
    if (shape === "Circle") {
        const shape = new Circle();
        shape.setColor(colorChoice);
        return shape.render();
    } else if (shape === "Square") {
        const shape = new Square();
        shape.setColor(colorChoice);
        return shape.render();
    } else {
        const shape = new Triangle();
        shape.setColor(colorChoice);
        return shape.render();
    };
};

function generateSVG(data) {
    let yAxis = 125;
    if (data.shape === "Triangle") {
        yAxis = 160
    };
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
${renderShape(data.shape, data.shapeColor)}
<text x="150" y="${yAxis}" font-size="80" text-anchor="middle" fill="${data.textColor}">${data.text}</text>
</svg>`
};

function writeToFile(fileName, data) {
    const fileData = generateSVG(data);
    fs.writeFile(fileName, fileData, (error) => error ? console.log(error) : console.log('Generated logo.svg'));
};

function init() {
    inquirer.prompt(questions)
    .then((answers) => {
        if (answers.text.length > 3) {
            console.log("please enter only between 1 and 3 characters")
            init()
        } else {
            writeToFile('logo.svg', answers)
        };
    });
};
init();