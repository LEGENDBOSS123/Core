import Box from "./Box.mjs";
import Circle from "./Circle.mjs";
import Vector2 from "./Vector2.mjs"

export default class EnemyBullet extends Circle {
    static radius = 10;
    constructor(position = [0, 0], isStatic = false, acceleration = [0, 0], mass = 1, color = "brown") {
        super(position, isStatic, acceleration, mass, color);
        this.color = "pink";

        this.isEnemyBullet = true;
        this.health = 1;
        this.radius = 20;
        this.cashValue = 10;

    }

    draw(world, options) {
        const ctx = options.ctx;
        ctx.beginPath();
        ctx.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    step(deltaTime) {
        super.step(deltaTime);

        if (this.health < 0) {
            this.toBeRemoved = true;
            window.game.money += this.cashValue;
            window.game.soundManager.play("shatter0", 0.75);
        }

        const dx = - this.position[0];
        const dy = - this.position[1];
        const distanceSquared = dx * dx + dy * dy;
        if(distanceSquared > 9000000){
            this.health = 0;
        }
        const distance = Math.sqrt(distanceSquared);
        if (distance < 0.0001) {
            return;
        }
        const gConstant = 0.01;
        const force = gConstant * this.mass / Math.pow(distance, 1.5);
        const ax = dx * force;
        const ay = dy * force;
        this.acceleration[0] = ax;
        this.acceleration[1] = ay;

    }

    doCollisionWith(circle) {
        if (super.doCollisionWith(circle)) {
            if (circle.isShield) {
                this.health -= circle.damage;
                circle.dead = true;
            }
            return true;
        }
        return false;
    }

}

