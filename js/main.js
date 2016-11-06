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
    var ball = new run.ball(ballRad * ballRad, ballRad, new Vector2(posX, posY), new Vector2(0, 0));

    //var rocket = run.rocket.init();
    //console.log(run.rocket);


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
        var contacts = collide();
        console.log(contacts);

    }

    function startGame() {

        //console.log(run.rocket.animate);
        run.initial.myObjects.push(ball);
        //mObjects.push(run.rocket.bulletPool);

        //ground tiles?
        //initialize the background
        run.background.reset();
        animate();

    }

    function collide() {
        var contacts = [];

        for (var ii = 0; ii < run.initial.myObjects.length - 1; ii++) {
            for (var jj = ii + 1; jj < run.initial.myObjects.length; jj++) {
                if (run.initial.myObjects[ii].mass != 0 || run.initial.myObjects[jj].mass != 0) {
                    var _contacts = run.initial.myObjects[ii].getClosestPoints(run.initial.myObjects[jj]);
                    contacts = contacts.concat(_contacts);
                }
            }
        }

        return contacts;
    }

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



