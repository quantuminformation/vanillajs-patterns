window.appStore = (() => {
  let state = {
    sharedCount: 0,
    currentUser: null,
  };

  return {
    getCount: () => state.sharedCount,
    setCount: (updateFunction) => {
      const newState = updateFunction(state.sharedCount);
      state.sharedCount = newState;
      document.dispatchEvent(
        new CustomEvent(window.STORE_COUNT_UPDATED, {
          detail: state.sharedCount,
        })
      );
    },
    getCurrentUser: () => state.currentUser,

    setCurrentUser: (updateFunction) => {
      const newState = updateFunction(state.currentUser);
      state.currentUser = newState;
      document.dispatchEvent(
        new CustomEvent(window.STORE_CURRENT_USER_UPDATED, {
          detail: state.sharedCount,
        })
      );
    },
  };
})();
