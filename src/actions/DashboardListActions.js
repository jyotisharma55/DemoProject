

export const GetEmployeeList = () => {
    const customData = require('../customData.json');
    console.log("customData", customData)
    return (dispatch, getState) => {

        dispatch({
            type: "List",
            payload: customData
        })

    };
};