export const store = (() => {
  let state = {
    sharedCount: 0,
    currentUser: null,
  };

  // users can still mutate the store with get<X> methods, but events won't be fired - so best practice only use set<X> methods to mutate
  return {
    getCount: () => state.sharedCount,
    setCount: (updateFunction) => {
      const newState = updateFunction(state.sharedCount);
      state.sharedCount = newState;
      document.dispatchEvent(
        new CustomEvent(STORE_COUNT_UPDATED, {
          detail: state.sharedCount,
        })
      );
    },
    getCurrentUser: () => state.currentUser,

    setCurrentUser: (updateFunction) => {
      const newState = updateFunction(state.currentUser);
      state.currentUser = newState;
      document.dispatchEvent(
        new CustomEvent(STORE_CURRENT_USER_UPDATED, {
          detail: state.sharedCount,
        })
      );
    },
  };
})();
 export const STORE_COUNT_UPDATED = "STORE_COUNT_UPDATED"
 export const STORE_CURRENT_USER_UPDATED = "STORE_CURRENT_USER_UPDATED"