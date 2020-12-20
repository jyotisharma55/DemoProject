import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation';
import auth from '@react-native-firebase/auth';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
 
} from 'react-native';



export const { height, width } = Dimensions.get('window');
const extractKey = ({ id }) => id.toString()
//const {height, width} = Dimensions.get('window');
const sideMenuWidth = width * 0.8
const flatListMargin = 8
const textItemWidth = sideMenuWidth - (flatListMargin * 2);



const sideMenuListData = [
    { id: 0, text: 'People', icon: 'person' },  //ios-barcode, md-barcode    //ios-microphone, md-microphone
    { id: 1, text: 'Flims', icon: 'ios-film' },
    { id: 2, text: 'Sign out', icon: 'ios-film' }
]
class SideMenu extends Component {

    renderItem = ({ item, index }) => {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                width: textItemWidth
            }}>
                <TouchableOpacity
                    underlayColor="green"
                    onPress={() => {
                        if (item.id == 0) {
                        
                            this.props.navigation.navigate("Dashboard", {
                                
                            });
                        } else if (item.id == 1) {
                           // this.props.navigation.navigate("FilmsPage");
                        
                        } else if (item.id == 2) {
                            auth()
                                .signOut()
                                .then(() => console.log('User signed out!'));
                        }

                    }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        width: textItemWidth,
                        margin: 6,
                    }}>
                        <View style={{ width: 30 }}>
                          
                                <Ionicons
                                    name={item.icon}
                                    size={24}
                                    color='black' />
                        </View>

                        <View>
                            <Text style={{
                                marginLeft: 10,
                                flex: 1,
                                fontSize: 18,
                                alignSelf: 'center',
                                color: 'black',
                            }}>
                                {item.text} {extractKey}
                            </Text>
                        </View>

                    </View>
                </TouchableOpacity>
                <View style={{
                    height: 0.7,
                    backgroundColor: 'lightgray',
                    width: textItemWidth * 0.85,
                    alignSelf: 'flex-end',
                    margin: 4,
                    narginRight: -24,
                }} />
            </View>
        )
    }

    _navigateToScreen(route) {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

  

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.center_layout}>
                    <Text style={styles.center_text}>SWAPI</Text>
                </View>
                <FlatList
                    style={{ margin: 8, width: sideMenuWidth }}
                    data={ sideMenuListData}
                    renderItem={this.renderItem}
                    keyExtractor={extractKey}
                    bounces={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: sideMenuWidth,
        height: sideMenuWidth,
    },
    center_layout: {
        marginTop: 1,
        backgroundColor: 'black',
        height: 100,
        alignItems: 'center',
        justifyContent:'center'
    },
    center_text: {
    
        textAlign: 'center',
        color: 'yellow',
        fontSize: 35,
    },
    center_button: {
        paddingLeft: 6,
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    }
});

SideMenu.propTypes = {
    navigation: PropTypes.object
};



export default SideMenu;