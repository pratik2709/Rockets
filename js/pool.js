var runner = (function (run) {

    run.pool = function (maxSize) {

        var size = maxSize; // Max bullets allowed in the pool
        var pool = [];

        this.init = function (object) {

            if (object === "bullet") {
                for (var i = 0; i < size; i++) {
                    // Initalize the bullet object
                    var bullet = new run.bullet("bullet");

                    // 2 and 14 are width and height
                    bullet.init(0, 0, 2, 14);
                    bullet.collidableWith = "enemy";
                    bullet.type = "bullet";
                    pool[i] = bullet;
                }
            }

        };

        this.get = function (x, y, speed) {
            if (!pool[size - 1].in_use) {
                pool[size - 1].spawn(x, y, speed);
                pool.unshift(pool.pop());
            }

        };

        this.getTwo = function (x1, y1, speed1, x2, y2, speed2) {
            if (!pool[size - 1].in_use && !pool[size - 2].in_use) {
                this.get(x1, y1, speed1);
                this.get(x2, y2, speed2);
            }
        };

        this.animate = function () {
            for (var i = 0; i < size; i++) {
                if (pool[i].in_use) {

                    if (pool[i].draw()) {
                        console.log("in use of bp");
                        pool[i].clear(); //no idea
                        pool.push((pool.splice(i, 1))[0]); //verify
                    }
                }
                else {
                    break;
                }
            }
        };

        this.getPool = function () {
            var obj = [];
            for (var i = 0; i < size; i++) {
                if (pool[i].in_use) {
                    obj.push(pool[i]);
                }

            }
            return obj;
        };

        //return {
        //    init: this.init,
        //    getTwo: this.getTwo,
        //    animate: this.animate,
        //    getPool: this.getPool,
        //    get: this.get
        //}


    };

    return run

})(runner || {});

