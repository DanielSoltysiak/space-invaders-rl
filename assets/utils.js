export function getRandomInteger(min, max) {
    return Math.floor((max - min) * Math.random()) + min;
}

export function assertPositiveInteger(x, name) {
    if (!Number.isInteger(x)) {
      throw new Error(
          `Expected ${name} to be an integer, but received ${x}`);
    }
    if (!(x > 0)) {
      throw new Error(
          `Expected ${name} to be a positive number, but received ${x}`);
    }
  }