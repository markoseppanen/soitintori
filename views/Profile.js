import { Alert, View } from "react-native";
import { Button, Text } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

export const Profile = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(MainContext);

  const logOut = async () => {
    Alert.alert('Log Out', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: async () => {
          console.log('logging out');
          try {
            await AsyncStorage.clear();
            setIsLoggedIn(false);
          } catch (error) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  };

  return (
    <View>
      <Text>Profile</Text>
      <Button size="sm" onPress={logOut}>Log Out</Button>
    </View>
  );
};
