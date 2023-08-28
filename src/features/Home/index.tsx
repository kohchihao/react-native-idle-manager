import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationStackParams } from '../../types';

const Home = () => {
  const navigation = useNavigation<NavigationStackParams>();

  const goToFeatureOne = () => {
    navigation.navigate('FEATURE_ONE', {
      id: 123,
    });
  };
  return (
    <View style={styles.container}>
      <Text>Home</Text>

      <Button title="go to feature one" onPress={goToFeatureOne} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {},
});
