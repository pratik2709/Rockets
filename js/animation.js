// Takes in a sprite sheet and animates it

var runner = (function (run) {

    run.Animation = function (spritesheet, frameSpeed, startFrame, endFrame) {
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

        this.draw = function (x, y, theta) {
            // get the row and col of the frame
            run.initial.ctx.save();
            var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
            var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);
            run.initial.ctx.translate(x, y);
            run.initial.ctx.translate(spritesheet.frameWidth/2, spritesheet.frameHeight/2);
            run.initial.ctx.rotate(theta);
            run.initial.ctx.drawImage(spritesheet.image, col * spritesheet.frameWidth, row * spritesheet.frameHeight, spritesheet.frameWidth, spritesheet.frameHeight, x, y, -spritesheet.frameWidth, -spritesheet.frameHeight);
            run.initial.ctx.restore();
        };
    };

    return run

})(runner || {});

