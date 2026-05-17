 // we used default operator for the null case
      let Score = JSON.parse(localStorage.getItem("Score")) || {
        Wins: 0,
        Loses: 0,
        Ties: 0,
      };

      updateScore();
      let id;
      function auto(){
        if(!id){

          id = setInterval(function(){
            play(pickMove());
          },1000);
        } else{
          clearInterval(id);
          id = null;
         // id = null bcoz previous id will be saved and !id will be false
        }
        let autotext = document.querySelector('.auto');
        if(autotext.innerText === 'Auto Play'){
          autotext.innerText = 'Stop Play';
          autotext.classList.add('stop');
        }else{
          autotext.innerText = 'Auto Play';
          autotext.classList.remove('stop');
        }
      }
      function pickMove() {
        let computerMove = "";
        const random = Math.random();
        if (random < 1 / 3) {
          computerMove = "Rock";
        } else if (random >= 1 / 3 && random < 2 / 3) {
          computerMove = "Paper";
        } else {
          computerMove = "Scissors";
        }
        return computerMove;
      }

      function play(myMove) {
        const computerMove = pickMove();
        let result = "";
        if (myMove === "Rock") {
          if (computerMove === "Rock") {
            result = "Its a Tie!";
          } else if (computerMove === "Paper") {
            result = "You Lose!";
          } else {
            result = "You Win!";
          }
        } else if (myMove === "Paper") {
          if (computerMove === "Rock") {
            result = "You Win!";
          } else if (computerMove === "Paper") {
            result = "Its a Tie!";
          } else {
            result = "You Lose!";
          }
        } else {
          if (computerMove === "Rock") {
            result = "You Lose!";
          } else if (computerMove === "Paper") {
            result = "You Win!";
          } else {
            result = "Its a Tie!";
          }
        }
        if (result === "You Win!") {
          Score.Wins += 1;
        } else if (result === "You Lose!") {
          Score.Loses += 1;
        } else {
          Score.Ties += 1;
        }
        console.log(result);
        /*First we comvert the object score in json string to save in local storage.To put the value of score again above, we convert it back to object.*/
        localStorage.setItem("Score", JSON.stringify(Score));
        showMove(myMove, computerMove);
        updateResult(result);
        updateScore();
      }
      function updateScore() {
        document.querySelector(".counter").innerHTML =
          `Wins : ${Score.Wins}, Loses : ${Score.Loses}, Ties : ${Score.Ties}`;
      }
      function showMove(myMove, computerMove) {
        document.querySelector(".move").innerHTML =
          `Your move : <img src="${myMove}-emoji.png">     <img src="${computerMove}-emoji.png"> : Computer's Move `;
      }
      function updateResult(result) {
        document.querySelector(".result").innerHTML = `${result}`;
      }