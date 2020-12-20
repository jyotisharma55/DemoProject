import React, { Component } from 'react'
import { Text, View, ImageBackground, FlatList, Image,TouchableOpacity } from 'react-native'
import { GetEmployeeList } from '../actions/DashboardListActions'
import { connect } from 'react-redux';
import { DrawerActions } from 'react-navigation-drawer';
export class Dashboard extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            headerTitle:  (
                <View
                    style={styles.center_layout}
                 >
                    <Text style={styles.center_text}>SWAPI</Text>
        </View>
            )
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
            headerLeft: (
                <TouchableOpacity
                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <View
                        style={{
                            marginRight: 13,
                            paddingTop: 10,
                            paddingRight: 10,
                            paddingLeft: 15,
                            paddingBottom: 10,
                        }}>
                        {/* <IOSIcon name="md-menu" size={30} color={'#fff'} /> */}
                        <Image
                            source={require('../Assets/menu.png')}
                            style={{
                                height:  30,
                                width: 30,
                            }}
                        />
                    </View>
                </TouchableOpacity>
            ),
         
        };
    };


    componentDidMount() {

        this.props.GetEmployeeList()

    }
    // RenderItem of flatlist
    renderItem = ({ item, index }) => {
        console.log("item", item)
        return (
            <TouchableOpacity
                onPress={() => {
                    
                    this.props.navigation.navigate("PeopleDetails", {
                        item:item
                    })
                }}
                style={styles.renderItemViewStyle}>
                {/* View for Showing Bell icon*/}
                <View style={styles.circleViewStyle}>
                    <Image
                        source={require('../Assets/dummyboy.png')}
                        style={{
                            height: 40,
                            width: 40
                            
                        }}
                    />
                </View>

                {/* View for Showing Text*/}
                <View style={styles.renderItemTextViewStyle}>

                    <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>Name :-  {item.name}</Text>
                </View>

            </TouchableOpacity>
        );
    };


    render() {
        return (
            <ImageBackground
                source={require('../Assets/Iphone-wallpaper-minimalist-142.jpg')}
                style={styles.containerStyle}
                resizeMode='cover'

            >
                <FlatList
                    style={{ marginBottom: 10, flex: 1 }}
                    data={this.props.EList}
                    renderItem={this.renderItem}
                    bounces={false}
                    keyExtractor={item => item.name}
                />

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
        padding: 10,
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
        padding: 10,
        borderBottomColor: 'rgba(9,9,9,.2)',
        borderBottomWidth: 1.5,
        width: '78%',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000'
      
    },
    textStyle: {
        fontSize: 15,
        padding: 2,
    },
    renderItemTextViewStyle: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: '5%',
        marginRight: '5%',
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
        padding:10,
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

export default connect(
    mapStateToProps,
    {
        GetEmployeeList
    },
)(Dashboard);

