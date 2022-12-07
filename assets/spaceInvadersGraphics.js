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

function drawInvader(canvasContext, invader) {
    // const invaderImage = new Image();
    // invaderImage.onload = () => {
    //     canvasContext.drawImage(invaderImage, invader.position.x, invader.position.y, invader.width, invader.height)
    // }
    // invaderImage.src = './assets/img/invader.png'
    canvasContext.fillStyle = 'pink'
    canvasContext.fillRect(invader.position.x * multipier, invader.position.y * multipier, invader.width * multipier, invader.height * multipier)
}

function drawInvaderProjectile(canvasContext, invaderProjectile) {
    canvasContext.fillStyle = 'orange'
    canvasContext.fillRect(invaderProjectile.position.x * multipier, invaderProjectile.position.y * multipier, invaderProjectile.width * multipier, invaderProjectile.height * multipier)
}

export function renderSpaceInvadersGame(canvas, game) {
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, width, height)

    drawPlayer(ctx, game.player_)

    particlesAnimation(canvas, ctx, particles);

    for (let i = 0; i < game.invadersProjectiles_.length; i++) {
        drawInvaderProjectile(ctx, game.invadersProjectiles_[i])
    }

    for (let i = 0; i < game.playerProjectiles_.length; i++) {
        drawPlayerProjectile(ctx, game.playerProjectiles_[i])
    }

    for (let i = 0; i < game.grids_.length; i++) {
        for (let j = 0; j < game.grids_[i].invaders.length; j++) {
            if(game.grids_[i].invaders[j]) {
                drawInvader (ctx, game.grids_[i].invaders[j])}
        }
    }
}