import * as tf from '@tensorflow/tfjs';

import { canvas } from './constants/canvas.js';
import {ALL_ACTIONS, getStateTensor, SpaceInvadersGame} from './spaceInvadersTensor.js'
import { renderSpaceInvadersGame } from './spaceInvadersGraphics.js'

let game;
let qNet;

let cumulativeReward = 0;
let cumulativePoints = 0;

async function reset() {
    if (game == null) {
        return;
    }
    game.reset()
    await calcQValuesAndBestAction();
    renderSpaceInvadersGame(canvas, game);
}

async function step() {
    const {reward, done, pointsEarned } = game.step(bestAction);
    invalidateQValuesAndBestAction();
    cumulativeReward += reward;
    if (pointsEarned) {
        cumulativePoints++;
    }
    if (done) {
        cumulativeReward = 0;
        cumulativePoints = 0;
    }
    await calcQValuesAndBestAction();
    renderSpaceInvadersGame(canvas, game) 
}

let currentQValues;
let bestAction;

async function calcQValuesAndBestAction() {
    if (currentQValues != null) {
        return;
    }
    tf.tidy(() => {
        const stateTensor = getStateTensor(game.getState(), game.height, game.width);
        const predictOut = qNet.predict(stateTensor);
        currentQValues = predictOut.dataSync();
        bestAction = ALL_ACTIONS[predictOut.argMax(-1).dataSync()[0]];
    })
}

function invalidateQValuesAndBestAction() {
    currentQValues = null;
    bestAction = null;
}

const LOCAL_MODEL_URL = './dqn/model.json';

async function initGame() {
    game = new SpaceInvadersGame();

    // Warm up qNet.
    for (let i = 0; i < 3; ++i) {
        qNet.predict(getStateTensor(game.getState(), game.height, game.width))
    }

    await reset();

    setInterval(() => step(game, qNet), 10);
}

(async function() {
    try {
        qNet = await tf.loadLayersModel(LOCAL_MODEL_URL);
        initGame();
    } catch (err) {
        console.log(err)
        console.log('Loading local model failed.');
    }
})();