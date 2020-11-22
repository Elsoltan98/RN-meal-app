import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";
import MealsList from "../components/MealsList";
import { CATEGORIES } from "../data/dummy-data";

const CategoriesMealsScreen = ({ navigation }) => {
  const catId = navigation.getParam("categoryId");
  const availableMeals = useSelector((state) => state.meals.filterMeals);

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check your filters ?</DefaultText>
      </View>
    );
  }
  return <MealsList navigation={navigation} data={displayedMeals} />;
};

CategoriesMealsScreen.navigationOptions = ({ navigation }) => {
  const catId = navigation.getParam("categoryId");

  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoriesMealsScreen;
