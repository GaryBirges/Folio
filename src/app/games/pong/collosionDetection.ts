export function detectCollosion(ball, gameElement){
    let ballBottom = ball.position.y+ball.size
    let ballTop = ball.position.y
    let ballLeft =  ball.position.x 
    let ballRight = ball.position.x + ball.size

    let elementTop = gameElement.position.y
    let elementLeft = gameElement.position.x
    let elementRight = gameElement.position.x+gameElement.width
    let elementBottom = gameElement.position.y +gameElement.height;

    if(ballBottom >= elementTop && 
        ballTop <= elementBottom &&
        ballRight >= elementLeft && 
        ballLeft <= elementRight){
            // console.log("fromTop",Math.abs(ballBottom - elementTop))
            // console.log('fromBottom',Math.abs(ballTop - elementBottom))
            // console.log('fromRight',Math.abs(ballRight - elementLeft)) 
            // console.log('FromLeft',Math.abs(ballLeft - elementRight))
            // console.log("fromTop, fromBottom, fromRight, FromLeft")
            // console.log(ballBottom, ballTop,      ballLeft, ballRight)
            // console.log(elementTop, elementBottom, elementRight, elementLeft  )
            return true;
    }else{
        return false;
    }
}