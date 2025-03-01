const express = require("express");
const readlineSync = require("readline-sync");
const chalk = require("chalk");

const app = express();

const PORT = 8000;
let server = app.listen(PORT, () => {});

let chances;
let attempt;
let name;
let randomNumber = Math.floor(Math.random() * 100);

console.log(chalk.bgBlue.bold("Welcome to the Number Guessing Game!") + "\n");
console.log(chalk.gray("Thinking of a number between 1 to 100 ....") + "\n\n");

console.log(chalk.blue.bold("Please Select the difficulty level"));
console.log(chalk.yellow.bold("1. Easy (10 chances)"));
console.log(chalk.yellow.bold("2. Medium (5 chances)"));
console.log(chalk.yellow.bold("3. Hard (3 chances)") + "\n");

name = readlineSync.question(chalk.magenta.bold("Choose your level: "));

function compareNumber(chances, attempt) {
  let guess = readlineSync.questionInt(
    chalk.magenta.bold("Enter your guess: ")
  );
  if (guess > 100) {
    console.log("Number is somewhere between 1 to 100");
    compareNumber();
  } else if (guess > randomNumber) {
    console.log(
      `${chalk.red("Incorrect guess!")} Number is lesser than ${guess}`
    );
    if (chances <= 1) {
      console.log("Your have no chances left, Better Luck Next Time");
      server.close();
    } else {
      compareNumber(chances - 1, attempt + 1);
    }
  } else if (guess < randomNumber) {
    console.log(
      `${chalk.red("Incorrect guess!")} Number is greater than ${guess}`
    );
    if (chances <= 1) {
      console.log("Your have no chances left, Better Luck Next Time");
      server.close();
    } else {
      compareNumber(chances - 1, attempt + 1);
    }
  } else if (guess === randomNumber) {
    console.log(
      chalk.green(
        `Congratulation you have done the correct guess in ${attempt} attempt! Thankyou for playing`
      )
    );
    server.close();
  }
}

if (name === "1") {
  chances = 10;
  attempt = 0;
  console.log(
    "\n" + "you have choosed easy mode" + "\n",
    "Let's start the game" + "\n"
  );
  compareNumber(chances, attempt);
} else if (name === "2") {
  chances = 5;
  console.log(
    "\n" + "you have choosed medium mode" + "\n",
    "Let's start the game"
  );
  compareNumber(chances, attempt);
} else if (name === "3") {
  chances = 3;
  console.log(
    "\n" + "You have choosed hard mode" + "\n",
    "Let's start the game"
  );
  compareNumber(chances, attempt);
} else {
  console.log("\n" + "You have choosed wrong mode");
  server.close();
}

// gameFunction();
