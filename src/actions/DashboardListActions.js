import { PeopleUrl} from '../Assets/Constants'

export const GetEmployeeList = () => {
    const customData = require('../customData.json');
    console.log("customData", customData)
    return (dispatch, getState) => {
        fetch('https://swapi.dev/api/people/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
          
        })
            .then(response => response.json())
            .then(async responseJson => {
                console.log(
                    'responsejson',
                    responseJson
                );
                dispatch({
                    type: "List",
                    payload: responseJson.results
                })
              
            })
            .catch(error => {
                
                console.log('error', error);
            });

       

    };
};