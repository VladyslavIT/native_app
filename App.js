import RegistrationScreen from "./src/Screens/auth/RegistrationScreen";
import LoginScreen from "./src/Screens/auth/LoginScreen";
import Home from "./src/Screens/Home";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useRoute } from "./router";
import { Provider } from 'react-redux';
import {store} from './src/redux/store';

const AuthStack = createStackNavigator();

export default function App() {
  const [fontLoaded] = useFonts({
    Regular: require("./assets/fonts/RobotoRegular.ttf"),
    Medium: require("./assets/fonts/RobotoMedium.ttf"),
  });
  if (!fontLoaded) return null;

  // const routing = useRoute(false);

  return (
    <Provider store={store}>
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
