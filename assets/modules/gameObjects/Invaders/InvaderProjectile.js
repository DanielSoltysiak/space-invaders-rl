import { scale } from '../../../constants/tensorCanvas.js';

export default class InvaderProjectile {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity

        this.width = 4 * scale
        this.height = 10 * scale

        const takenSpace = []
        for (let i = parseInt(this.position.x) ; i < parseInt(this.position.x + this.width); i++) {
            takenSpace.push([i, parseInt(this.position.y + this.height)])
        }
        this.takenSpace = takenSpace;
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        const takenSpace = []
        for (let i = parseInt(this.position.x) ; i < parseInt(this.position.x + this.width); i++) {
            takenSpace.push([i, parseInt(this.position.y + this.height)])
        }
        this.takenSpace
    }
}