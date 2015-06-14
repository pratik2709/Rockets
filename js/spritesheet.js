// Creates a spritesheet object

var runner = (function (run) {
    run.SpriteSheet = function(path, frameWidth, frameHeight) {
        this.image = new Image();
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;

        //number of frames in a row
        var self = this;
        this.image.onload = function () {
            self.framesPerRow = Math.floor(self.image.width / self.frameWidth);

        };
        this.image.src = path;

    };
    return run
})(runner || {});
