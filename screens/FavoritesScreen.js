import React from "react";
import { StyleSheet, View } from "react-native";
import MealsList from "../components/MealsList";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "./../components/HeaderButton";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";

const FavoriteScreen = ({ navigation }) => {
  const favMeal = useSelector((state) => state.meals.favoriteMeals);

  if (favMeal.length === 0 || !favMeal) {
    return (
      <View style={styles.content}>
        <DefaultText style={styles.text}>
          No favorite meals Found. Start add meal as a favorite.
        </DefaultText>
      </View>
    );
  }

  return <MealsList data={favMeal} navigation={navigation} />;
};

FavoriteScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Favorite",
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
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});

export default FavoriteScreen;
