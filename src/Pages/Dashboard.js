import React, { Component } from 'react'
import { Text, View, ImageBackground, FlatList, Image } from 'react-native'
import { GetEmployeeList } from '../actions/DashboardListActions'
import { connect } from 'react-redux';
export class Dashboard extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            headerTitle: "Dashboard"
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
            headerRight: (<View></View>)
        };
    };


    componentDidMount() {

        this.props.GetEmployeeList()

    }
    // RenderItem of flatlist
    renderItem = ({ item, index }) => {
        console.log("item", item)
        return (
            <View

                style={styles.renderItemViewStyle}>
                {/* View for Showing Bell icon*/}
                <View style={styles.circleViewStyle}>
                    <Image
                        source={require('../Assets/dummyboy.png')}
                        style={{
                            height: 40,
                            width: 40,
                        }}
                    />
                </View>

                {/* View for Showing Text*/}
                <View style={styles.renderItemTextViewStyle}>

                    <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>Name :-  {item.name}</Text>
                    <Text style={[styles.textStyle, { fontWeight: '500' }]}>Age :-  {item.age}  Gender :-  {item.gender}</Text>
                    <Text style={[styles.textStyle, { fontWeight: '500' }]}>Email :-  {item.email}</Text>
                    <Text style={[styles.textStyle, { fontWeight: '500' }]}>PhoneNo :-  {item.phoneNo}</Text>
                </View>

            </View>
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
                    keyExtractor={item => item.id.toString()}
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
        padding: 20,
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
        width: '90%',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginBottom: 10,
      
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

