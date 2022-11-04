import Invader from './Invader.js'
import { multiplier } from '../../../constants/tensorCanvas.js';

export default class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 2 * multiplier,
            y: 0
        }

        this.invaders = []

        const columns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 2)

        this.width = columns * 30 * multiplier
        this.height = rows * 30 * multiplier

        for (let x =0; x < columns; x++) {
            for (let y =0; y < rows; y++) {
                this.invaders.push(
                    new Invader(
                        {position: 
                            {
                                x: x * 30 * multiplier,
                                y: y * 30 * multiplier
                            }
                        }
                    )
                )
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
            this.velocity.y = 30 * multiplier
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