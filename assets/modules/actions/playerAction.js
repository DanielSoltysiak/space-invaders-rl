import { multiplier } from '../../constants/tensorCanvas.js';
import { ACTION_SHOOT, ACTION_TURN_LEFT, ACTION_TURN_RIGHT, ALIVE_REWARD } from '../../spaceInvadersTensor.js';
import Projectile from '../gameObjects/Player/Projectile.js';

export default function playerAction(canvas, player, action, playerProjectiles, points) {
    player.velocity.x = 0
    points += ALIVE_REWARD
    // console.log(action)
    if(action === ACTION_TURN_LEFT && (player.position.x >= 0)) {
        player.velocity.x = -5 * multiplier
        // console.log('ACTION_TURN_LEFT')
    } else if(action === ACTION_TURN_RIGHT && (player.position.x + player.width <= canvas.width) ) {
        player.velocity.x = 5 * multiplier
        // console.log('ACTION_TURN_RIGHT')
    } else if(action === ACTION_SHOOT) {
        playerProjectiles.push(new Projectile({
            position: {
                x: player.position.x + player.width / 2,
                y: player.position.y
            },
            velocity: {
                x: 0,
                y: -10 * multiplier
            }
        }))
        // console.log('ACTION_SHOOT')
    } else  {
        player.velocity.x = 0
    }
    return points
}