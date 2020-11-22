import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import { filter_meals } from "../store/action/mealsActions";
import HeaderButton from "./../components/HeaderButton";
import color from "./../constant/color";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.label}>{props.label}</Text>

      <Switch
        trackColor={{ true: color.primary, false: "#fff" }}
        thumbColor={Platform.OS === "android" ? color.primary : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FilterScreen = ({ navigation }) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactouseFree, setIsLactouseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const savedFilter = useCallback(() => {
    const appliedFilter = {
      glutenFree: isGlutenFree,
      lactouseFree: isLactouseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    dispatch(filter_meals(appliedFilter));
  }, [
    isGlutenFree,
    isLactouseFree,
    isVegan,
    isVegetarian,
    dispatch,
    filter_meals,
  ]);

  useEffect(() => {
    navigation.setParams({ save: savedFilter });
  }, [savedFilter]);
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Avilable Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={(newValue) => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label="Lactouse-free"
        state={isLactouseFree}
        onChange={(newValue) => setIsLactouseFree(newValue)}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={(newValue) => setIsVegan(newValue)}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={(newValue) => setIsVegetarian(newValue)}
      />
    </View>
  );
};

FilterScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Filter Meals",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navigation.getParam("save")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,

    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    margin: 20,
    fontSize: 22,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
    backgroundColor: "#ccc",
    padding: 10,
  },

  label: {
    fontSize: 18,
    fontFamily: "open-sans",
  },
});

export default FilterScreen;
