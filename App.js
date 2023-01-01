import { useFonts } from "expo-font";
import { Provider } from 'react-redux';
import {store} from './src/redux/store';
import Main from './src/components/Main';

export default function App() {
  const [fontLoaded] = useFonts({
    Regular: require("./assets/fonts/RobotoRegular.ttf"),
    Medium: require("./assets/fonts/RobotoMedium.ttf"),
  });

  if (!fontLoaded) return null;

  return (
    <Provider store={store}>
    <Main/>
    </Provider>
  );
};
