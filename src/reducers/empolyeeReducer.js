const Initial_State = {
    empolyeeList:[]

};

export default (state = Initial_State, action) => {
    console.log("AuthReducer", action)
    switch (action.type) {
        case "List":
            return { ...state, empolyeeList: action.payload};
        

        default:
            return state;
    }
};