import particlesAnimation, { stars } from './modules/animations/particlesAnimation.js'
import { canvas } from './constants/canvas.js';
import { multipier } from './constants/tensorCanvas.js';

const particles = []

stars(canvas, particles);

function drawPlayer(canvasContext, player) {
    canvasContext.save()
    // canvasContext.globalAlpha = player.opacity
    // canvasContext.translate((player.position.x * multipier + player.width * multipier / 2), (player.position.y * multipier + player.height * multipier / 2))

    // canvasContext.rotate(player.rotation)
    // canvasContext.translate(-player.position.x - player.width / 2, -player.position.y - player.height / 2)

    // const playerImage = new Image();
    // playerImage.scr = './img/spaceship.png'
    // playerImage.onload = () => {
    //     console.log(playerImage)
    //     canvasContext.drawImage(playerImage, player.position.x, player.position.y, player.width, player.height)
    // }
    canvasContext.fillStyle = 'blue'
    canvasContext.fillRect(player.position.x * multipier, player.position.y * multipier, player.width  * multipier, player.height * multipier)
    canvasContext.restore()
}

function drawPlayerProjectile(canvasContext, playerProjectile) {
    canvasContext.beginPath()
    canvasContext.arc(playerProjectile.position.x * multipier, playerProjectile.position.y * multipier, playerProjectile.radius * multipier, 0, Math.PI * 2)
    canvasContext.fillStyle = 'red'
    canvasContext.fill()
    canvasContext.closePath()
}

function drawDrone(canvasContext, drone) {
    // const droneImage = new Image();
    // droneImage.onload = () => {
    //     canvasContext.drawImage(droneImage, drone.position.x, drone.position.y, drone.width, drone.height)
    // }
    // droneImage.src = './assets/img/drone.png'
    canvasContext.fillStyle = 'pink'
    canvasContext.fillRect(drone.position.x * multipier, drone.position.y * multipier, drone.width * multipier, drone.height * multipier)
}

function drawDroneProjectile(canvasContext, droneProjectile) {
    canvasContext.fillStyle = 'orange'
    canvasContext.fillRect(droneProjectile.position.x * multipier, droneProjectile.position.y * multipier, droneProjectile.width * multipier, droneProjectile.height * multipier)
}

export function renderSpaceInvadersGame(canvas, game) {
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, width, height)

    drawPlayer(ctx, game.player_)

    particlesAnimation(canvas, ctx, particles);

    for (let i = 0; i < game.dronesProjectiles_.length; i++) {
        drawDroneProjectile(ctx, game.dronesProjectiles_[i])
    }

    for (let i = 0; i < game.playerProjectiles_.length; i++) {
        drawPlayerProjectile(ctx, game.playerProjectiles_[i])
    }

    for (let i = 0; i < game.drones_.length; i++) {
        drawDrone (ctx, game.drones_[i])
    }
}