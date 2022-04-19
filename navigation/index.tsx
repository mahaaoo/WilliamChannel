/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';

import JuiceCards from '../screens/youtube/JuiceCards';
import Tab from '../screens/youtube/Tab';
import RevolutChart from '../screens/youtube/RevolutChart';
import AudioPlayer from '../screens/youtube/AudioPlayer';
import Meditation from '../screens/youtube/Meditation';
import Freeletics from '../screens/youtube/Freeletics';
import Instagram from '../screens/youtube/Instagram';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={"YouTube"}
    >
      <Stack.Screen name="YouTube" component={TabOneScreen} options={() => ({
        title: 'William\'s Channel',
      })} />
      <Stack.Screen name="JuiceCards" component={JuiceCards} />
      <Stack.Screen name="Tab" component={Tab} />
      <Stack.Screen name="RevolutChart" component={RevolutChart} />
      <Stack.Screen name="AudioPlayer" component={AudioPlayer} />
      <Stack.Screen name="Meditation" component={Meditation} />
      <Stack.Screen name="Freeletics" component={Freeletics} />
      <Stack.Screen name="Instagram" component={Instagram} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
