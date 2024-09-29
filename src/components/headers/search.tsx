import { Pressable, TextInput } from 'react-native';
import { windowHeight, windowWidth } from '../../utils/platform/platform';
import { useNavigation } from '@react-navigation/native';

export const SearchNav = () => {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      onPress={() => navigation.navigate('Search')}
      style={{
        justifyContent: 'center',
        width: windowWidth,
        height: windowHeight * 0.125,
        backgroundColor: '#2eab34',
        position: 'absolute',
        top: 0,
        borderRadius: 12,
      }}>
      <TextInput
        value={''}
        onChangeText={() => {}}
        placeholder="Search..."
        textAlign="left"
        style={{
          width: '90%',
          height: '27%',
          backgroundColor: 'white',
          alignSelf: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          borderColor: 'transparent',
          top: windowHeight * 0.035,
          padding: '2%',
        }}
      />
    </Pressable>
  );
};
