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
// import {AddListing} from '../views/AddListing';
import {Profile} from '../views/Profile';
import Upload from '../views/Upload';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'white',
        tabBarActiveBackgroundColor: 'rgb(160,151,160)',
        tabBarInactiveBackgroundColor: 'rgb(160,151,160)',
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 14,
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
        <>
          <Tab.Screen
            name="Add Listing"
            component={Upload}
            options={{
              tabBarIcon: ({color}) => <Icon name="add" color={color} />,
            }}
          />
          <Tab.Screen
            name="MyProfile"
            component={StackScreen2}
            options={{
              tabBarIcon: ({color}) => <Icon name="person" color={color} />,
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
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
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Instruments"
        component={Instruments}
        options={{
          title: '',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: 'rgb(231,223,223)',
          },
        }}
      />
      <Stack.Screen
        name="SingleInstrument"
        component={SingleInstrument}
        options={{
          title: '',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: 'rgb(231,223,223)',
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
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
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
