const inquirer = require('inquirer');
const fs = require('fs');
const {Circle, Square, Triangle} = require('./lib/shapes.js')

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
        // return `<circle cx="25" cy="75" r="20" fill="${color}"/>`;
        const shape = new Circle();
        shape.setColor(colorChoice);
        shape.render();
    } else if (shape === "Square") {
        return `<rect x="10" y="10" width="30" height="30" fill="${color}"/>`
    } else {
        return `<polygon points="150, 18 244, 182 56, 182" fill="${color}"/>`
    };
};

function generateSVG(data) {
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

    ${renderShape(data.shape, data.shapeColor)}

    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${data.textColor}">${data.text}</text>

    </svg>
    `
};

function writeToFile(fileName, data) {
    const fileData = generateSVG(data);
    fs.writeFile(fileName, fileData, (error) => error ? console.log(error) : console.log('Success'));
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