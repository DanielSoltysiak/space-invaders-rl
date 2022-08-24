export default function playerProjectilesAction(playerProjectiles) {
    playerProjectiles.forEach((projectile, index) => {
        if(projectile.position.y + projectile.radius <= 0) {
                playerProjectiles.splice(index, 1)
        } else {
            projectile.update()
        }
    })
}