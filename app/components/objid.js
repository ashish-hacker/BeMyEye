import React from 'react';
import { Text, View, TouchableOpacity, Image,Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
import { Camera } from 'expo-camera';
import * as Speech from 'expo-speech';




var imgdata=null;
var url=null;
var cUrl=null;
var pUrl=null;

//var base64Img =null;
export default class Objid extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    image: null,
    ref: null,
    res:'',
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    var thingToSay = 'Tap the screen to identify objects around you';
    Speech.speak(thingToSay);
  }
  

  render() {
    const { hasCameraPermission } = this.state;
    const {ref} = this.state;
    let { image } = this.state;
    const takePicture = async () => {
   
            const options = {quality: 0.3, base64: true};
            imgdata = await this.camera.takePictureAsync(options);
            url=imgdata.uri;
            console.log('Image Captured');
            console.log(url);
            
            let base64Img = `data:image/jpg;base64,${imgdata.base64}`
      
            
           let cloudinary = 'https://api.cloudinary.com/v1_1/diywehkap/image/upload';
        
            let data = {
              "file": base64Img,
              "upload_preset": "hm4fkyir",
            }
            fetch(cloudinary, {
              body: JSON.stringify(data),
              headers: {
                'content-type': 'application/json'
              },
              method: 'POST',
            }).then(async r => {
              let data = await r.json()
              cUrl=data.secure_url;
              pUrl=cUrl.toString();
              console.log(pUrl);
              x=1;
              


            let objlabel= await fetch('http://feed02313b0c.ngrok.io/labelanimage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'cache-control': 'no-cache'
            },
            body: JSON.stringify({imgurl:pUrl})
          }).then(response => response.json())
          .then(data => (Speech.speak(data.results.toString()+". To read its contents, press on the screen for a few seconds.")))
          .catch(err=>console.log(err));

          }).catch(err=>console.log(err));
      
     
    };

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (

        
        <View style={{ flex: 1, backgroundColor:'#011936'}}>
          <Camera style={{ flex: 0.7 }} type={this.state.type} ref={ref => {this.camera = ref;}}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
         <Image source={require('../assets/images/camerabtn.png')} style={{position:'absolute',zIndex:3,bottom:'5%',resizeMode:'contain',height:'25%',width:'25%',alignSelf:'center'}}></Image>
          <Text style={{color:'transparent', position:'absolute',zIndex:4,bottom:100, fontFamily:'Avenir', alignSelf:'center',fontSize:100}} onPress={() => takePicture()} onLongPress={() => this.props.navigation.navigate('Cameracontents')}>C</Text>
        </View>
      );
    }
  }
}