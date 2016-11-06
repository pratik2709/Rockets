var runner = (function (run) {

    run.bullet = function (object) {


        this.speed = 0;
        this.collidableWith = "";
        this.isColliding = false;
        this.type = "";

        this.width = 2;
        this.height = 14;
        this.in_use = false;
        var self = object;
        var that = this;

        this.init = function (x, y, width, height) {

            RigidBody.call(that, 0, this.width, this.height, new Vector2(x, y), new Vector2(0, 0));

            this.thetaVelocity = 0;
            this.theta = 0;
            this.matrix = new Matrix();
            this.matrix.set(this.theta, 0, 0);

            this.halfExtendMinus = new Vector2(-width / 2, -height / 2);
            this.halfExtendPlus = new Vector2(width / 2, height / 2);
            this.x = x;
            this.y = y;

            this.width = width;
            this.height = height;
        };


        this.spawn = function (x, y, speed) {
            //RigidBody.call(that, 0, this.width, this.height, new Vector2(x, y), new Vector2(0, 0));
            this.thetaVelocity = 0;
            this.theta = 0;
            this.matrix = new Matrix();
            this.matrix.set(this.theta, 0, 0);

            this.halfExtendMinus = new Vector2(-this.width / 2, -this.height / 2);
            this.halfExtendPlus = new Vector2(this.width / 2, this.height / 2);

            this.x = x;
            this.y = y;
            this.pos.x = x;
            this.pos.y = y;
            this.speed = speed;
            this.in_use = true;

        };

        this.draw = function () {
            //run.initial.ctx.clearRect(this.x - 1, this.y - 1, this.width + 1, this.height + 1); //to avoid the blur ?
            this.x += this.speed;
            this.pos.x += this.speed;

            if (this.isColliding) {
                return true;
            }


            if (self === "bullet" && this.x >= run.initial.canvas.width) {
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
            this.pos.x = 0;
            this.pos.y = 0;
            this.speed = 0;
            this.in_use = false;
            this.isColliding = false;
        };

        this.getClosestPoints = function (rigidBody) {

            var contacts = [];

            if (rigidBody instanceof  run.ball) {
                var rectangleA = that;
                var ballB = rigidBody;

                var xPosition = ballB.pos.x - rectangleA.pos.x;
                var yPosition = ballB.pos.y - rectangleA.pos.y;

                var delta = new Vector2();
                delta.set(xPosition, yPosition);

                this.matrix.set(this.theta, 0, 0);
                var rotatedDeltaX = delta.x * this.matrix.cos + delta.y * this.matrix.sin;
                var rotatedDeltaY = -delta.x * this.matrix.sin + delta.y * this.matrix.cos;

                var rotatedVector = new Vector2();
                rotatedVector.set(rotatedDeltaX, rotatedDeltaY);

                var dClamped = rotatedVector.clamp(this.halfExtendMinus, this.halfExtendPlus);

                //getting back to worldspace

                var clamped = dClamped.rotate(this.theta);
                var clampedP = this.pos.copy().add(clamped);

                var distance = new Vector2();
                distance.set(ballB.pos.x - clampedP.x, ballB.pos.y - clampedP.y);

                var normal = distance.getNormal();
                var pa = clampedP;


                var pb = ballB.pos.copy().subtractMultipledVector(ballB.radius, normal);

                var distance_between_circle_and_obb = distance.getLength() - ballB.radius;

                this.clamedP = clampedP;
                this.d = distance;
                this.pb = pb;

                //console.log("here");
                //console.log(that.x);

                //console.log(distance_between_circle_and_obb);
                if(distance_between_circle_and_obb <= 0){
                    console.log("heppen");
                }
                contacts.push(new Contact(rectangleA, ballB, pa, pb, normal, distance_between_circle_and_obb));

            }

            return contacts;

        };


    };

    run.bullet.prototype = new run.drawable();


    return run

})(runner || {});

//Bullet.prototype = new Drawable();