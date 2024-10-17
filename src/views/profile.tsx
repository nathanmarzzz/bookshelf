import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { State } from '../store/store';

export const Profile = () => {
  const currUser = useSelector((state: State) => state.user);
  console.log(currUser);
  return (
    <View>
      <Text>{currUser?.name ?? ''}</Text>
      <Text>{currUser?.bio ?? ''}</Text>
      <Text>{currUser?.genres ?? ''}</Text>
    </View>
  );
};
