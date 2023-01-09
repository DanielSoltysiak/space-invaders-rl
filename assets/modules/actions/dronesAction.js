import { DRONE_KILL_REWARD } from "../../spaceInvadersTensor.js";

export default function dronesAction(frames, drones, droneProjectiles, playerProjectiles, points) {
    drones.forEach((drone, i) => {
        drone.update()
        if(frames % 100 === 0) {
            drone.shoot(droneProjectiles);
        }

        playerProjectiles.forEach((projectile, j) => {
            if (
                projectile.position.y - projectile.radius <= 
                    drone.position.y + drone.height && 
                projectile.position.x + projectile.radius >= 
                    drone.position.x && 
                projectile.position.x - projectile.radius <= 
                    drone.position.x + drone.width && 
                projectile.position.y + projectile.radius >= 
                    drone.position.y
            ) {
                const droneFound = drones.find((drone2) => drone2 === drone)
                const projectileFound = playerProjectiles.find(projectile2 => projectile2 === projectile )
                points += DRONE_KILL_REWARD;
                // remove drone and projectile
                if(droneFound && projectileFound) {
                    drones.splice(i, 1)
                    playerProjectiles.splice(j, 1)
                }
            }
        })
    });
}