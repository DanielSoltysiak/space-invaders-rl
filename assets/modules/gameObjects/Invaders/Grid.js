import Invader from './Invader.js'
import { scale } from '../../../constants/tensorCanvas.js';

export default class Grid {
    constructor(invadersAmount) {
        this.invadersAmount = invadersAmount
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 1.5 * scale,
            y: 0
        }

        this.invaders = []

        this.invadersInRowWidth = this.invadersAmount >= 15 ? 15 : this.invadersAmount
        this.width = this.invadersInRowWidth * 30 * scale

        let x = this.position.x;
        let y = this.position.y;
        let invadersInRow = 0;

        for (let i = 0; i < invadersAmount; i++) {
            this.invaders.push(new Invader({position: { x, y }}));
            x += 30 * scale; // increment x position by invader width
        
            if (++invadersInRow >= 15) {
              // if maximum number of invaders in row is reached, reset x position and increment y position
              x = this.position.x;
              y += 30 * scale; // increment y position by invader height
              invadersInRow = 0;
            }
        }

        const takenSpace = []
        this.invaders.forEach(invader => {
            // for (let i = parseInt(invader.position.y) ; i <  parseInt(invader.position.y + invader.height); i++) {
            //     takenSpace.push([parseInt(invader.position.x), i])
            // }
            for (let i = parseInt(invader.position.x) ; i < parseInt(invader.position.x + invader.width); i++) {
                takenSpace.push([i, parseInt(invader.position.y + invader.height)])
            }
            // for (let i = parseInt(invader.y) ; i < parseInt(invader.position.y + invader.height); i++) {
            //     takenSpace.push([parseInt(invader.position.x + invader.width) , i])
            // }
        })
        this.takenSpace = takenSpace;
    }

    update(canvas) {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y = 0

        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y = 30 * scale
        }
        const takenSpace = []
        this.invaders.forEach(invader => {
            // for (let i = parseInt(invader.position.y) ; i <  parseInt(invader.position.y + invader.height); i++) {
            //     takenSpace.push([parseInt(invader.position.x), i])
            // }
            for (let i = parseInt(invader.position.x) ; i < parseInt(invader.position.x + invader.width); i++) {
                takenSpace.push([i, parseInt(invader.position.y + invader.height)])
            }
            // for (let i = parseInt(invader.y) ; i < parseInt(invader.position.y + invader.height); i++) {
            //     takenSpace.push([parseInt(invader.position.x + invader.width) , i])
            // }
        })
        this.takenSpace = takenSpace;

    }
}