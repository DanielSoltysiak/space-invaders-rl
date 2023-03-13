import Grid from '../gameObjectsAnimated/Invaders/Grid.js'

let randomInterval = Math.floor((Math.random() * 700) + 700)

export default function invadersSpawn(frames, grids) {
    if (frames % randomInterval === 0) {
        grids.push(new Grid())
        randomInterval = Math.floor((Math.random() * 700) + 700)
        frames = 0
    }
}