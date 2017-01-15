var runner = (function (run) {

    run.ball = function (_mass, _rad, _pos, _vel) {

        var that_ball = this;
        //var Ball = function (_mass, _rad, _pos, _vel) {
            RigidBody.call(this, _mass, _rad, _rad, _pos, _vel);
            this.radius = _rad;
        //};

        //Ball.prototype = Object.create(Ball.prototype);
        //Ball.prototype.constructor = Ball;

        this.update = function (dt) {
            RigidBody.prototype.setGravity.call(this);
            RigidBody.prototype.update.call(this, dt);

            // random values presented here
            // not analysing
            if (this.pos.x > window.innerWidth || this.pos.x < 0 || this.pos.y + this.radius * 2 > window.innerHeight || this.pos.y < 0) {
                this.change_vel();
            }

        };

//CHECK
        this.draw = function (ctx, fill) {
            ctx.fillStyle = fill;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();


        };

//write a method which bounces of the ball from the wall
        this.change_vel = function () {
            this.vel.x = -this.vel.x;
            this.vel.y = -this.vel.y;
            //this.vel = new Vector2();
        };


//change and watch
        this.reset = function () {
            this.pos = new Vector2(window.innerWidth / 2 - 100 + 200 * Math.random(), -this.radius * 2 - 400 * Math.random());
            this.vel = new Vector2();
        };


        this.getClosestPoints = function (rBody) {

            var contacts = [];
            var ballA = this;

            if (rBody instanceof  run.ball) {
                var ballB = rBody;

                var delta = new Vector2(ballB.pos.x - ballA.pos.x, ballB.pos.y - ballA.pos.y);

                var n;

                if (delta.getLength()) {
                    n = delta.getNormal();
                }
                else {
                    n = new Vector2(1, 0);
                }

                var pa = new Vector2();
                pa.x = ballA.pos.x + n.x * ballA.radius;
                pa.y = ballA.pos.y + n.y * ballA.radius;

                var pb = new Vector2();
                pb.x = ballB.pos.x - n.x * ballA.radius;
                pb.y = ballB.pos.y - n.y * ballA.radius;

                var dist = delta.getLength() - (ballA.radius + ballB.radius);
                contacts.push(new Contact(ballA, ballB, pa, pb, n, dist));

            }
            else if (rBody instanceof run.bullet) {
                var rectangleB = rBody;

                contacts = rectangleB.getClosestPoints(this);
                utils.flipContacts(contacts);

            } else {
            }

            return contacts;
        };


    };


    return run

})(runner || {});


