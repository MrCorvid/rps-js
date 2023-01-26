const start = document.querySelector("button");

function getComputerChoice() {
    let rand = Math.floor(Math.random() * 300);
    let result = "None";
    if (rand <= 100) { result = "Rock"; } else
        if (rand <= 200) { result = "Paper"; } else { result = "Scisors"; }
    return (result);
}

function getPlayerChoice() {
    let choice;
    while (!choice) {
        let test = (prompt("Choose Rock, Paper, or Scissors") ?? "False").toLowerCase();
        if (test == "cancel" || test == "exit") {
            choice = "exit";
        } else if (test === "rock" || test === "paper" || test === "scissors") {
            choice = test;
        } else if (Number(test) > 0 && Number(test) <= 3) {
            if (Number(test) === 1) { choice = "rock" }
            if (Number(test) === 2) { choice = "paper" }
            if (Number(test) === 3) { choice = "scissors" }
        } else {
            console.log("Invalid choice");
        }
    }
    return (choice[0].toUpperCase() + choice.substr(1));
}

function winner(test) {
    if ((test[0] + 1) % 3 == test[1]) {
        return 0;
    } else if (test[0] == test[1]) {
        return 1;
    } else {
        return 2;
    }
}

function quant(a) {
    if (a == "Exit") { return -1; } else
        if (a == "Rock") { return 0; } else
            if (a == "Paper") { return 1; }
            else { return 2; }
}

function rps(playerSelection, computerSelection, score) {
    let arr = [-1, -1]
    let win;

    arr[0] = quant(playerSelection);
    if (arr[0] == -1) { return ['', [-1, 0]] }
    arr[1] = quant(computerSelection);
    win = winner(arr);

    if (win == 0) {
        score[1] += 1;
        return [`You Lose! ${computerSelection} beats ${playerSelection}!`, score];
    } else
        if (win == 1) {
            return [`Draw! Both players chose ${computerSelection}! (${playerSelection})`, score];
        }
        else {
            score[0] += 1;
            return [`You Win! ${playerSelection} beats ${computerSelection}!`, score];
        }


}

function displayScore(score) {
    return (`Player: ${score[0]}, Computer: ${score[1]}`);
}

function game() {
    let score = [0, 0]

    while (score[0] + score[1] < 5) {
        let round = rps(getPlayerChoice(), getComputerChoice(), score);
        score = round[1];
        if (score[0] == -1) { break; }
        console.log(round[0]);
        //console.log(displayScore(score));
    }

    if (score[0] == -1) {
        console.log("You've exit. Come back again!");
    } else
        if (score[0] > score[1]) {
            console.log("Congratulations! You win!");
            console.log(displayScore(score));
        } else
            if (score[1] > score[0]) {
                console.log("Better luck next time! You lose!");
                console.log(displayScore(score));
            }
            else {
                console.log("It's a Draw! Play again?");
                console.log(displayScore(score));
            }

}

start.addEventListener('click', game);