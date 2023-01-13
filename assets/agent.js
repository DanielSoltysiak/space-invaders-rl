import * as tf from '@tensorflow/tfjs';

import {createDeepQNetwork} from './dqn.js';
import { getRandomAction, NUM_ACTIONS, ALL_ACTIONS, getStateTensor, KILL_REWARD } from './spaceInvadersTensor.js';
import { ReplayMemory } from './replayMemory.js';
import { assertPositiveInteger } from './utils.js';

export class GameAgent {
    constructor(game, config) {
        assertPositiveInteger(config.epsilonDecayFrames);

        this.game = game;

        this.epsilonInit = config.epsilonInit;
        this.epsilonFinal = config.epsilonFinal;
        this.epsilonDecayFrames = config.epsilonDecayFrames;
        this.epsilonIncrement_ = (this.epsilonFinal - this.epsilonInit) /
            this.epsilonDecayFrames;

        this.onlineNetwork = createDeepQNetwork(game.height, game.width ,NUM_ACTIONS);
        this.targetNetwork = createDeepQNetwork(game.height, game.width ,NUM_ACTIONS);

        this.targetNetwork.trainable = false;

        this.optimizer = tf.train.adam(config.learningRate);

        this.optimizer = tf.train.adam(config.learningRate);

        this.replayBufferSize = config.replayBufferSize;
        this.replayMemory = new ReplayMemory(config.replayBufferSize);
        this.frameCount = 0;
        this.reset();    
    }

    reset() {
        this.cumulativeReward_ = 0;
        this.pointsEarned_ = 0;
        this.game.reset();
    }

    playStep() {
        this.epsilon = this.frameCount >= this.epsilonDecayFrames ?
            this.epsilonFinal :
            this.epsilonInit + this.epsilonIncrement_ * this.frameCount;
        this.frameCount++;

        let action;
        const state = this.game.getState();
        if (Math.random() < this.epsilon) {
            action = getRandomAction();
        } else {
            tf.tidy(() => {
                const stateTensor = getStateTensor(state, this.game.height, this.game.width) 
                action = ALL_ACTIONS[this.onlineNetwork.predict(stateTensor).argMax(-1).dataSync()[0]];
            })
        }

        const {state: nextState, reward, done} = this.game.step(action);

        this.replayMemory.append([state, action, reward, done, nextState]);

        this.cumulativeReward_ += reward;

        if (reward > 0) {
            let enemiesKilled = Math.ceil(reward/KILL_REWARD)
            this.pointsEarned_ + enemiesKilled;
          }
        const output = {
            action,
            cumulativeReward: this.cumulativeReward_,
            done: done,
            pointsEarned: this.pointsEarned_
        };
        if (done) {
            this.reset();
        }
        return output;
    }

    trainOnReplayBatch(batchSize, gamma, optimizer) {
        const batch = this.replayMemory.sample(batchSize);
        const lossFunction = () => tf.tidy(() => {
            const stateTensor = getStateTensor(batch.map(example => example[0]), this.game.height, this.game.width)
            const actionTensor = tf.tensor1d(batch.map(example => example[1]), 'int32');
            const qs = this.onlineNetwork.apply(stateTensor, {training: true}).mul(tf.oneHot(actionTensor, NUM_ACTIONS)).sum(-1);

            const rewardTensor = tf.tensor1d(batch.map(example => example[2]));
            const nextStateTensor = getStateTensor(batch.map(example => example[4]), this.game.height, this.game.width);
            const nextMaxQTensor = this.targetNetwork.predict(nextStateTensor).max(-1);
            const doneMask = tf.scalar(1).sub(tf.tensor1d(batch.map(example => example[3])).asType('float32'));
            const targetQS = rewardTensor.add(nextMaxQTensor.mul(doneMask).mul(gamma));
            return tf.losses.meanSquaredError(targetQS, qs);
        });

        const grads = tf.variableGrads(lossFunction);

        optimizer.applyGradients(grads.grads);
        tf.dispose(grads);
    }
}
