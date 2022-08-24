import * as tf from '@tensorflow/tfjs';

export class ReplayMemory {
    constructor(maxLen) {
        this.maxLen = maxLen;
        this.buffer = [];
        for (let i = 0; i < maxLen; ++i) {
          this.buffer.push(null);
        }
        this.index = 0;
        this.length = 0;
    
        this.bufferIndices_ = [];
        for (let i = 0; i < maxLen; ++i) {
          this.bufferIndices_.push(i);
        }
    }

    append(item) {
        this.buffer[this.index] = item;
        this.length = Math.min(this.length + 1, this.maxLen);
        this.index = (this.index + 1) % this.maxLen;
    }

    sample(batchSize) {
        if (batchSize > this.maxLen) {
          throw new Error(
              `batchSize (${batchSize}) exceeds buffer length (${this.maxLen})`);
        }
        tf.util.shuffle(this.bufferIndices_);
    
        const out = [];
        for (let i = 0; i < batchSize; ++i) {
          out.push(this.buffer[this.bufferIndices_[i]]);
        }
        return out;
    }
}