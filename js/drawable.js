var runner = (function (run) {

    run.drawable = function () {
        this.init = function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        };
        this.speed = 0;
        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.collidableWith = "";
        this.isColliding = false;
        this.type = "";

        this.draw = function () {
        };
        this.move = function () {
        };

        this.isCollidableWith = function (objects) {
            return (this.collidableWith === this.type);
        };


    };

    run.drawable.prototype = Object.create(RigidBody.prototype);

    return run

})(runner || {});

