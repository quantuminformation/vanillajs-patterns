/*window.eventListenLog = function (event, currentTarget) {
    const targetName = event.target.getAttribute("data-component");
    const currentTargetName = currentTarget.getAttribute("data-component");
    const detailPart =
        event.detail === null ? "" : `, Data: ${JSON.stringify(event.detail)}`;
    console.log(
        `Received ${event.type} From Component: ${targetName}, To Component: ${currentTargetName}${detailPart}`
    );
};*/

window.STORE_COUNT_UPDATED = "SHARED_STATE_COUNT_UPDATED";
window.STORE_CURRENT_USER_UPDATED = "STORE_CURRENT_USER_UPDATED";


