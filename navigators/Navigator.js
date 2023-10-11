import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../views/Login';
import {Icon} from '@rneui/themed';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {Instruments} from '../views/Instruments';
import {SingleInstrument} from '../views/SingleInstrument';
import {Categories} from '../views/Categories';
import {AddListing} from '../views/AddListing';
import {Profile} from '../views/Profile';
import EditListing from '../views/EditListing';
import Search from '../views/Search';
import {History} from '../views/History';
import {MyListing} from '../views/MyListing';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'rgb(255, 0, 0)',
        tabBarInactiveTintColor: 'rgb(255, 255, 255)',
        tabBarActiveBackgroundColor: 'rgb(0, 0, 0)',
        tabBarInactiveBackgroundColor: 'rgb(0, 0, 0)',
        tabBarStyle: {
          height: 70,
          backgroundColor: 'rgb(0, 0, 0)',
          borderTopColor: 'rgb(255, 255, 255)',
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          margin: 2,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Tab.Screen
        name="Announcements"
        component={StackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <Icon name="list" color={color} />,
        }}
      />
      {isLoggedIn ? (
        <Tab.Screen
          name="Add Listing"
          component={StackScreen2}
          options={{
            tabBarIcon: ({color}) => <Icon name="add" color={color} />,
          }}
        />
      ) : null}
      {isLoggedIn ? (
        <Tab.Screen
          name="Profile"
          component={StackScreen3}
          options={{
            tabBarIcon: ({color}) => <Icon name="person" color={color} />,
          }}
        />
      ) : (
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => <Icon name="person" color={color} />,
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
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'rgb(0, 0, 0)',
          },
        }}
      />
      <Stack.Screen
        name="Instruments"
        component={Instruments}
        options={{
          title: '',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: 'rgb(0, 0, 0)',
          },
          headerTintColor: 'rgb(255, 255, 255)',
        }}
      />
      <Stack.Screen
        name="SingleInstrument"
        component={SingleInstrument}
        options={{
          title: '',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: 'rgb(0, 0, 0)',
          },
          headerTintColor: 'rgb(255, 255, 255)',
        }}
      />
      <Stack.Screen
        name="Edit Listing"
        component={EditListing}
        options={{
          title: 'Edit announcement',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: 'rgb(0, 0, 0)',
          },
          headerTintColor: 'rgb(255, 255, 255)',
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'rgb(0, 0, 0)',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const StackScreen2 = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddListing"
        component={AddListing}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'rgb(0, 0, 0)',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const StackScreen3 = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyProfile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Personal History"
        component={History}
        options={{
          title: '',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: 'rgb(0, 0, 0)',
          },
          headerTintColor: 'rgb(255, 255, 255)',
        }}
      />
      <Stack.Screen
        name="Current Listing"
        component={MyListing}
        options={{
          headerShown: false,
          title: '',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: 'rgb(0, 0, 0)',
          },
          headerTintColor: 'rgb(255, 255, 255)',
        }}
      />
    </Stack.Navigator>
  );
};

export const Navigator = () => {
  return (
    <NavigationContainer>
      <TabScreen />
    </NavigationContainer>
  );
};
