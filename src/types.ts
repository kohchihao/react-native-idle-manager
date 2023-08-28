import { StackNavigationProp } from '@react-navigation/stack';
import { MODULES } from './constants';

export type HomePageProps = undefined;

export type FeatureOnePageProps = {
  id: number;
};

export type StackParams = {
  [MODULES.HOME]: HomePageProps;
  [MODULES.FEATURE_ONE]: FeatureOnePageProps;
};

export type NavigationStackParams = StackNavigationProp<StackParams>;
