var runner = (function (run) {

    // initialize the canvas
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var player = {};
    var ground = [];
    var platformWidth = 32;
    var platformHeight = canvas.height - platformWidth * 4;

        var ballRad = 50;
        var posX = 500;
        var posY = 300;
        var ball = new Ball(ballRad * ballRad, ballRad, new Vector2(posX, posY), new Vector2(0, 0));

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

    function animate() {
        requestAnimFrame(animate);
        ctx.clearRect(0, 0, run.initial.canvas.width, run.initial.canvas.height);
        run.background.draw();
        ball.draw(ctx);
        run.rocket.animate.update();
        // decide what will be the values of x and y input depending on the keyboard input
        run.rocket.move();
        run.rocket.bulletPool.animate();
        //console.log(run.rocket.bulletPool);
        //run.rocket.animate.draw(64, 50);

    }

    function startGame(){
        console.log(run.rocket.animate);


        //ground tiles?
        //initialize the background
        run.background.reset();
        animate();

    }

    console.log(runner);
    run.assetLoader.finished = function () {
        console.log("testing");
        console.log(run.assetLoader.images.backdrop.width);
        console.log(run.assetLoader.images.backdrop2.width);
        console.log(run.assetLoader.images.bullet.width);
        console.log(run.assetLoader.images.bullet.height);
        startGame();
    };

    run.assetLoader.downloadAllAssets();

})(runner || {});



