import * as fs from 'fs';

import * as argparse from 'argparse';
import shelljs from 'shelljs';

import * as tfGpu from '@tensorflow/tfjs-node-gpu';
// import * as tfNonGpu from '@tensorflow/tfjs-node';
let tf;

import { GameAgent } from './agent.js';
import { copyWeights } from './dqn.js';
import {SpaceInvadersGame} from './spaceInvadersTensor.js'

class MovingAverager {
    constructor(bufferLength) {
      this.buffer = [];
      for (let i = 0; i < bufferLength; ++i) {
        this.buffer.push(null);
      }
    }
  
    append(x) {
      this.buffer.shift();
      this.buffer.push(x);
    }
  
    average() {
      return this.buffer.reduce((x, prev) => x + prev) / this.buffer.length;
    }
  }

export async function train(
    agent, batchSize, gamma, learningRate, cumulativeRewardThreshold,
    maxNumFrames, syncEveryFrames, savePath, logDir) {
    let summaryWriter;
    if (logDir != null) {
        summaryWriter = tf.node.summaryFileWriter(logDir);
    }

    for (let i = 0; i < agent.replayBufferSize; ++i) {
        agent.playStep()
    }

    const rewardAverager100 = new MovingAverager(100);
    const pointsAverager100 = new MovingAverager(100);

    const optimizer = tf.train.adam(learningRate);
    let tPrev = new Date().getTime();
    let frameCountPrev = agent.frameCount;
    let averageReward100Best = -Infinity;
    while (true) {
        agent.trainOnReplayBatch(batchSize, gamma, optimizer);
        const {cumulativeReward, done, pointsEarned} = agent.playStep();
        if (done) {
          const t = new Date().getTime();
          const framesPerSecond =
              (agent.frameCount - frameCountPrev) / (t - tPrev) * 1e3;
          tPrev = t;
          frameCountPrev = agent.frameCount;
    
          rewardAverager100.append(cumulativeReward);
          pointsAverager100.append(pointsEarned);
          const averageReward100 = rewardAverager100.average();
          const averagePoints100 = pointsAverager100.average();
    
          console.log(
              `Frame #${agent.frameCount}: ` +
              `cumulativeReward100=${averageReward100.toFixed(2)}; ` +
              `points100=${averagePoints100.toFixed(2)} ` +
              `(epsilon=${agent.epsilon.toFixed(3)}) ` +
              `(${framesPerSecond.toFixed(1)} frames/s)` + 
              `cumulativeReward=${cumulativeReward}`);
          if (summaryWriter != null) {
            summaryWriter.scalar(
                'cumulativeReward100', averageReward100, agent.frameCount);
            summaryWriter.scalar('points100', averagePoints100, agent.frameCount);
            summaryWriter.scalar('epsilon', agent.epsilon, agent.frameCount);
            summaryWriter.scalar(
                'framesPerSecond', framesPerSecond, agent.frameCount);
          }
          if (averageReward100 >= cumulativeRewardThreshold ||
              agent.frameCount >= maxNumFrames) {
            break;
          }
          if (averageReward100 > averageReward100Best) {
            averageReward100Best = averageReward100;
            if (savePath != null) {
              if (!fs.existsSync(savePath)) {
                shelljs.mkdir('-p', savePath);
              }
              await agent.onlineNetwork.save(`file://${savePath}`);
              console.log(`Saved DQN to ${savePath}`);
            }
          }
        }
        if (agent.frameCount % syncEveryFrames === 0) {
          copyWeights(agent.targetNetwork, agent.onlineNetwork);
          console.log('Sync\'ed weights from online network to target network');
        }
      }
}

export function parseArguments() {
    const parser = new argparse.ArgumentParser({
      description: 'Training script for a DQN that plays Space Invaders'
    });
    parser.addArgument('--gpu', {
      action: 'storeTrue',
      help: 'Whether to use tfjs-node-gpu for training ' +
      '(requires CUDA GPU, drivers, and libraries).'
    });
    parser.addArgument('--maxNumFrames', {
      type: 'float',
      defaultValue: 1e6,
      help: 'Maximum number of frames to run durnig the training. ' +
      'Training ends immediately when this frame count is reached.'
    });
    parser.addArgument('--replayBufferSize', {
      type: 'int',
      defaultValue: 1e4,
      help: 'Length of the replay memory buffer.'
    });
    parser.addArgument('--epsilonInit', {
      type: 'float',
      defaultValue: 0.5,
      help: 'Initial value of epsilon, used for the epsilon-greedy algorithm.'
    });
    parser.addArgument('--epsilonFinal', {
      type: 'float',
      defaultValue: 0.01,
      help: 'Final value of epsilon, used for the epsilon-greedy algorithm.'
    });
    parser.addArgument('--epsilonDecayFrames', {
      type: 'int',
      defaultValue: 1e5,
      help: 'Number of frames of game over which the value of epsilon ' +
      'decays from epsilonInit to epsilonFinal'
    });
    parser.addArgument('--batchSize', {
      type: 'int',
      defaultValue: 64,
      help: 'Batch size for DQN training.'
    });
    parser.addArgument('--gamma', {
      type: 'float',
      defaultValue: 0.99,
      help: 'Reward discount rate.'
    });
    parser.addArgument('--learningRate', {
      type: 'float',
      defaultValue: 1e-3,
      help: 'Learning rate for DQN training.'
    });
    parser.addArgument('--syncEveryFrames', {
      type: 'int',
      defaultValue: 1e3,
      help: 'Frequency at which weights are sync\'ed from the online network ' +
      'to the target network.'
    });
    parser.addArgument('--savePath', {
      type: 'string',
      defaultValue: './models/dqn',
      help: 'File path to which the online DQN will be saved after training.'
    });
    parser.addArgument('--logDir', {
      type: 'string',
      defaultValue: null,
      help: 'Path to the directory for writing TensorBoard logs in.'
    });
    return parser.parseArgs();
}

async function main() {
    const args = parseArguments();
    if (args.gpu) {
        tf = tfGpu;
    } else {
        tf = tfNonGpu;
    }
    console.log(`args: ${JSON.stringify(args, null, 2)}`);
    
    const game = new SpaceInvadersGame();
    const agent = new GameAgent(game, {
        replayBufferSize: args.replayBufferSize,
        epsilonInit: args.epsilonInit,
        epsilonFinal: args.epsilonFinal,
        epsilonDecayFrames: args.epsilonDecayFrames,
        learningRate: args.learningRate
    });

    await train(
        agent, args.batchSize, args.gamma, args.learningRate,
        args.cumulativeRewardThreshold, args.maxNumFrames,
        args.syncEveryFrames, args.savePath, args.logDir); 
}

main();