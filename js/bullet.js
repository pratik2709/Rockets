var runner = (function (run) {

    run.bullet = function (object) {

        this.speed = 0;
        this.collidableWith = "";
        this.isColliding = false;
        this.type = "";

        this.width = 256;
        this.height = 256;
        this.in_use = false;
        var self = object;

        this.spawn = function (x, y, speed) {
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.in_use = true;

        };

        this.draw = function () {
            run.initial.ctx.clearRect(this.x - 1, this.y - 1, this.width + 1, this.height + 1); //to avoid the blur ?
            this.y -= this.speed;

            if (this.isColliding) {
                return true;
            }


            if (self === "bullet" && this.y + this.height <= 0) {
                return true;
            }
            else if (self === "enemyBullet" && this.y >= run.initial.canvas.height) {
                return true;
            }
            else {
                if (self === "bullet") {
                    run.initial.ctx.drawImage(run.assetLoader.images.bullet, this.x, this.y);
                }
                return false;
            }

        };

        this.clear = function () {
            this.x = 0;
            this.y = 0;
            this.speed = 0;
            this.in_use = false;
            this.isColliding = false;
        };

        //return {
        //    spawn: this.spawn,
        //    draw: this.draw,
        //    isCollidableWith: this.isCollidableWith,
        //    clear: this.clear
        //}


    };

        run.bullet.prototype = new run.drawable();

    return run

})(runner || {});

//Bullet.prototype = new Drawable();