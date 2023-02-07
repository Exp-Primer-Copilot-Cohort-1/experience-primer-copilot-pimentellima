
/**
 * @name promiseErrorHandler<T>
 * @typedef {any | null} MyTupleIndex0
 * @typedef {any | null} MyTupleIndex1
 * @typedef {[MyTupleIndex0, MyTupleIndex1]} MyTuple
 * @param {Promise<T>} promise
 * @returns {Promise<MyTuple>}
 */
async function promiseErrorHandler(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

module.exports = promiseErrorHandler;
