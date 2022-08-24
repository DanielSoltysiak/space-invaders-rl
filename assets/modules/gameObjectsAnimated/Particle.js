export default class Particle {
    constructor({position, velocity, radius, color, fades}){
        this.position = position
        this.velocity = velocity

        this.radius = radius
        this.color = color
        this.opacity = 1
        this.fades = fades
    }

    draw(canvasContext) {
        canvasContext.save()
        canvasContext.globalAlpha = this.opacity
        canvasContext.beginPath()
        canvasContext.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        canvasContext.fillStyle = this.color
        canvasContext.fill()
        canvasContext.closePath()
        canvasContext.restore()
    }

    update(canvasContext) {
        this.draw(canvasContext)
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.fades) this.opacity -= 0.01
    }
}