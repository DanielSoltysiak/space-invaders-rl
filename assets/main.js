import { canvas, canvasContext } from './constants/canvas.js';
import Player from './modules/gameObjectsAnimated/Player/Player.js';

import particlesAnimation, { stars } from './modules/animations/particlesAnimation.js'
import invaderProjectilesAnimation from './modules/animations/invaderProjectilesAnimation.js'
import playerProjectilesAnimation from './modules/animations/playerProjectilesAnimation.js'
import invadersAnimation from './modules/animations/invadersAnimation.js';
import playerAnimation from './modules/animations/playerAnimation.js';
import invadersSpawn from './modules/animations/invadersSpawn.js';

import keysHandler from './modules/keysHandler.js';

const player = new Player(canvas, canvasContext)
const playerProjectiles = []
const grids = []
const invaderProjectiles = []
const particles = []

let frames = 0
let game = {
    over: false,
    active: true
}

stars(canvas, particles);

export function animate() {
    const state = {playerPosition: player.position, invaders: grids, invaderProjectiles: invaderProjectiles }
    console.log(state);
    if(!game.active) return
    requestAnimationFrame(animate)
    canvasContext.fillStyle = 'black'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    player.update(canvasContext)
    
    particlesAnimation(canvas, canvasContext, particles)

    invaderProjectilesAnimation(canvas, canvasContext, game, player, invaderProjectiles, particles)

    playerProjectilesAnimation(canvasContext, playerProjectiles)

    invadersAnimation(canvas, canvasContext, frames, grids, invaderProjectiles, playerProjectiles, particles)

    playerAnimation(canvas, player)

    invadersSpawn(frames, grids)

    frames++
}

animate()

keysHandler(game, player, playerProjectiles);