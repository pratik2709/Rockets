(function () {
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

    var assetLoader = (function(){

        this.images = {
            'bg': 'imgs/bg.png',
            'sky': 'imgs/sky.png',
            'backdrop': 'imgs/backdrop.png',
            'backdrop2': 'imgs/backdrop_ground.png',
            'grass': 'imgs/grass.png',
            'avatar_normal': 'imgs/normal_walk.png'
        };

        var assets_loaded = 0;
        var number_of_images = Object.keys(this.images).length;
        console.log("number of images are::");
        console.log(number_of_images);

        this.totalAssets = number_of_images;

        function assetLoaded(dic, name) {
            console.log(this[dic][name]);

            if (this[dic][name].status !== 'loading') {
                console.log("inside loading");
                return;
            }
            this[dic][name].status = "loaded";
            assets_loaded++;
            console.log("testing");
            console.log(assets_loaded);
            console.log(number_of_images);
            if (assets_loaded === number_of_images && typeof this.finished === "function") {
                this.finished();
            }
        }

        this.downloadAllAssets = function(){
            var that = this;
            var source;
            //load images
            for (var image in this.images) {

                if (this.images.hasOwnProperty(image)) {
                    source = this.images[image];
                    (function (that, image) {
                        that.images[image] = new Image();
                        that.images[image].status = "loading";
                        that.images[image].name = image;
                        that.images[image].onload = function () {
                            //wierd passing string
                            console.log("inside onload function");
                            assetLoaded.call(that, "images", image)
                        };
                        that.images[image].src = source

                    })(that, image);

                }
            }
        };

        return {
            images: this.images,
            totalAssets: this.totalAssets,
            downloadAllAssets: this.downloadAllAssets
        }
    })();

    assetLoader.finished = function () {
        console.log("testing");
        startGame();
    };

    console.log(assetLoader.images);
    assetLoader.downloadAllAssets();


    //all assets downloaded starting with animating the assets

    function SpriteSheet(path, frameWidth, frameHeight) {
        this.image = new Image();
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;

        //number of frames in a row
        var self = this;
        this.image.onload = function () {
            self.framePerRow = Math.floor(self.image.width / self.frameWidth);

        };
        this.image.src = path;

    }

    function Animation(spritesheet, frameSpeed, startFrame, endFrame) {
        var animationSequence = [];
        var currentFrame = 0;
        var counter = 0;

        for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++) {
            animationSequence.push(frameNumber);
        }

        this.update = function () {
            //update in intervals of framespeed
            //note framespeed seems to be calculated as
            // intervals after which currentframe will be incremented
            if (counter == (frameSpeed - 1)) {
                currentFrame = (currentFrame + 1) % animationSequence.length
            }

            counter = (counter + 1) % frameSpeed;
        };

        this.draw = function (x, y) {
            // get the row and col of the frame
            var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
            var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);
            ctx.drawImage(spritesheet.image, col * spritesheet.frameWidth, row * spritesheet.frameHeight, spritesheet.frameWidth, spritesheet.frameHeight, x, y, spritesheet.frameWidth, spritesheet.frameHeight);
        };
    }

    var background = (function () {
        var sky = {};
        var backdrop = {};
        var backdrop2 = {};

        //draw backgrounds
        this.draw = function () {
            ctx.drawImage(assetLoader.images.bg, 0, 0);

            //pan background
            //moving (less than 0) to left
            sky.x -= sky.speed;
            backdrop.x -= backdrop.speed;
            backdrop2.x -= backdrop2.speed;

            //loop for side by side effect
            ctx.drawImage(assetLoader.images.sky, sky.x, sky.y);
            ctx.drawImage(assetLoader.images.sky, sky.x + canvas.width, sky.y);
            ctx.drawImage(assetLoader.images.backdrop, backdrop.x, backdrop.y);
            ctx.drawImage(assetLoader.images.backdrop, backdrop.x + canvas.width, backdrop.y);
            ctx.drawImage(assetLoader.images.backdrop2, backdrop2.x, backdrop2.y);
            ctx.drawImage(assetLoader.images.backdrop2, backdrop2.x + canvas.width, backdrop2.y);

            //if off the screen
            if (sky.x + sky.width <= 0) {
                sky.x = 0;
            }
            if (backdrop.x + assetLoader.images.backdrop.width <= 0)
                backdrop.x = 0;
            if (backdrop2.x + assetLoader.images.backdrop2.width <= 0)
                backdrop2.x = 0;

        };

        //reset background and initialize
        this.reset = function () {
            sky.x = 0;
            sky.y = 0;
            sky.speed = 0.2;
            backdrop.x = 0;
            backdrop.y = 0;
            backdrop.speed = 0.4;
            backdrop2.x = 0;
            backdrop2.y = 0;
            backdrop2.speed = 0.6;
        };

        return {
            //why no rounded braces
            draw: this.draw,
            reset: this.reset
        }

    })();

    function animate() {
        requestAnimFrame(animate);
        background.draw();
        player.anim.update();
        player.anim.draw(64, 260);

    }

    function startGame(){
        // setting up the player
        //why are we explicitly specifying width
        //of individual sprite
        // can also be done the other way around
        //by specifying the number of frames explicitly

        player.width = 60;
        player.height = 96;
        player.speed = 6;
        player.sheet = new SpriteSheet("imgs/normal_walk.png", player.width, player.height);

        //there are 2 speeds for the player
        // running speed and stationary movement speed
        player.anim = new Animation(player.sheet, 4, 0, 15);

        //ground tiles?

        background.reset();
        animate();

    }



})();

