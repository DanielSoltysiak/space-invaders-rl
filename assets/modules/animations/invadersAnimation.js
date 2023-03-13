import { explosion } from "./particlesAnimation.js"

const scoreEl = document.querySelector('#scoreEl');
let score = 0;

export default function invadersAnimation(canvas, canvasContext, frames, grids, invaderProjectiles, playerProjectiles, particles) {

    grids.forEach((grid, gridIndex) => {
        grid.update(canvas)

        // spawn enemies projectiles 
        if(frames % 300 === 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles)
        }

        grid.invaders.forEach((invader, i) => {
            invader.update(canvasContext, {velocity: grid.velocity})

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
                    setTimeout(() => {
                        const invaderFound = grid.invaders.find((invader2) => invader2 === invader)
                        const projectileFound = playerProjectiles.find(projectile2 => projectile2 === projectile )

                        // remove invader and projectile
                        if(invaderFound && projectileFound) {
                            score += 100
                            scoreEl.innerHTML = score

                            explosion({
                                object: invader,
                                fades: true
                            }, particles)
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
                    }, 0)
                }
            })
        }) 
    })
}