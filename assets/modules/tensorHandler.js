import {ACTION_SHOOT, ACTION_TURN_LEFT, ACTION_TURN_RIGHT} from '../spaceInvadersTensor.js'
import { keys } from "../constants/keys.js"
import Projectile from "./gameObjects/Player/Projectile.js"

export default function tensorHandler(game, action, player, playerProjectiles) {
    if (game.over) return

    switch (action) {
        case ACTION_TURN_LEFT:
            keys.d.pressed = false;
            keys.a.pressed = true;
            break
        case ACTION_TURN_RIGHT:
            keys.a.pressed = false;
            keys.d.pressed = true;
            break
        case ACTION_SHOOT:
            keys.a.pressed = false;
            keys.d.pressed = false;
            playerProjectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            }))
            break 
    }
}