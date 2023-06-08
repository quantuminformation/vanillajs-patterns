/*window.eventListenLog = function (event, currentTarget) {
    const targetName = event.target.getAttribute("data-component");
    const currentTargetName = currentTarget.getAttribute("data-component");
    const detailPart =
        event.detail === null ? "" : `, Data: ${JSON.stringify(event.detail)}`;
    console.log(
        `Received ${event.type} From Component: ${targetName}, To Component: ${currentTargetName}${detailPart}`
    );
};*/

window.INCREMENT_SHARED_STATE_COUNT = "INCREMENT_SHARED_STATE_COUNT";
window.DECREMENT_SHARED_STATE_COUNT = "DECREMENT_SHARED_STATE_COUNT";
window.SHARED_STATE_COUNT_UPDATED = "SHARED_STATE_COUNT_UPDATED";
//export const REQUEST_SIGN_UP = "REQUEST_SIGN_UP";

