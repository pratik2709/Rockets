var runner = (function(run){
    run.rocket = (function(){
// The keycodes that will be mapped when a user presses a button.
// Original code by Doug McInnes
KEY_CODES = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};
// Creates the array to hold the KEY_CODES and sets all their values
// to false. Checking true/flase is the quickest way to check status
// of a key press and which one was pressed when determining
// when to move and which direction.
KEY_STATUS = {};
for (var code in KEY_CODES) {
  KEY_STATUS[ KEY_CODES[ code ]] = false;
}
/**
 * Sets up the document to listen to onkeydown events (fired when
 * any key on the keyboard is pressed down). When a key is pressed,
 * it sets the appropriate direction to true to let us know which
 * key it was.
 */
document.onkeydown = function(e) {
  // Firefox and opera use charCode instead of keyCode to
  // return which key was pressed.
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = true;
  }
};
/**
 * Sets up the document to listen to ownkeyup events (fired when
 * any key on the keyboard is released). When a key is released,
 * it sets teh appropriate direction to false to let us know which
 * key it was.
 */
document.onkeyup = function(e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = false;
  }
};

        //move the rocket
        // setting up the rocket
        //why are we explicitly specifying width
        //of individual sprite
        // can also be done the other way around
        //by specifying the number of frames explicitly
        this.x =64;
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
        var that =this;
        this.move = function(){
            //this.x =64;
            //this.y = 50;
            //this.speed = 6;
            //if(KEY_STATUS.right || KEY_STATUS.left){
            //    //rocket moved, erase current image
            //    run.initial.ctx.clearRect(64,that.y,that.width, that.height);
            //}

            if(KEY_STATUS.up){
                that.y -= that.speed;

                if(that.y <= -(run.initial.canvas.height*0.5)){
                    that.y = 0;
                }
            }
            if(KEY_STATUS.down) {
                that.y += that.speed;

                if (that.y >= run.initial.canvas.height) {
                    that.y = run.initial.canvas.height*0.5;
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



