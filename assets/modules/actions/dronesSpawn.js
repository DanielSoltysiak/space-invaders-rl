import { scale } from '../../constants/tensorCanvas.js'
import Drone from '../gameObjects/Drone/Drone.js'

export default function dronsesSpawn() {
    const drones = [];
    drones.push(new Drone({x: 20 * scale, y: 10 * scale}));
    drones.push(new Drone({x: 360 * scale, y: 10 * scale}));
    drones.push(new Drone({x: 700 * scale, y: 10 * scale}));
    return drones;
}