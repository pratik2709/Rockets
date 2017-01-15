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

        this.thetaVelocity = 0;
        //setVelTheta(-5 / 60 * Math.PI);
        this.theta = {angle: 0};
        this.matrix = new Matrix();
        this.matrix.set(this.theta, 0, 0);


        //move
        var that = this;
        this.move = function () {
            counter++;

            if (KEY_STATUS.right) {
                that.theta.angle += (-0.5 / 60 * Math.PI);
                that.matrix.set(that.theta.angle, 0, 0);
            }
            if (KEY_STATUS.left) {
                that.theta.angle -= (-0.5 / 60 * Math.PI);
                that.matrix.set(that.theta.angle, 0, 0);
            }
            if (KEY_STATUS.up) {
                run.background.increase();

            }
            if (KEY_STATUS.down) {
                run.background.decrement();

            }

            run.rocket.animate.draw(that.x, that.y, that.theta);

            if (KEY_STATUS.space && counter >= fireRate) {
                fire();
                counter = 0;
            }

        };

        var setVelTheta = function (val) {
            that.thetaVelocity = val;
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
            bulletPool: this.bulletPool,
            theta: that.theta
        }

    })();

    run.rocket.prototype = new run.drawable();

    return run

})(runner || {});



