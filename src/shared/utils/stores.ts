import pick from 'lodash/pick'
import { useShallow } from 'zustand/react/shallow'

/**
 * A utility function that picks specified keys from the store and uses shallow comparison.
 *
 * @template T - The type of the store's state.
 * @template K - The keys of the store's state to pick.
 * @param {...(K | K[])[]} keys - The keys to pick from the store.
 * @returns {Pick<T, K>} The picked properties from the store.
 */
export const shallowPick = <T, K extends keyof T>(...keys: (K | K[])[]): ((state: T) => Pick<T, K>) => {
  const flatKeys = keys.flat() as K[]

  return useShallow((store: T) => pick(store, flatKeys) as Pick<T, K>)
}
