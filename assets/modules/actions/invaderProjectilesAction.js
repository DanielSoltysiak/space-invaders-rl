import { DEATH_REWARD } from "../../spaceInvadersTensor.js";

export default function invaderProjectilesAction(gameHeight, game, player, invaderProjectiles, points) {
    invaderProjectiles.forEach((invaderProjectile, index) => {
        if (invaderProjectile.position.y + invaderProjectile.height >= gameHeight) { 
            invaderProjectiles.splice(index, 1)
        } else invaderProjectile.update()

        // projectile hits player
        if (invaderProjectile.position.y + invaderProjectile.height >= player.position.y &&
            invaderProjectile.position.x + invaderProjectile.width >= player.position.x &&
            invaderProjectile.position.x <= player.position.x + player.width) {
                invaderProjectiles.splice(index, 1)
                player.lifes -= 1
                points += DEATH_REWARD;
                if (player.lifes < 1) {
                    game.over = true
                    game.active = false    
                }
        }
    })
    return points
}