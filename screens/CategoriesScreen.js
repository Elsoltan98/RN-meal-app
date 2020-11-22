import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "./../components/HeaderButton";
import { CATEGORIES } from "../data/dummy-data";
import CategoriesGridRender from "../components/CategoriesGridRender";

const CategoriesScreen = (props) => {
  const renderCategories = ({ item }) => {
    return (
      <CategoriesGridRender
        title={item.title}
        onSelect={() =>
          props.navigation.navigate("CategoryMeal", { categoryId: item.id })
        }
        color={item.color}
      />
    );
  };
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item, index) => item.id}
      renderItem={renderCategories}
      numColumns={2}
    />
  );
};

CategoriesScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Meal Categories",
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
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoriesScreen;
