import InvaderProjectile from "./InvaderProjectile.js"
import { scale } from '../../../constants/tensorCanvas.js';

export default class Invader {
    constructor({position}) {
        this.velocity = {
            x: 0,
            y: 0
        }

        const scale = 1 * scale
        this.width = 31 * scale
        this.height = 31 * scale
        this.position = {
            x: position.x,
            y: position.y
        }
    }

    update({velocity}) {
        this.position.x += velocity.x
        this.position.y += velocity.y
    }

    shoot(InvaderProjectiles) {
        InvaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x+ this.width / 2,
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 5 * scale
            }
        }))
    }
}