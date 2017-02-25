//For panning the background

var background = (function () {
    var sky = {};
    var backdrop = {};
    var backdrop2 = {};

    this.draw = function () {
        initial.ctx.drawImage(assetLoader.images.bg, 0, 0);

        sky.x -= sky.speed;
        backdrop.x -= backdrop.speed;
        backdrop2.x -= backdrop2.speed;

        //loop for side by side effect
        initial.ctx.drawImage(assetLoader.images.sky, sky.x, sky.y);
        initial.ctx.drawImage(assetLoader.images.sky, sky.x + initial.canvas.width, sky.y);
        initial.ctx.drawImage(assetLoader.images.backdrop, backdrop.x, backdrop.y);
        initial.ctx.drawImage(assetLoader.images.backdrop, backdrop.x + initial.canvas.width, backdrop.y);
        initial.ctx.drawImage(assetLoader.images.backdrop2, backdrop2.x, backdrop2.y);
        initial.ctx.drawImage(assetLoader.images.backdrop2, backdrop2.x + initial.canvas.width, backdrop2.y);

        //if off the screen
        if (sky.x + sky.width <= 0) {
            sky.x = 0;
        }
        if (backdrop.x + 800 <= 0)
            backdrop.x = 0;
        if (backdrop2.x + 800 <= 0)
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
        draw: this.draw,
        reset: this.reset
    }

})();

