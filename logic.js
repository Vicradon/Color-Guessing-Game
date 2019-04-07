window.onload = ()=>{
    var numSquares = 6;
    var colors = [];
    var pickedColor;
    var squares = document.querySelectorAll(".square");
    var colorDisplay = document.getElementById("colorDisplay");
    var messageDisplay = document.querySelector("#message");
    var h1 = document.querySelector("h1");
    var resetButton = document.querySelector("#reset");
    var modeButtons = document.querySelectorAll(".mode");
    var num = document.getElementById("num");
    var score = 0;

    init();

    function init(){
        //mode buttons event listeners
        for (var i = 0; i < modeButtons.length; i++){
            modeButtons[i].addEventListener("click", function(){
                modeButtons[0].classList.remove("selected");
                modeButtons[1].classList.remove("selected");
                this.classList.add("selected");
                this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
                reset()
                score = 0;
                num.innerText = score;
            });
        }
        
        for (var i = 0; i < squares.length; i++){
            // add initial color to squares
            squares[i].addEventListener("click", win)
        }
       

        reset();
        
    }
    function removeEvent(){
        squares.forEach(item=>{
            item.removeEventListener("click", win)
            
        })
    }
    function win(){
        //compare color to picked color
        clickedColor = this.style.backgroundColor;
        if(clickedColor === pickedColor){
            messageDisplay.textContent = "Correct!";
            resetButton.textContent = "Play Again?";
            changeColors(clickedColor);
            h1.style.backgroundColor = clickedColor;
            score++;
            num.innerText = score;
            removeEvent();
           
        }
        else{
            this.style.background = "#232323";
            messageDisplay.textContent = "Try Again";
            score--;
            num.innerText = score;
        }
    };

    function reset(){
        
        colors = generateRandomColors(numSquares);
        pickedColor = pickColor();

        colorDisplay.textContent = pickedColor;
        resetButton.textContent = "New Colors";
        messageDisplay.textContent = "";
        for (var i = 0; i < squares.length; i++){
            if (colors[i]){
                squares[i].style.display = "block";
                squares[i].style.background = colors[i];}
            else{
                squares[i].style.display = "none";
            }
        }
        h1.style.backgroundColor = "steelblue";
        num.innerText = score;
    }

    resetButton.addEventListener("click", function(){
        reset();
        for (var i = 0; i < squares.length; i++){
        squares[i].addEventListener("click", win)
    }
    });
    

    colorDisplay.textContent = pickedColor;
        
    function changeColors(color){
        //loop through to change all colors to match the given
        for (var i = 0; i < squares.length; i++){
            squares[i].style.backgroundColor = color;
        }
    }
    function pickColor(){
        var random = Math.floor(Math.random() * colors.length);
        return colors[random];
    }
    function generateRandomColors(num){
        var arr = [];
        for (var i = 0; i < num; i++){
            arr.push(randomColor());
            //push rand color into arr
        }
        return arr;
    }
    function randomColor(){
        //pick red n green n blue from 0 to 255
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb("+ r +", " + g + ", " + b + ")";
    }
    
}