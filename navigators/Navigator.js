import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Categories } from "../views/Categories";
import { AddListing } from "../views/AddListing";
import { Profile } from "../views/Profile";
import Login from "../views/Login";
import { Icon } from "@rneui/themed";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  const { isLoggedIn } = useContext(MainContext);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="Add Listing" component={AddListing} />
      {isLoggedIn ? (
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => <Icon name="person" color={color} />,
          }}
        />
      ) : (
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarIcon: ({ color }) => <Icon name="person" color={color} />,
          }}
        />
      )}
    </Tab.Navigator>
  );
};

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
