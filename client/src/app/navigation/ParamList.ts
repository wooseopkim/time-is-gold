import { ScreenName } from '../screens/names';

type ParamList = {
  GAME_SCREEN: {};
  LICENSES_SCREEN: {};
};

// this line ensures that ParamList has ScreenNames as keys
({} as ParamList as { [key in ScreenName]: object });

export default ParamList;
