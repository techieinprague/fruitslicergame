var playing = false;
var score; 
var trialsLeft ;
var step;
var action; //move fruit down 
var fruitsList = [ "apple", "orange" , "bananas", "grapes", "peach", "mango", "pear", "pineapple", 
                    "watermelon"];
$(function(){

    $("#startReset").click(function(){

            //check if we're playing
            if(playing == true){
                location.reload();
            }else{
                playing = true;
                $("#startReset").html("Reset");
                //hide gameOver 
                $("#gameOver").hide();

                score = 0 ; 
                $("#scoreValue").html(score);
                $("#trialsLeft").show();
                trialsLeft = 3; 
                heartsLeft();
                startAction();
            }
    });

//mouse action 
$("#fruits").mouseover(function(){
    score++;
    $("#scoreValue").html(score);

    //play sound
    // document.getElementById("swordSound").play();
    $("#swordSound")[0].play(); 

    
    //hide fruit
    clearInterval(action);
    //slice fruit
    $("#fruits").hide("explode", {pieces: 16}, 400);

    //send new fruits
    setTimeout(startAction,400);
});

//positioning & step fruits randomly
function positionFruitRandom(){

    $("#fruits").show();
    randomFruit();
    //random position for the fruits
    $("#fruits").css({'left' : Math.round(500*Math.random()) , 'top' : -50 } )

    // random step 
    step = 1+ Math.round(5*Math.random());
}


//start sending Fruits
function startAction(){

    positionFruitRandom();

    //Move fruit down by one step every 10ms
    action = setInterval(function(){
        
        //move the fruit down - current position + step 
        $("#fruits").css('top', $("#fruits").position().top + step);

            // check if the fruit is too low
            if($("#fruits").position().top > $("#screen").height()){
                //check if there's any life left
                if(trialsLeft>1){

                    positionFruitRandom();
                    // reduce life
                    trialsLeft--;
                    //heartsLeft
                    heartsLeft();
                   
                }else{ // game over 
                    playing = false ;
                    $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score + '</p>');
                    $("#startReset").html("Start game");
                    $("#gameOver").show();
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }
    
    }, 5);


}
//Trials Left
function heartsLeft(){
    $("#trialsLeft").empty();
    for(i = 0 ; i<trialsLeft ; i++){
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

//choose a random fruit
function randomFruit(){
    $("#fruits").attr('src', 'images/' + fruitsList[Math.round(8*Math.random())]+ '.png')
} 

//stop Action
function stopAction(){
    clearInterval(action);
    $("#fruits").hide();
}

});