import DroneProjectile from "./DroneProjectile.js";
import { scale } from '../../../constants/tensorCanvas.js';

export default class Drone {
    constructor(startingPosition) {
        this.width = 51 * scale
        this.height = 51 * scale
        this.startingPosition = startingPosition;
        this.maxPosition = {
            x: startingPosition.x + 300 * scale,
            y: startingPosition.y + 100 * scale
        }
        this.position = {
            x: startingPosition.x,
            y: startingPosition.y
        }
        this.velocity = {
            x: 5 * scale,
            y: 0
        }
        const takenSpace = []
        for (let i = this.position.x; i < (this.position.x + this.width); i++) {
            takenSpace.push([i, this.position.y + this.height])
        }
        this.takenSpace = takenSpace;
    }

    update() {
        if(this.position.x <= this.maxPosition.x && this.position.y <= this.startingPosition.y) {
            this.velocity.x = 5 * scale;
            this.velocity.y = 0;
        } else if (this.position.x >= this.maxPosition.x && this.position.y <= this.maxPosition.y) {
            this.velocity.x = 0;
            this.velocity.y = 5 * scale;
        } else if (this.position.x >= this.startingPosition.x && this.position.y >= this.maxPosition.y) {
            this.velocity.x = -5 * scale;
            this.velocity.y = 0;
        } else if (this.position.x <= this.startingPosition.x && this.position.y >= this.startingPosition.y) {
            this.velocity.x = 0;
            this.velocity.y = -5 * scale;
        }
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        const takenSpace = []
        for (let i = this.position.x; i < (this.position.x + this.width); i++) {
            takenSpace.push([i, this.position.y + this.height])
        }
        this.takenSpace = takenSpace;
    }

    shoot(DroneProjectiles) {
        DroneProjectiles.push(new DroneProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 5 * scale
            }
        }))
    }
}