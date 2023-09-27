import { View } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import { CategoryPicker } from '../components/CategoryPicker';

export const AddListing = () => {
  return (
    <View>
      <CategoryPicker />
      <Input
        errorMessage="Description required."
        label="Description"
        leftIcon={
          <Icon
            name="description"
            size={20}
          />
        }
        leftIconContainerStyle={{}}
        rightIcon={
          <Icon
            name="close"
            size={20}
          />
        }
        rightIconContainerStyle={{}}
        placeholder="Describe your instrument"
      />
    </View>
  );
};
