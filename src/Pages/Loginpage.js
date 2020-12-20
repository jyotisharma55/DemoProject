import React, { Component } from 'react'
import { Text, View, ImageBackground, TextInput, TouchableOpacity, Alert} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';
import auth from "@react-native-firebase/auth"
import firebase from '@react-native-firebase/auth'
export class Loginpage extends Component {

    state = {
        username: '',
        password: '',
        btnDisable: false,
        authenticated:false
    };
    static navigationOptions = ({ navigation }) => {
        //School Name
        // Carmel Convent SenioR Secondary School
        const { params } = navigation.state;

        return {
            headerTitle: "Login"
       ,
           
            headerStyle: {
                backgroundColor: 'rgba(13, 24, 49, .9)',
                borderBottomWidth: 0,
                shadowOpacity: 0,
                elevation: 0,
            },
            headerTitleStyle: {
           textAlign: "center",
                textTransform: 'uppercase',
                letterSpacing: 2,
                fontSize: 18,
            },
            headerTintColor: '#fff',
        };
    };

    doSingIn = async (email, password) => {
        try {
            let response = await auth().signInWithEmailAndPassword(email, password)
            if (response && response.user) {
                Alert.alert("Success ✅", "Authenticated successfully")
                this.props.navigation.navigate("Dashboard");  
            }
        } catch (e) {
            console.error(e.message)
        }
    }

    doCreateUser = async (email, password) => {
        try {
            let response = await auth().createUserWithEmailAndPassword(email, password);
            if (response) {
                this.props.navigation.navigate("Dashboard");  
                console.log(tag, "?", response)
            }
        } catch (e) {
            console.error(e.message);
        }
    }


   

    componentDidMount() {
     
      this.emptyCheck()

    }

    render() {
        return (
            <ImageBackground
                source={require('../Assets/Iphone-wallpaper-minimalist-142.jpg')}
                style={style.containerStyle}
                resizeMode='cover'
                
            >
                <View
                    style={[
                        style.viewStyle,
                        {
                            marginBottom:'5%',
                        },
                    ]}>
                    <Text style={style.labelTextStyle}>Username</Text>
                    <TextInput
                        ref={input => {
                            this.usernameTextInput = input;
                        }}
                        style={style.textInputStyle}
                        onChangeText={text =>
                            this.setState({ username: text }, function () {
                                this.emptyCheck()
                            })
                        }
                        returnKeyType="next"
                        onEndEditing={() => {
                            this.passwordTextInput.focus();
                        }}
                        value={this.state.username}
                    />
                </View>
                <View
                    style={[
                        style.viewStyle,
                        {
                            marginBottom:'5%',
                        },
                    ]}>
                    <Text style={style.labelTextStyle}>Password</Text>
                    <TextInput
                        ref={input => {
                            this.passwordTextInput = input;
                        }}
                        style={style.textInputStyle}
                        onChangeText={text =>
                            this.setState({ password: text }, function () {
                                this.emptyCheck()
                            })
                        }
                        value={this.state.password}
                        secureTextEntry={true}
                        returnKeyType="done"
                    />
                </View>
                <TouchableOpacity
                    style={[
                        style.touchableOpacityStyle,
                        {
                            backgroundColor: this.state.btnDisable
                                ? '#999'
                                : '#0097e8',
                        },
                    ]}
                    onPress={() => {
              
                        if (this.state.btnDisable == false) {
                            
                            this.doSingIn(this.state.username,this.state.password)
                                
                           
                          
                        }
                        //For Navigating to Home page
                    }}>
                    
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.loginButtonStyle}>LOGIN</Text>
                            <View style={{ justifyContent: 'center' }}>
                                <Icons
                                name="arrow-right"
                                    style={{
                                        color: '#fff',
                                        
                                    }}
                                    size={20}
                                />
                            </View>
                        </View>
                    
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.doCreateUser(this.state.username, this.state.password)
                }}>
                    <Text style={style.labelTextStyle}>Sign Up</Text>
                </TouchableOpacity>
               
            </ImageBackground>
        )
    }

    emptyCheck = () => {

        this.setState({ btnDisable: false });
        if (this.state.username === '' || this.state.password === '') {
            this.setState({ btnDisable: true });
        }
    }
}
const style = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
     
    },
    labelTextStyle: {
        fontSize: 18,
        color: '#000',
        marginBottom: 8,
     
    },
    textInputStyle: {
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#fff',
        color: 'black',
        padding: 8,
        borderRadius: 5,
        fontSize: 18,
       
    },
    viewStyle: {
        marginBottom: '5%',
        width: '90%',
    },
    touchableOpacityStyle: {
        borderRadius: 5,
        marginTop: '5%',
        backgroundColor: '#52b6ec',
        flexDirection: 'row',
        height: '10%',
        width: '90%',
        alignItems: 'center',
        alignContent: 'center',
    },
    loginButtonStyle: {
        fontSize: 18,
        color: '#fff',
        width: '90%',
        paddingLeft: 10,
    }
 }

export default Loginpage
