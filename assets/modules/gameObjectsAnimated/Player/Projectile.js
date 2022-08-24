export default class Projectile {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity

        this.radius = 4
    }

    draw(canvasContext) {
        canvasContext.beginPath()
        canvasContext.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        canvasContext.fillStyle = 'red'
        canvasContext.fill()
        canvasContext.closePath()
    }

    update(canvasContext) {
        this.draw(canvasContext)
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}