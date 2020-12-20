import React, { Component } from 'react'
import { Text, View, ImageBackground, FlatList, Image, TouchableOpacity } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation';
export class FilmsPage extends Component {
    state = {filmDetail:''}
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


    componentDidMount() {
        this.getFilmsData()


    }

    getFilmsData() {
        var filmsUrl = this.props.navigation.state.params.item
        console.log("filmsUrl", filmsUrl)
        fetch(filmsUrl, {
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
              this.setState({filmDetail:responseJson})
            })
            .catch(error => {

                console.log('error', error);
            });
    }
    // RenderItem of flatlist
    renderItem = ({ item, index }) => {
        console.log("item", item)
        return (
            <TouchableOpacity
                onPress={() => {

                    this.props.navigation.navigate("FilmsPage")
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
        const { filmDetail } = this.state
        console.log("item....", filmDetail)
        return (
            <ImageBackground
                source={require('../Assets/Iphone-wallpaper-minimalist-142.jpg')}
                style={styles.containerStyle}
                resizeMode='cover'

            >
                <View style={{ backgroundColor: '#fff', flexDirection: 'column', width: '90%', height: '80%', padding: 20,borderWidth:1 }}>
                    <Image
                        source={require('../Assets/video.png')}
                        style={{
                            height: 80,
                            width: 80,
                            alignSelf: 'center'
                        }}
                    />

                    <Text style={[styles.textStyle, { fontWeight: 'bold', marginTop: 10 }]}>title :-  {filmDetail.title}</Text>
                    <Text style={[styles.textStyle, { fontWeight: '900' }]}>director :-  {filmDetail.director}</Text>
                    <Text style={[styles.textStyle, { fontWeight: '900' }]}>producer :-  {filmDetail.producer}</Text>
                    <Text style={[styles.textStyle, { fontWeight: '800' }]}>created :-  {filmDetail.created}</Text>
                    <Text style={[styles.textStyle, { fontWeight: '900',color:'red' }]}>release_date :-  {filmDetail.release_date}</Text>
                    
                    <Text style={[styles.textStyle, { fontWeight: '700', borderTopWidth: 1 }]}>Peoples:</Text>
                    <FlatList
                        style={{ marginBottom: 5, flex: 1 }}
                        data={filmDetail.characters}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                //                     const resetAction = StackActions.reset({
                //                         index: 0,
                //                         actions: [
                //                             NavigationActions.navigate({
                //                                 routeName: "PeopleDetails",
                //                                 params: {
                //                                      item: item,
                //                                     filmDetail: true,
                // }
                //                             }),
                //                         ],
                //                     });
                            //        this.props.navigation.dispatch(resetAction);
                                    this.props.navigation.navigate("PeopleDetails", {
                                        item: item,
                                        filmDetail:true
                                    })
                                }}>
                                    <Text style={[styles.textStyle, { fontWeight: '700' }]}>People :-  {index + 1}</Text>
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



export default FilmsPage

