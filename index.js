const express = require("express");
const readlineSync = require("readline-sync");

const app = express();

const PORT = 8000;
let server = app.listen(PORT, () => {});

let randomNumber = Math.floor(Math.random() * 100);
console.log(randomNumber);

function compareNumber() {
  let guess = readlineSync.question("Enter your guess: ");
  console.log(guess);
  if (guess === randomNumber.toString()) {
    console.log("Congratulation you have done the correct guess");
  } else {
    console.log("Incorrect guess");
  }
}

console.log("Welcome to the Number Guessing Game!" + "\n");
console.log("I'm thinking of a number between 1 to 100" + "\n\n");

console.log("Please Select the difficulty level");
console.log("1. Easy (10 chances)");
console.log("2. Medium (5 chances)");
console.log("3. Hard (3 chances)" + "\n");

let name = readlineSync.question("Choose your level: ");

if (name === "1") {
  console.log(
    "\n" + "you have choosed easy mode" + "\n",
    "Let's start the game" + "\n"
  );
  compareNumber();
} else if (name === "2") {
  console.log(
    "\n" + "you have choosed medium mode" + "\n",
    "Let's start the game"
  );
  compareNumber();
} else if (name === "3") {
  console.log(
    "\n" + "You have choosed hard mode" + "\n",
    "Let's start the game"
  );
  compareNumber();
} else {
  console.log("\n" + "You have choosed wrong mode");
  server.close();
}
