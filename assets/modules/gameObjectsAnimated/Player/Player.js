export default class Player {
    constructor(canvas) {
        this.lifes = 3
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0
        this.opacity = 1

        const image = new Image()
        image.onload = () => {
            const scale = 0.15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 10
            }
        }
        image.src = './assets/img/spaceship.png'
        
    }

    draw(canvasContext) {
        canvasContext.save()
        canvasContext.globalAlpha = this.opacity
        canvasContext.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)

        canvasContext.rotate(this.rotation)
        canvasContext.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2)

        canvasContext.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    
        canvasContext.restore()
    }

    update(canvasContext) {
        if(this.image) {
            this.draw(canvasContext)
            this.position.x += this.velocity.x
        }
    }
}