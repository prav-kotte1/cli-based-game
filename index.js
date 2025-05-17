#!/usr/bin/env node 
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

console.log(chalk.bgGreen('hi mom'));

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome(){
    const rainbowTitle = chalkAnimation.rainbow(
        'Who wants to be a JavaScript Millionaire \n'
    );

    await sleep();
    rainbowTitle.stop();
    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')} 
        I am a process on your computer.
        If you get any que wrong I will be ${chalk.bgRed('killed')}
        So get all ques right...
    `);
}

await welcome()

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default(){
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

await askName()

async function ques1() {
    const answers = await inquirer.prompt({
        name: 'que_1',
        type: 'list',
        message: 'Javascript was created in 10 days then released on\n',
        choices: [
            '23/May/1995',
            '24/Nov/1995',
            '4/Dec/1995',
            '17/Dec/1996',
        ],
    });

    return handleAnswer(answers.que_1 == '4/Dec/1995');
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
    if(isCorrect){
        spinner.success({text: `Nice work ${playerName}. That's a legit answer!`})
    } else {
        spinner.error({text: `💀💀💀 Game over, you lose ${playerName}`});
        process.exit(1);
    }
}

await ques1()

function winner(){
    console.clear();
    const msg = `Congrats, ${playerName}!\n $ 1, 000, 000` ;
    figlet(msg, (err, data)=>{
        console.log(gradient.pastel.multiline(data));
    })
}

await winner()