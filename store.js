window.appStore = (() => {
    let state = {
        sharedCount: 0,
    };

    return {
        getState: () => state.sharedCount,
        setState: (updateFunction) => {
            const newState = updateFunction(state.sharedCount);
            state.sharedCount = newState;
            document.dispatchEvent(
                new CustomEvent(window.SHARED_STATE_COUNT_UPDATED, {
                    detail: state.sharedCount,
                })
            );
        },
    };
})();

document.addEventListener(window.INCREMENT_SHARED_STATE_COUNT, (e) => {
    window.appStore.setState((currentState) => currentState + 1);
});

document.addEventListener(window.DECREMENT_SHARED_STATE_COUNT, (e) => {
    window.appStore.setState((currentState) => currentState - 1);
});