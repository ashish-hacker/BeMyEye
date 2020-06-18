import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, Dimensions, KeyboardAvoidingView } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

let customFonts  = {
    'Avenir': require('../assets/fonts/Avenir.ttf'),
    'Futura': require('../assets/fonts/futura.ttf'),
  };
  var loc= null;
  var timest = null;
export default class Volunteer extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            fontsLoaded: false,
            name: '',
            phone: '',
            hasLocationPermissions: false,
            locationResult: null,
          };
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }
    
      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      };
  
      _getLocationAsync = async () => {
          let { status } = await Permissions.askAsync(Permissions.LOCATION);
          if (status !== 'granted') {
            this.setState({
              locationResult: 'Permission to access location was denied',
            });
          } else {
            this.setState({ hasLocationPermissions: true });
          }
       
          let location = await Location.getCurrentPositionAsync({});
          this.setState({ locationResult: JSON.stringify(location) });
          const {coords: {latitude}} = location;
          const {coords: {longitude}} = location;
          const {timestamp} = location;
          loc={latitude: parseFloat(latitude),longitude: parseFloat(longitude)};
          timest = timestamp ;   
          console.log(timest, timestamp);
      };
  

    componentDidMount() {
      this._loadFontsAsync();
      this._getLocationAsync();
    }


        volunteer= async () =>{
                fetch('http://feed02313b0c.ngrok.io/addvolunteer', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "name": this.state.name,
                        "phone" : this.state.phone,
                        "timestamp": timest,
                        "loc":loc
                    })
            })
                .then((response) => response.json())
                .then((responseJson) => {
            console.log(responseJson);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
  
    render(){
        
        if (this.state.fontsLoaded) {
            
        return (
        <View style={styles.container}>
         <Image source={require('../assets/images/logo.png')} style={styles.logo}></Image>
        <TextInput style={styles.h1} placeholder = "Name   " value={this.state.name} onChangeText={(val) => this.updateInputVal(val, 'name')}></TextInput>
        <TextInput style={styles.h1} placeholder = "Phone No.   " value={this.state.phone} onChangeText={(val) => this.updateInputVal(val, 'phone')}></TextInput>
          <Text style={styles.btn} onPress={() => this.volunteer()}>VOLUNTEER</Text>
        </View>
        );
        }
        else {
        return <AppLoading />;
        }
      }
    }

    const styles = StyleSheet.create({
        container: {
        position:'absolute',
        height:Dimensions.get("window").height,
        width:'100%',
        backgroundColor: '#011936',

        },
        h1:{
            fontSize:35,
            fontFamily:'Avenir',
            position:'relative',
            top:'40%',
            alignSelf:'center',
            color:'#c2eabd',
        },
        logo:{
            height:'20%',
            width:'70%',
            resizeMode:'contain',
            zIndex:1,
            position:'absolute',
            alignSelf:'center',
            top:'5%',
          },
        btn:{
            fontSize:30,
            fontFamily:'Futura',
            zIndex:4,
            position:'absolute',
            top:'70%',
            alignSelf:'center',
            marginBottom:5,
            backgroundColor:'#c2eabd',
            borderRadius:30,
            paddingHorizontal:20,
            paddingVertical:10,
            color:'#011936',
        },
        
        
      });