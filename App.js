import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/Pages/Loginpage'
import Dashboard from './src/Pages/Dashboard'
import { createAppContainer } from 'react-navigation';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from './src/reducers'
import { createDrawerNavigator } from 'react-navigation-drawer';
import FilmsPage from './src/Pages/FilmsPage'
import SideMenu from './src/SideMenu'
import PeopleDetails from './src/Pages/PeopleDetails'
import auth from '@react-native-firebase/auth';
const StackNav1 = createStackNavigator(
  {
    //main dashboard screen
    Dashboard: Dashboard,
    PeopleDetails: PeopleDetails,
    FilmsPage: FilmsPage,
   
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;

     
    },
    initialRouteName: 'Dashboard',
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: 'screen',
    headerLayoutPreset: 'center',
  },
);

export const DrawerNavigator = createDrawerNavigator(
  {
    Dashboard: StackNav1
  },
  {
    initialRouteName: 'Dashboard',
    contentComponent: SideMenu,
    useNativeAnimations: false,
    drawerWidth: Dimensions.get('window').width * 0.8,
    drawerPosition: 'left'
  },
);

const StackNav  = Type => {
  console.log('LoggedInType', Type);
  return createAppContainer(createStackNavigator(
    {
      //main dashboard screen
      Login: Login,
      Dashboard: DrawerNavigator,
    },
    {
      defaultNavigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state;

        return {
          header: null,
        };

      },
      initialRouteName: (Type == true) ? 'Dashboard' : 'Login',
      animationEnabled: false,
      swipeEnabled: false,
      headerMode: 'screen',
      headerTitleAlign: "center"
    },
  ));
};







export class App extends Component {
  state = { authenticated: false }

  componentDidMount() {
    this.onStateChanged()
  }

  onStateChanged = () => {

    auth().onAuthStateChanged((user) => {
      console.log(".........", user)
      if (user) {

        this.setState({ authenticated: true });
      } else {
        this.setState({ authenticated: false });
      }
    })



  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    const Layout = StackNav(this.state.authenticated);
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    )
  }
}

export default App

