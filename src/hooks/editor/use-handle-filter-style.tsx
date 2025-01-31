import {
  FilterType,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";

const useHandleFilterStyle = (styles: StyleType) => {
  if (!styles || !styles.filter) return {};

  const filter = [];

  for (const key in styles.filter as FilterType) {
    const typedKey = key as keyof FilterType;

    if (styles.filter[typedKey] !== undefined) {
      let value = styles.filter[typedKey];

      // Convert camelCase to kebab-case where necessary
      const cssKey = typedKey === "hueRotate" ? "hue-rotate" : typedKey;

      // Determine the correct unit
      const unit =
        typedKey === "blur"
          ? "px"
          : typedKey === "hueRotate"
          ? "deg"
          : [
              "brightness",
              "contrast",
              "grayscale",
              "sepia",
              "saturate",
              "invert",
              "opacity",
            ].includes(typedKey)
          ? "%"
          : ""; // Default unitless

      filter.push(`${cssKey}(${value}${unit})`);
    }
  }

  return { filter: filter.join(" ") };
};

export default useHandleFilterStyle;
