import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './components/welcome';
import Select from './components/select';
import Objid from './components/objid';
import Cameracontents from './components/cameracontents';
import FindAssist from './components/findassist';
import Objselection from './components/objselection';
import Produceid from './components/produceid';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
        name="Welcome" 
        component={Welcome}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="Select" 
        component={Select}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="Objselection" 
        component={Objselection}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="Produceid" 
        component={Produceid}
        options={{ headerShown: false}} 
        />
       <Stack.Screen 
        name="Objid" 
        component={Objid}
        options={{ headerShown: false}} 
        />
        <Stack.Screen 
        name="Cameracontents" 
        component={Cameracontents}
        options={{ headerShown: false}} 
        /> 
        <Stack.Screen 
        name="Findassist" 
        component={FindAssist}
        options={{ headerShown: false}} 
        /> 
      
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}