import { useRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StackParams } from '../../types';

type Props = StackScreenProps<StackParams, 'FEATURE_ONE'>;
type RouteProps = Props['route'];

const FeatureOne = () => {
  const route = useRoute<RouteProps>();

  return (
    <View style={styles.container}>
      <Text>FeatureOne</Text>
      <Text>ID: {route.params.id}</Text>
    </View>
  );
};

export default FeatureOne;

const styles = StyleSheet.create({
  container: {},
});
