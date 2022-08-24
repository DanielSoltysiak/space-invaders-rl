import { keys } from "../constants/keys.js"
import Projectile from "./gameObjectsAnimated/Player/Projectile.js"

export default function keysHandler(game, player, playerProjectiles) {
    addEventListener('keydown', ({key}) => {
        if(game.over) return
    
        switch(key) {
            case 'a':
                keys.a.pressed = true
                break
            case 'd':
                keys.d.pressed = true
                break
            case ' ':
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
    })
    
    addEventListener('keyup', ({key}) => {
        switch(key) {
            case 'a':
                keys.a.pressed = false
                break
            case 'd':
                keys.d.pressed = false
                break
            case ' ':
        }
    })
}