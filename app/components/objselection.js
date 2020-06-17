import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as Speech from 'expo-speech';

let customFonts  = {
    'Avenir': require('../assets/fonts/Avenir.ttf'),
  };
  
export default class Objselection extends React.Component  {
    state = {
      fontsLoaded: false,
    };
  
    async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
    }
  
    componentDidMount() {
      this._loadFontsAsync();
      var thingToSay = 'Tap the screen to shop fresh produce. If you are looking for other products, press the screen for a few seconds.';
      Speech.speak(thingToSay);
    }
  
    render(){
        if (this.state.fontsLoaded) {
        return (
        <View style={styles.container}>
          <Image source={require('../assets/images/fresh.png')} style={styles.alone}></Image>
          <Text style={styles.h1} onPress={() => this.props.navigation.navigate('Objid')}> PRODUCE</Text>
          <Image source={require('../assets/images/others.png')} style={styles.assist}></Image>
          <Text style={styles.h2} onLongPress={() => this.props.navigation.navigate('Objid')}> OTHERS</Text>
         
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
        },
        alone:{
          height:'80%',
          width:'80%',
          alignSelf:'center',
          position:'absolute',
          resizeMode:'contain',
          top:'-15%',
        },
        assist:{
            height:'80%',
            width:'80%',
            alignSelf:'center',
            position:'absolute',
            resizeMode:'contain',
            top:'35%',
          },
          h1:{
              fontSize:100,
              fontFamily:'Avenir',
              position:'absolute',
              zIndex:2,
              top:'5%',
              left:'12%',
              color:'transparent',
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