import * as tf from '@tensorflow/tfjs';

export function createDeepQNetwork(h, w, numActions) {
    if (!(Number.isInteger(h) && h > 0)) {
      throw new Error(`Expected height to be a positive integer, but got ${h}`);
    }
    if (!(Number.isInteger(w) && w > 0)) {
      throw new Error(`Expected width to be a positive integer, but got ${w}`);
    }
    if (!(Number.isInteger(numActions) && numActions > 1)) {
      throw new Error(
          `Expected numActions to be a integer greater than 1, ` +
          `but got ${numActions}`);
    }

    const model = tf.sequential();
    model.add(tf.layers.conv2d({
        filters: 32,
        kernelSize: 3,
        strides: 1,
        activation: 'relu',
        inputShape: [h, w, 3]
    }))
    model.add(tf.layers.batchNormalization());
    model.add(tf.layers.conv2d({
        filters: 64,
        kernelSize: 3,
        strides: 1,
        activation: 'relu',
    }))
    model.add(tf.layers.batchNormalization());
    model.add(tf.layers.conv2d({
        filters: 128,
        kernelSize: 3,
        activation: 'relu',
    }))
    model.add(tf.layers.batchNormalization());
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({units: 512, activation: 'relu'}))
    model.add(tf.layers.dense({units: 256, activation: 'relu'}))
    model.add(tf.layers.dense({units: numActions, activation: 'linear'}))

    return model;
  }

  export function copyWeights(destNetwork, srcNetwork) {
    let originalDestNetworkTrainable;
    if (destNetwork.trainable !== srcNetwork.trainable) {
      originalDestNetworkTrainable = destNetwork.trainable;
      destNetwork.trainable = srcNetwork.trainable;
    }
  
    destNetwork.setWeights(srcNetwork.getWeights());
  
    if (originalDestNetworkTrainable != null) {
      destNetwork.trainable = originalDestNetworkTrainable;
    }
  }