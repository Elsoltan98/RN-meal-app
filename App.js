import React, { useState, useEffect } from "react";

import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import MealsNavigator from "./navigation/MealsNavigation";
import { enableScreens } from "react-native-screens";
import mealsReducer from "./store/reducer/mealsReducer";

enableScreens();

const rootReducers = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducers);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}

export default App;
