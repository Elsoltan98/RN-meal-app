import { MEALS } from "./../../data/dummy-data";
import { TOGGLE_FAVORITE, FILTER_MEALS } from "./../action/mealsActions";

const initialState = {
  meals: MEALS,
  filterMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const exitingFav = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.payload
      );
      if (exitingFav >= 0) {
        const updateFavMeals = [...state.favoriteMeals];
        updateFavMeals.splice(exitingFav, 1);
        return { ...state, favoriteMeals: updateFavMeals };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.payload);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
    case FILTER_MEALS:
      const appliedMeals = action.payload;
      const updateFilterdMeals = state.meals.filter((meal) => {
        if (appliedMeals.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedMeals.lactouseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedMeals.vegan && !meal.isVegan) {
          return false;
        }
        if (appliedMeals.vegetarian && !meal.isVegetarian) {
          return false;
        }

        return true;
      });
      return { ...state, filterMeals: updateFilterdMeals };
    default:
      return state;
  }
};

export default mealsReducer;
