import { KILL_REWARD } from "../../spaceInvadersTensor.js";

export default function invadersAction(canvas, frames, grids, invaderProjectiles, playerProjectiles, points) {
    grids.forEach((grid, gridIndex) => {
        grid.update(canvas)

        // spawn enemies projectiles 
        if(frames % 200 === 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles)
        }

        grid.invaders.forEach((invader, i) => {
            invader.update({velocity: grid.velocity})

            // playerProjectiles hit enemy
            playerProjectiles.forEach((projectile, j) => {
                if (
                    projectile.position.y - projectile.radius <= 
                        invader.position.y + invader.height && 
                    projectile.position.x + projectile.radius >= 
                        invader.position.x && 
                    projectile.position.x - projectile.radius <= 
                        invader.position.x + invader.width && 
                    projectile.position.y + projectile.radius >= 
                        invader.position.y
                ) {
                    const invaderFound = grid.invaders.find((invader2) => invader2 === invader)
                    const projectileFound = playerProjectiles.find(projectile2 => projectile2 === projectile )
                    points += KILL_REWARD;

                    // remove invader and projectile
                    if(invaderFound && projectileFound) {

                        grid.invaders.splice(i, 1)
                        playerProjectiles.splice(j, 1)

                        if(grid.invaders.length > 0) {
                            const firstInvader = grid.invaders[0]
                            const lastInvader = grid.invaders[grid.invaders.length - 1]

                            grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width
                            grid.position.x = firstInvader.position.x
                        } else {
                            grids.splice(gridIndex, 1)
                        }
                    }
                }
            })
        }) 
    })
    return points
}