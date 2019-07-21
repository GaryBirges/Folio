export function detectCollosion(ball, gameElement){
    let ballBottom = ball.position.y+ball.size
    let ballTop = ball.position.y

    let elementTop = gameElement.position.y
    let elementLeft = gameElement.position.x
    let elementRight = gameElement.position.x+gameElement.width
    let elementBottom = gameElement.position.y +gameElement.height;

    if(ballBottom >= elementTop && 
        ballTop<=elementBottom &&
        ball.position.x>= elementLeft && 
        ball.position.x + ball.size <= elementRight){
            return true;
    }else{
        return false;
    }
            

}