var runner = (function(run){
    run.rocket = (function(){
        //move the rocket
        // setting up the rocket
        //why are we explicitly specifying width
        //of individual sprite
        // can also be done the other way around
        //by specifying the number of frames explicitly

        this.width = 256;
        this.height = 256;
        this.speed = 6;
        this.sheet = new run.SpriteSheet("imgs/rocket.png", this.width, this.height);

        //there are 2 speeds for the rocket
        // 1. running speed and
        // 2. stationary movement speed (which is handled by panning the background)
        this.anim = new run.Animation(this.sheet, 4, 0, 4);


        return {
            animate: this.anim
        }

    })();

    return run

})(runner || {});

