export default class InvaderProjectile {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity

        this.width = 4
        this.height = 10
    }

    draw(canvasContext) {
        canvasContext.fillStyle = 'orange'
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(canvasContext) {
        this.draw(canvasContext)
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}