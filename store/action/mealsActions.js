export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const FILTER_MEALS = "FILTER_MEALS";

export const toggle_favorite = (id) => {
  return { type: TOGGLE_FAVORITE, payload: id };
};

export const filter_meals = (filterSetting) => {
  return { type: FILTER_MEALS, payload: filterSetting };
};
