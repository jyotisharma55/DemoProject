import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/Pages/Loginpage'
import Dashboard from './src/Pages/Dashboard'
import { createAppContainer } from 'react-navigation';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from './src/reducers'
const StackNav = createAppContainer(createStackNavigator(
  {
    //main dashboard screen
    Login: Login,
    Dashboard: Dashboard,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;

      return {
        
        headerTitle: routeName,
        headerBackTitle: null,
        headerStyle: {
          backgroundColor: 'rgba(13, 24, 49, .9)',
          shadowOpacity: 0,
          elevation: 0,
          borderBottomWidth: 0
        },
        headerTitleStyle: {
     
          textTransform: 'uppercase',
          letterSpacing: 2,
          fontSize: 18
        },
        headerTintColor: "#fff"

      };
      
    },
    initialRouteName: 'Login',
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: 'screen',
    headerTitleAlign: "center"
  },
));
export default App = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
    <StackNav/>
    </Provider>
  )
}
