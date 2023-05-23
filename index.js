const inquirer = require('inquirer');
const fs = require('fs');
const shapes = require('./lib/shapes.js')

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

function renderShape(shape, color) {
    if (shape === "Circle") {
        return `<circle cx="25" cy="75" r="20" fill="${color}"/>`;
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
        writeToFile('logo.svg', answers)
    });
};
init();