import * as tf from '@tensorflow/tfjs';
import {assertPositiveInteger, getRandomInteger} from './utils.js';
import { tensorCanvas as canvas } from './constants/tensorCanvas.js';
import Player from './modules/gameObjects/Player/Player.js';
import droneProjectilesAction from './modules/actions/droneProjectilesAction.js';
import playerProjectilesAction from './modules/actions/playerProjectiesAction.js';
import dronesAction from './modules/actions/dronesAction.js';
import playerAction from './modules/actions/playerAction.js';
import dronsesSpawn from './modules/actions/dronesSpawn.js';

export const ALIVE_REWARD = -0.0001;
export const KILL_REWARD = 16;
export const DEATH_REWARD = -100;

export const DRONE_KILL_REWARD = 10;

export const ACTION_SHOOT = 0;
export const ACTION_TURN_RIGHT = 1;
export const ACTION_TURN_LEFT = 2;

export const ALL_ACTIONS = [ACTION_SHOOT, ACTION_TURN_RIGHT, ACTION_TURN_LEFT];
export const NUM_ACTIONS = ALL_ACTIONS.length;

export function getRandomAction() {
    return getRandomInteger(0, NUM_ACTIONS);
}

export class SpaceInvadersGame {
    constructor() {
        let frames = 0
        let game = {
            over: false,
            active: true
        }
        
        this.height = canvas.height;
        this.width = canvas.width;
        this.frames = frames;
        this.game = game;

        this.player_ = new Player(canvas)
        this.playerProjectiles_ = [];
        this.drones_ = dronsesSpawn();
        this.dronesProjectiles_ = [];
        this.points_ = 0;

        this.reset();
    }

    reset() {
        this.player_ = new Player(canvas)
        this.playerProjectiles_ = [];
        this.drones_ = dronsesSpawn();
        this.dronesProjectiles_ = [];
        this.points_ = 0;
        return this.getState();
    }

    step(action) {
        let done = this.game.over;
        if (this.drones_.length === 0) {
            this.points_ += DRONE_KILL_REWARD * 3
            if (!done) return {reward: this.points_}
        }
        if (done) {
            return {reward: this.points_ += DEATH_REWARD, done}
        }
        
        this.player_.update()

        droneProjectilesAction(canvas.height, this.game, this.player_, this.dronesProjectiles_)

        playerProjectilesAction(this.playerProjectiles_)

        this.points_ = dronesAction(this.frames, this.drones_, this.dronesProjectiles_, this.playerProjectiles_, this.points_)

        this.points_ = playerAction(canvas, this.player_, action, this.playerProjectiles_, this.points_)

        this.frames++

        const state = this.getState();
        // console.log('i:\n')
        // console.log(state.i)
        // console.log('i[0]:\n')
        // console.log(state.i[0])
        const reward = this.points_
        this.points_ = 0;
        return {state, reward, done}
    }

    getState() {
        return {
            "p": this.player_.takenSpace,
            "i": this.drones_.map(g => g.takenSpace),
            "ip": this.dronesProjectiles_.map(p => p.takenSpace),
        }
    }
}

export function getStateTensor(state, h, w) {
    if (!Array.isArray(state)) {
        state = [state];
    }

    const numExamples = state.length;
    const buffer = tf.buffer([numExamples, h, w, 3]);

    for (let n = 0; n < numExamples; ++n) {
        if (state[n] == null) {
            continue;
        }
        // if(state[n].i[0]){console.log(state[n].i)}
        state[n].p.forEach(yx => {
            buffer.set(1, n, yx[0], yx[1], 1);
        });

        state[n].i.forEach(g => {
            g.forEach(yx => buffer.set(2, n, yx[0], yx[1], 1));
        });

        state[n].ip.forEach(ip => {
            ip.forEach(yx => buffer.set(3, n, yx[0], yx[1], 1));
        });
    }
    return buffer.toTensor();
}
