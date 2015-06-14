var runner = (function (run) {

    // initialize the canvas
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var player = {};
    var ground = [];
    var platformWidth = 32;
    var platformHeight = canvas.height - platformWidth * 4;

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
        run.background.draw();
        player.anim.update();
        player.anim.draw(64, 50);

    }

    function startGame(){
        // setting up the player
        //why are we explicitly specifying width
        //of individual sprite
        // can also be done the other way around
        //by specifying the number of frames explicitly

        player.width = 256;
        player.height = 256;
        player.speed = 6;
        player.sheet = new run.SpriteSheet("imgs/rocket.png", player.width, player.height);

        //there are 2 speeds for the player
        // 1. running speed and
        // 2. stationary movement speed (which is handled by panning the background)
        player.anim = new run.Animation(player.sheet, 4, 0, 4);

        //ground tiles?
        //initialize the background
        run.background.reset();
        animate();

    }

    console.log(runner);
    run.assetLoader.finished = function () {
        console.log("testing");
        startGame();
    };

    console.log(run);
    console.log(run.assetLoader.images);
    run.assetLoader.downloadAllAssets();

})(runner || {});

