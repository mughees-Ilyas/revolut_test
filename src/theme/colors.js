import { darken, lighten } from "polished";

const themeColors = {
  primary: "#0cc8ef",
  secondary:"#444444",
  base: "#ffffff",
  danger:'#CB3535',
  lightGray: '#7e8c8f',
};

const colorVariations = {
  lighter: 0.2,
  darker: 0.15
};

export const colors = {
  ...makeVariations("primary", themeColors.primary),
  ...makeVariations("secondary", themeColors.secondary),
  ...makeVariations("base", themeColors.base),
  ...makeVariations("danger", themeColors.danger),
    ...makeVariations("lightGray", themeColors.lightGray)
};

function makeVariations(name, color) {
  const variations = {};
  variations[name] = color;
  variations[`${name}Lighter`] = lighten(colorVariations.lighter, color);
  variations[`${name}Darker`] = darken(colorVariations.darker, color);
  return variations;
}
