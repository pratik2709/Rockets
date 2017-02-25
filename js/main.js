//var canvas = document.getElementById("canvas");
//var ctx = canvas.getContext("2d");
//var platformWidth = 32;
//var platformHeight = canvas.height - platformWidth * 4;
//
var ballRad = 50;
var posX = 500;
var posY = 300;
var ball_object = new ball(ballRad * ballRad, ballRad, new Vector2(posX, posY), new Vector2(0, 0));


function animate() {
    console.log("test");
    //requestAnimFrame(animate);
    //ctx.clearRect(0, 0, initial.canvas.width, initial.canvas.height);
    //
    //background.draw();
    //ball.draw(ctx, "#ff0000");
    //run.rocket.animate.update();
    //run.rocket.move();
    //run.rocket.bulletPool.animate();
    //var contacts = collide();

}

function startGame() {

    initial.myObjects.push(ball_object);
    background.reset();
    animate();

}
//
//function collide() {
//    var contacts = [];
//
//    for (var ii = 0; ii < run.initial.myObjects.length - 1; ii++) {
//        for (var jj = ii + 1; jj < run.initial.myObjects.length; jj++) {
//            if (run.initial.myObjects[ii].mass != 0 || run.initial.myObjects[jj].mass != 0) {
//                var _contacts = run.initial.myObjects[ii].getClosestPoints(run.initial.myObjects[jj]);
//                contacts = contacts.concat(_contacts);
//            }
//        }
//    }
//
//    return contacts;
//}


assetLoader.finished = function () {
    console.log("checking");
    startGame();
};

assetLoader.downloadAllAssets();


var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

