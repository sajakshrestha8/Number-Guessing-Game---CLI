const readlineSync = require("readline-sync");
const chalk = require("chalk");
const figlet = require("figlet");
const fs = require("fs");
let s = 0;

function game() {
  let chances;
  let attempt = 1;
  let name;
  let highscoreLimit;
  let highscore = require("./highscore.json");
  let randomNumber = Math.ceil(Math.random() * 100);

  console.log(chalk.redBright(figlet.textSync("Number Guessing Game!")) + "\n");
  console.log(
    chalk.gray("Thinking of a number between 1 to 100 ....") + "\n\n"
  );

  console.log(chalk.blue.bold("Please Select the difficulty level"));
  console.log(chalk.yellow.bold("1. Easy (10 chances)"));
  console.log(chalk.yellow.bold("2. Medium (5 chances)"));
  console.log(chalk.yellow.bold("3. Hard (3 chances)") + "\n");

  name = readlineSync.questionInt(chalk.magenta.bold("Choose your level: "));

  function restartGame() {
    console.log("Do you want to restart the game ?");
    randomNumber = Math.ceil(Math.random() * 100);
    let input = readlineSync.question("y/n: ");
    switch (input) {
      case "y":
        compareNumber(chances, attempt);
      case "n":
        process.exit();
    }
  }

  function compareNumber(chances, attempt) {
    let guess = readlineSync.questionInt(
      chalk.magenta.bold("Enter your guess: ")
    );
    if (guess > 100 || guess < 0) {
      console.log("Number is somewhere between 1 to 100");
      if (chances <= 1) {
        console.log(
          `Your have no chances left, Better Luck Next Time. The actual number was ${randomNumber}`
        );
        restartGame();
      } else {
        compareNumber(chances - 1, attempt + 1);
      }
    } else if (guess > randomNumber) {
      console.log(
        `${chalk.red("Incorrect guess!")} Number is lesser than ${guess}`
      );
      if (chances <= 1) {
        console.log(
          `Your have no chances left, Better Luck Next Time. The actual number was ${randomNumber}`
        );
        restartGame();
      } else {
        compareNumber(chances - 1, attempt + 1);
      }
    } else if (guess < randomNumber) {
      console.log(
        `${chalk.red("Incorrect guess!")} Number is greater than ${guess}`
      );
      if (chances <= 1) {
        console.log(
          `Your have no chances left, Better Luck Next Time. The actual number was ${randomNumber}`
        );
        restartGame();
      } else {
        compareNumber(chances - 1, attempt + 1);
      }
    } else if (guess === randomNumber) {
      console.log(
        chalk.green(
          `Congratulation you have done the correct guess in ${attempt} attempt! Thankyou for playing`
        )
      );
      if (highscoreLimit === 10) {
        if (attempt < highscore.easyMode) {
          highscore.easyMode = attempt;
          fs.writeFileSync("highscore.json", JSON.stringify(highscore));
        }
      } else if (highscoreLimit === 5) {
        if (attempt < highscore.mediumMode) {
          highscore.mediumMode = attempt;
          fs.writeFileSync("highscore.json", JSON.stringify(highscore));
        }
      } else if (highscoreLimit === 3) {
        if (attempt < highscore.hardMode) {
          highscore.hardMode = attempt;
          fs.writeFileSync("highscore.json", JSON.stringify(highscore));
        }
      }

      restartGame();
    }
  }

  switch (name) {
    case 1:
      chances = 10;
      highscoreLimit = 10;
      console.log("HighScore of easy mode:", highscore.easyMode);
      console.log(
        "\n" + "you have choosed easy mode" + "\n",
        "Let's start the game" + "\n"
      );
      compareNumber(chances, attempt);
      break;
    case 2:
      chances = 5;
      highscoreLimit = 5;
      console.log("HighScore of medium mode:", highscore.mediumMode);
      console.log(
        "\n" + "you have choosed medium mode" + "\n",
        "Let's start the game"
      );
      compareNumber(chances, attempt);
      break;
    case 3:
      chances = 3;
      highscoreLimit = 3;
      console.log("HighScore of hard mode:", highscore.hardMode);
      console.log(
        "\n" + "You have choosed hard mode" + "\n",
        "Let's start the game"
      );
      compareNumber(chances, attempt);
      break;
    default:
      console.log("\n" + "You have choosed wrong mode");
      process.exit();
  }
}

game();
