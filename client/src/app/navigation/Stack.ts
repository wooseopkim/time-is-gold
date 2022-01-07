import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenName } from '../screens/names';

type ParamList = {
  GAME_SCREEN: undefined;
};

// this line ensures that ParamList has ScreenNames as keys
({} as ParamList as { [key in ScreenName]: object | undefined });

const Stack = createNativeStackNavigator<ParamList>();
export default Stack;
