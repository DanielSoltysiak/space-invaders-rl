export default function playerProjectilesAnimation(canvasContext, playerProjectiles) {
    playerProjectiles.forEach((projectile, index) => {
        if(projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                playerProjectiles.splice(index, 1)
            }, 0)
        } else {
            projectile.update(canvasContext)
        }
    })
}