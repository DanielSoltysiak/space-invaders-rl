import { multiplier } from '../../../constants/tensorCanvas.js';

export default class Projectile {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity

        this.radius = 4 * multiplier
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}