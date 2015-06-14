//For panning the background

var runner = (function(run){
     run.background = (function () {
        var sky = {};
        var backdrop = {};
        var backdrop2 = {};

        //draw backgrounds
         console.log(run);
        this.draw = function () {
            run.initial.ctx.drawImage(run.assetLoader.images.bg, 0, 0);

            //pan background
            //moving (less than 0) to left
            sky.x -= sky.speed;
            backdrop.x -= backdrop.speed;
            backdrop2.x -= backdrop2.speed;

            //loop for side by side effect
            run.initial.ctx.drawImage(run.assetLoader.images.sky, sky.x, sky.y);
            run.initial.ctx.drawImage(run.assetLoader.images.sky, sky.x + run.initial.canvas.width, sky.y);
            run.initial.ctx.drawImage(run.assetLoader.images.backdrop, backdrop.x, backdrop.y);
            run.initial.ctx.drawImage(run.assetLoader.images.backdrop, backdrop.x + run.initial.canvas.width, backdrop.y);
            run.initial.ctx.drawImage(run.assetLoader.images.backdrop2, backdrop2.x, backdrop2.y);
            run.initial.ctx.drawImage(run.assetLoader.images.backdrop2, backdrop2.x + run.initial.canvas.width, backdrop2.y);

            //if off the screen
            if (sky.x + sky.width <= 0) {
                sky.x = 0;
            }
            if (backdrop.x + run.assetLoader.images.backdrop.width <= 0)
                backdrop.x = 0;
            if (backdrop2.x + run.assetLoader.images.backdrop2.width <= 0)
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

    return run

})(runner || {});
