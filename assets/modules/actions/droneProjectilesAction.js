export default function droneProjectilesAction(gameHeight, game, player, droneProjectiles) {
    droneProjectiles.forEach((droneProjectile, index) => {
        if (droneProjectile.position.y + droneProjectile.height >= gameHeight) { 
            droneProjectiles.splice(index, 1)
        } else droneProjectile.update()

        // projectile hits player
        if (droneProjectile.position.y + droneProjectile.height >= player.position.y &&
            droneProjectile.position.x + droneProjectile.width >= player.position.x &&
            droneProjectile.position.x <= player.position.x + player.width) {
                droneProjectiles.splice(index, 1)
                game.over = true
                game.active = false
        }
    })

}