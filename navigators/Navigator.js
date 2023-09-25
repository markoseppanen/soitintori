import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { Categories } from '../views/Categories';
import { AddListing } from '../views/AddListing';
import { Profile } from '../views/Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Categories"
      component={Categories}
    />
    <Tab.Screen
      name="Add Listing"
      component={AddListing}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
    />
  </Tab.Navigator>
);

const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};
