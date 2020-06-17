import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as Speech from 'expo-speech';


let customFonts  = {
    'Avenir': require('../assets/fonts/Avenir.ttf'),
    
  };
  
export default class Welcome extends React.Component  {
    state = {
      fontsLoaded: false,
    };
  
    async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
    }
  
    componentDidMount() {
      this._loadFontsAsync();
      var thingToSay = 'Welcome to Be My Eyes! Shop along with me or find a human assistant nearby. Please tap the screen to continue';
      Speech.speak(thingToSay);
    }

    
    
    render(){

   
        if (this.state.fontsLoaded) {
        return (
          
        <View style={styles.container}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo}></Image>
          <Text style={styles.welcome} onPress={() => this.props.navigation.navigate('Select')}>Welcome!{"\n"}¡Bienvenido</Text>
          <Image source={require('../assets/images/home.png')} style={styles.footer}></Image>
         
        
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
        logo:{
          height:'25%',
          width:'75%',
          resizeMode:'contain',
          zIndex:1,
          position:'absolute',
          alignSelf:'center',
          top:'5%',
        },
        welcome: {
            fontFamily:'Avenir',
            fontSize:40,
            position:'absolute',
            alignSelf:'center',
            top:'40%',
            zIndex:2,
            color:'#c2eabd',
        },
        footer:{
          height:'110%',
          width:'120%',
          alignSelf:'center',
          position:'absolute',
          bottom:'-40%',
          resizeMode:'contain',
        }
      });