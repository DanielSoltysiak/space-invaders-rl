import Grid from '../gameObjects/Invaders/Grid.js'

export default function invadersSpawn(increment, grids) {
    if(!grids[0] || grids[0].lenght === 0) {
        increment = increment + 1
        console.log(increment)
        grids.push(new Grid(increment))
        return increment
    }
    return increment
}