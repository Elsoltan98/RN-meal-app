import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import MealItem from "./MealItem";

const MealsList = ({ navigation, data }) => {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);
  const renderMeals = ({ item }) => {
    const isFavorite = favoriteMeals.some((meal) => meal.id === item.id);
    return (
      <MealItem
        title={item.title}
        image={item.imageUrl}
        onSelectMeal={() =>
          navigation.navigate("MealDetail", {
            mealId: item.id,
            mealTitle: item.title,
            isFav: isFavorite,
          })
        }
        complexity={item.complexity}
        duration={item.duration}
        affordability={item.affordability}
      />
    );
  };
  return (
    <View style={styles.screen}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMeals}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export default MealsList;
