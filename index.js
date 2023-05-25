// Import necessary files
const inquirer = require('inquirer');
const fs = require('fs');
const {Circle, Square, Triangle} = require('./lib/shapes.js');

// Inquirer questions array
const questions = [
    {
        type: "input",
        name: "text",
        message: "LOGO TEXT: Enter no more than 3 characters."
    },
    {
        type: "input",
        name: "textColor",
        message: "TEXT COLOR: Enter a CSS color keyword OR hexadecimal number."  
    },
    {
        type: "list",
        name: "shape",
        message: "LOGO BACKGROUND SHAPE: Choose a logo background shape.",
        choices: ["Circle", "Square", "Triangle"]
    },
    {
        type: "input",
        name: "shapeColor",
        message: "SHAPE COLOR: Enter a CSS color keyword OR hexadecimal number."  
    }
];

// Renders shape from shapes.js per user choice
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

// Generates the SVG file core contents using the user input and shapes.js page
function generateSVG(data) {
    // centers text if a triangle background is chosen
    let yAxis = 125;
    if (data.shape === "Triangle") {
        yAxis = 160
    };
    // The template literal of the SVG file
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
${renderShape(data.shape, data.shapeColor)}
<text x="150" y="${yAxis}" font-size="80" text-anchor="middle" fill="${data.textColor}">${data.text}</text>
</svg>`
};

// Generates the SVG file itself
function writeToFile(fileName, data) {
    const fileData = generateSVG(data);
    fs.writeFile(fileName, fileData, (error) => error ? console.log(error) : console.log('Generated logo.svg'));
};

// Init function 
function init() {
    inquirer.prompt(questions)
    .then((answers) => {
        // Restarts prompt if the user input less than 1 more than 3 characters
        if (answers.text.length < 1 || answers.text.length > 3) {
            console.log("please enter only between 1 and 3 characters")
            init()
        } else {
            writeToFile('logo.svg', answers)
        };
    });
};
init();