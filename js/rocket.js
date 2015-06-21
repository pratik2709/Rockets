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
        this.width = 256;
        this.height = 256;
        this.speed = 6;
        this.sheet = new run.SpriteSheet("imgs/rocket.png", this.width, this.height);

        //there are 2 speeds for the rocket
        // 1. running speed and
        // 2. stationary movement speed (which is handled by panning the background)
        this.anim = new run.Animation(this.sheet, 4, 0, 4);

        //move
        var that = this;
        this.move = function () {
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


        };


        return {
            animate: this.anim,
            move: this.move
        }

    })();

    return run

})(runner || {});



