//For panning the background

var runner = (function(run){
     run.background = (function () {
        this.backdrop = {x:0, y:0, speed:0.4};
         this.rot1 = -10 * Math.PI/180;

        //draw backgrounds
        var that = this;
        this.draw = function () {
            run.initial.ctx.drawImage(run.assetLoader.images.bg, 0, 0);

            //pan background
            //moving (less than 0) to left
            //add direction according to where the rocket is pointing
            that.backdrop.x -= that.backdrop.speed;

            //loop for side by side effect
            run.initial.ctx.save();
            run.initial.ctx.rotate(run.rocket.theta.angle);
            run.initial.ctx.drawImage(run.assetLoader.images.backdrop, that.backdrop.x, that.backdrop.y);
            run.initial.ctx.drawImage(run.assetLoader.images.backdrop, that.backdrop.x + run.initial.canvas.width, that.backdrop.y + run.initial.canvas.height);
            run.initial.ctx.drawImage(run.assetLoader.images.backdrop, that.backdrop.x - run.initial.canvas.width, that.backdrop.y);
            run.initial.ctx.drawImage(run.assetLoader.images.backdrop, that.backdrop.x, that.backdrop.y - run.initial.canvas.height);
            run.initial.ctx.drawImage(run.assetLoader.images.backdrop, that.backdrop.x - run.initial.canvas.width, that.backdrop.y - run.initial.canvas.height);

            run.initial.ctx.drawImage(run.assetLoader.images.backdrop, that.backdrop.x , that.backdrop.y + run.initial.canvas.height);
            run.initial.ctx.drawImage(run.assetLoader.images.backdrop, that.backdrop.x - run.initial.canvas.width, that.backdrop.y);
            run.initial.ctx.restore();

            if (that.backdrop.x + 800 <= 0)
                that.backdrop.x = 0;

            if (that.backdrop.x  >= 800)
                that.backdrop.x = 0;
            //if (that.backdrop.y  >= 480)
            //    that.backdrop.y = 0;

        };

        //reset background and initialize
        this.reset = function () {
            that.backdrop.x = 0;
            that.backdrop.y = 0;
            that.backdrop.speed = 0.4;
        };

        this.increase = function () {
            that.backdrop.speed += 0.1;
        };

        this.decrement = function () {
            that.backdrop.speed -= 0.1;
        };



        return {
            //why no rounded braces
            draw: this.draw,
            reset: this.reset,
            increase: this.increase,
            decrement: this.decrement
        }

    })();

    return run

})(runner || {});
