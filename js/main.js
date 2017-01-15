var runner = (function (run) {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var ballRad = 50;
    var posX = 500;
    var posY = 300;
    var ball = new run.ball(ballRad * ballRad, ballRad, new Vector2(posX, posY), new Vector2(0, 0));


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
        ball.draw(ctx, "#ff0000");
        run.rocket.animate.update();
        run.rocket.move();
        run.rocket.bulletPool.animate();
        var contacts = collide();

    }

    function startGame() {
        run.initial.myObjects.push(ball);
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
        startGame();
    };

    run.assetLoader.downloadAllAssets();

})(runner || {});



