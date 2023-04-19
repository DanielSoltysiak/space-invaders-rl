import Grid from '../gameObjectsAnimated/Invaders/Grid.js'

export default function invadersSpawn(increment, grids) {
    if(!grids[0] || grids[0].lenght === 0) {
        increment = increment + 1
        grids.push(new Grid(increment))
        return increment
    }
    return increment
}