/**
 * Pauses the execution for a specified number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise<void>} A promise that resolves after the specified time.
 */
export const sleep = async (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))
