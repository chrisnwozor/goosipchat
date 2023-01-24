import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Homescreen from './screens/Homescreen';
import Addchatscreen from './screens/Addchatscreen';
import Chatscreen from './screens/Chatscreen';


const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2C68ED' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
  headerTitleAlign: 'center'

}

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen name="Login" component={Loginscreen} />
          <Stack.Screen name="Register" component={Registerscreen} />
          <Stack.Screen name="Home" component={Homescreen} />
          <Stack.Screen name="Chat" component={Addchatscreen} />
          <Stack.Screen name="Text" component={Chatscreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;


