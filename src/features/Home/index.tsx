import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { NavigationStackParams } from '../../types';
import useIdleManager from './useIdleManager';

const Home = () => {
  const navigation = useNavigation<NavigationStackParams>();

  const [text, setText] = useState('');

  const goToFeatureOne = () => {
    navigation.navigate('FEATURE_ONE', {
      id: 123,
    });
  };

  const handleOnChangeText = (value: string) => {
    setText(value);
  };

  const onUserIdle = useCallback(() => {
    Alert.alert('Idle', 'user is idle', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: resetTimer },
    ]);
  }, []);

  const { panResponder, isInActive, resetTimer } = useIdleManager({
    idleDuration: 10000,
    checkIdleFrequency: 500,
    callback: onUserIdle,
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text>Home {text}</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleOnChangeText}
      />

      <Text>User is idle? {isInActive.toString()}</Text>
      <Button title="go to feature one" onPress={goToFeatureOne} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
  },
});
