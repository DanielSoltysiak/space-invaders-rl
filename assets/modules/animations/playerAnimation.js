import { keys } from "../../constants/keys.js"

export default function playerAnimation(canvas, player) {
    if(keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -5
        player.rotation = -0.15
    } else if(keys.d.pressed && player.position.x + player.width <= canvas.width ) {
        player.velocity.x = 5
        player.rotation = 0.15
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }

}