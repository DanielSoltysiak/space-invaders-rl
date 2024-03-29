import { scale } from '../../../constants/tensorCanvas.js';

export default class Player {
    constructor(canvas) {
        this.velocity = {
            x: 0,
            y: 0
        }

        const playerScale = 0.15 * scale
        this.width = 512 * playerScale 
        this.height = 512 * playerScale
        this.position = {
            x: canvas.width / 2 - this.width / 2,
            y: canvas.height - this.height - 10 * scale
        }
        const takenSpace = []
        // for (let i = parseInt(this.position.y) ; i < parseInt(this.position.y + this.height); i++) {
        //     takenSpace.push([parseInt(this.position.x), i])
        // }
        for (let i = parseInt(this.position.x) ; i < parseInt(this.position.x + this.width); i++) {
            takenSpace.push([i, parseInt(this.position.y)])
        }
        // for (let i = parseInt(this.position.y); i <  parseInt(this.position.y + this.height); i++) {
        //     takenSpace.push([parseInt(this.position.x + this.width) , i])
        // }
        this.takenSpace = takenSpace;
    }

    update() {
        this.position.x += this.velocity.x
        const takenSpace = []
        // for (let i = parseInt(this.position.y) ; i < parseInt(this.position.y + this.height); i++) {
        //     takenSpace.push([parseInt(this.position.x), i])
        // }
        for (let i = parseInt(this.position.x) ; i < parseInt(this.position.x + this.width); i++) {
            takenSpace.push([i, parseInt(this.position.y)])
        }
        // for (let i = parseInt(this.position.y); i <  parseInt(this.position.y + this.height); i++) {
        //     takenSpace.push([parseInt(this.position.x + this.width) , i])
        // }
        this.takenSpace = takenSpace;
    }
}