import Grid from '../gameObjectsAnimated/Invaders/Grid.js'

let randomInterval = Math.floor((Math.random() * 500) + 500)

export default function invadersSpawn(frames, grids) {
    if (frames % randomInterval === 0) {
        grids.push(new Grid())
        randomInterval = Math.floor((Math.random() * 500) + 500)
        frames = 0
    }
}