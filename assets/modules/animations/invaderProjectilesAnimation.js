import { explosion } from "./particlesAnimation.js"

export default function invaderProjectilesAnimation(canvas, canvasContext, game, player, invaderProjectiles, particles) {
    invaderProjectiles.forEach((invaderProjectile, index) => {
        if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
            setTimeout(() => {
                invaderProjectiles.splice(index, 1)
            }, 0)        
        } else invaderProjectile.update(canvasContext)

        // projectile hits player
        if (invaderProjectile.position.y + invaderProjectile.height >= player.position.y &&
            invaderProjectile.position.x + invaderProjectile.width >= player.position.x &&
            invaderProjectile.position.x <= player.position.x + player.width) {
            setTimeout(() => {
                invaderProjectiles.splice(index, 1)
                player.opacity = 0
                game.over = true
            }, 0)

            setTimeout(() => {
                game.active = false
            }, 1500) 

            explosion({
                object: player,
                color: 'red',
                fades: false
            }, particles)
        }
    })
}