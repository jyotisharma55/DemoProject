import React, { Component } from 'react'
import { Text, View, ImageBackground, FlatList, Image, TouchableOpacity } from 'react-native'
import { GetEmployeeList } from '../actions/DashboardListActions'
import { connect } from 'react-redux';
import { DrawerActions } from 'react-navigation-drawer';
export class PeopleDetails extends Component {
    state ={peopleDetail:''}
            static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            headerTitle: "People Details",

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

    getPeopleData() {
        var peopleUrl = ''
      
        if (this.props.navigation.state.params.item != undefined && this.props.navigation.state.params.item.url != undefined ) {
            peopleUrl = this.props.navigation.state.params.item.url
        }
        if( this.props.navigation.state.params.filmDetail != undefined && this.props.navigation.state.params.filmDetail ) {
            peopleUrl = this.props.navigation.state.params.item
        }
        console.log("filmsUrl", peopleUrl)
        fetch(peopleUrl, {
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
                this.setState({ peopleDetail: responseJson })
            })
            .catch(error => {

                console.log('error', error);
            });
    }

    componentWillReceiveProps(nextprops) {
        this.getPeopleData()
    }
    componentDidMount() {

        this.getPeopleData()

    }
   


    render() {
        const { peopleDetail } = this.state
        console.log("item....", peopleDetail)
        return (
            <ImageBackground
                source={require('../Assets/Iphone-wallpaper-minimalist-142.jpg')}
                style={styles.containerStyle}
                resizeMode='cover'

            >
             <View style={{backgroundColor:'#fff',flexDirection:'column',width:'90%',height:'80%',padding:20,borderWidth:1}}>
                    <Image
                        source={require('../Assets/dummyboy.png')}
                        style={{
                            height: 80,
                            width: 80,
                            alignSelf: 'center'
                        }}
                    />

                    <Text style={[styles.textStyle, { fontWeight: 'bold', marginTop: 10 }]}>Name :-  {peopleDetail.name}</Text>
                    <Text style={[styles.textStyle, { fontWeight: '900' }]}>birth_year :-  {peopleDetail.birth_year}</Text>
                    <Text style={[styles.textStyle, { fontWeight: '800' }]}>gender :-  {peopleDetail.gender}</Text>
                    <Text style={[styles.textStyle, { fontWeight: '900' }]}>height :-  {peopleDetail.height}</Text>
                    <Text style={[styles.textStyle, { fontWeight: '900' }]}>mass :-  {peopleDetail.mass}</Text>
                    <Text style={[styles.textStyle, { fontWeight: '900', marginBottom: 10 }]}>hair_color :-  {peopleDetail.hair_color}</Text>
                    <Text style={[styles.textStyle, { fontWeight: '700', borderTopWidth: 1 }]}>Films:</Text>
                <FlatList
                    style={{ marginBottom: 5, flex: 1 }}
                        data={peopleDetail.films}
                    renderItem={({item,index}) => {
                        return (
                        <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate("FilmsPage", {
                                item: item
                        })
                            }}>
                                <Text style={[styles.textStyle, { fontWeight: '700' }]}>film :-  {index+1}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    bounces={false}
                    keyExtractor={item => item.name}
                />
                </View>
            </ImageBackground>
        )
    }
}


const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    
     
    },
    overlay: {
        position: 'absolute',
        top: '2%',
        right: '5%',
        bottom: '2%',
        left: '5%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 0,
        borderRadius: 10,
    },
    renderItemViewStyle: {
        flexDirection: 'row',
        padding: 15,
        borderBottomColor: 'rgba(9,9,9,.2)',
        borderBottomWidth: 1.5,
        width: '79%',
        backgroundColor: '#fff',
    
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000'

    },
    textStyle: {
        fontSize: 15,
        padding: 2,
    },
   
    circleViewStyle: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 60,
        borderRadius: 30,

    },
    center_layout: {
        marginTop: 1,
        backgroundColor: 'black',
        height: 40,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    center_text: {

        textAlign: 'center',
        color: 'yellow',
        fontSize: 15,
    }

};

function mapStateToProps(state) {
    console.log(state.employeeReducer.empolyeeList)
    return {
        EList: state.employeeReducer.empolyeeList,
    };
}

export default PeopleDetails

