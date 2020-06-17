import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as Speech from 'expo-speech';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

let customFonts  = {
    'Avenir': require('../assets/fonts/Avenir.ttf'),
    'Futura': require('../assets/fonts/futura.ttf')
  };
var currentPlace = null;
export default class FindAssist extends React.Component  {
    state = {
        fontsLoaded: false,
        hasLocationPermissions: false,
        locationResult: null,
        placeResult: null,
        sayLocation: null,
        duration: null,
    };

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
        var loc={latitude: parseFloat(latitude),longitude: parseFloat(longitude)}
        var place = await Location.reverseGeocodeAsync(loc);
        var cplace = place[0];
        this.setState({ placeResult: JSON.stringify(cplace) });
        console.log('Place2'+this.state.placeResult);
        this.setState({sayLocation :'You are currently at '+cplace.name});
        console.log(this.state.sayLocation);
        currentPlace=this.state.sayLocation;
      
    };

    whereAmI(){
      Speech.speak(currentPlace);
    }

  
    componentDidMount() {
      this._loadFontsAsync();
      this._getLocationAsync();
      this._getLocationAsync();
      Speech.speak('How long do you plan to shop? Please provide your response in terms of minutes.');
    }
  
    render(){
        if (this.state.fontsLoaded) {
        return (
        <View style={styles.container}>
          <Image source={require('../assets/images/findassist.png')} style={styles.alone}></Image>
          <TextInput style={styles.h1} value={this.state.duration} onChangeText={(val) => this.updateInputVal(val, 'duration')}></TextInput>
          <Image source={require('../assets/images/camerabtn.png')} style={styles.btn}></Image>
          <Text style={styles.h2} onPress={this.whereAmI}> ASSISTANT</Text>
         
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
          height:'100%',
          position:'relative',
          backgroundColor: '#011936',
          minHeight:Math.round(Dimensions.get('window').height),
        },
        alone:{
          height:'80%',
          width:'80%',
          alignSelf:'center',
          position:'absolute',
          resizeMode:'contain',
          top:'-15%',
        },
        btn:{
            height:'25%',
            width:'25%',
            alignSelf:'center',
            position:'absolute',
            resizeMode:'contain',
            bottom:'10%',
          },
          h1:{
              fontSize:80,
              fontFamily:'Avenir',
              position:'absolute',
              zIndex:5,
              bottom:'40%',
              color:'#c2eabd',
              backgroundColor:'#011936',
              width:'50%',
              alignSelf:'center',
          },
          h2:{
            fontSize:100,
            fontFamily:'Avenir',
            position:'absolute',
            zIndex:4,
            top:'63%',
            left:'12%',
            color:'transparent',
        },

        
      });