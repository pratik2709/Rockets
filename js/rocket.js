var runner = (function (run) {
    run.rocket = (function () {
        //move the rocket
        // setting up the rocket
        //why are we explicitly specifying width
        //of individual sprite
        // can also be done the other way around
        //by specifying the number of frames explicitly
        this.x = 64;
        this.y = 50;
        this.width = 156;
        this.height = 41;
        this.speed = 6;
        this.sheet = new run.SpriteSheet("imgs/rocket2.png", this.width, this.height);

        //bullet code
        this.speed = 3;
        this.bulletPool = new run.pool(30);
        this.bulletPool.init("bullet");

        var fireRate = 15; //why
        var counter = 0;
        this.collidableWith = "enemyBullet";
        this.type = "ship";

        //there are 2 speeds for the rocket
        // 1. running speed and
        // 2. stationary movement speed (which is handled by panning the background)
        this.anim = new run.Animation(this.sheet, 4, 0, 4);




        //move
        var that = this;
        this.move = function () {
            counter++;
            //this.x =64;
            //this.y = 50;
            //this.speed = 6;
            //if(KEY_STATUS.right || KEY_STATUS.left){
            //    //rocket moved, erase current image
            //    run.initial.ctx.clearRect(64,that.y,that.width, that.height);
            //}

            if (KEY_STATUS.up) {
                that.y -= that.speed;

                if (that.y <= -(run.initial.canvas.height * 0.5)) {
                    that.y = 0;
                }
            }
            if (KEY_STATUS.down) {
                that.y += that.speed;

                if (that.y >= run.initial.canvas.height) {
                    that.y = run.initial.canvas.height * 0.5;
                }
            }

            run.rocket.animate.draw(that.x, that.y);

            if (KEY_STATUS.space && counter >= fireRate) {
                fire();
                counter = 0;
            }

        };

        var fire = function () {
            //add width to x
            //leave y
            that.bulletPool.getTwo(that.x + that.width + 6, that.y, 3,
                that.x + that.width + 33, that.y, 3); //change values and test
        };


        return {
            //init: this.init,
            animate: this.anim,
            move: this.move,
            bulletPool: this.bulletPool
        }

    })();

    run.rocket.prototype = new run.drawable();

    return run

})(runner || {});



