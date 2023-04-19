import Invader from './Invader.js'

export default class Grid {
    constructor(invadersAmount) {
        this.invadersAmount = invadersAmount
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 1.5,
            y: 0
        }

        this.invaders = []

        let x = this.position.x;
        let y = this.position.y;
        let invadersInRow = 0;

        for (let i = 0; i < invadersAmount; i++) {
            this.invaders.push(new Invader({position: { x, y }}));
            x += 30; // increment x position by invader width
        
            if (++invadersInRow >= 15) {
              // if maximum number of invaders in row is reached, reset x position and increment y position
              x = this.position.x;
              y += 30; // increment y position by invader height
              invadersInRow = 0;
            }
        }
    }

    update(canvas) {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y = 0

        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y = 30
        }
    }
}