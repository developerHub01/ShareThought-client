import {
  FilterType,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";

const handleHandleFilterStyle = (styles: StyleType) => {
  if (!styles || !styles.filter) return {};

  const filter = [];

  for (const key in styles.filter as FilterType) {
    const typedKey = key as keyof FilterType;

    if (styles.filter[typedKey] !== undefined) {
      let value = styles.filter[typedKey];

      if (typedKey === "drop-shadow" && Array.isArray(value)) {
        const filterValueWithUnit = value.map((item, index) =>
          index < value.length - 1 ? `${item}px` : item
        );
        filter.push(`${typedKey}(${filterValueWithUnit.join(" ")})`);
        continue;
      }

      // Determine the correct unit
      const unit =
        typedKey === "blur"
          ? "px"
          : typedKey === "hue-rotate"
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

      filter.push(`${typedKey}(${value}${unit})`);
    }
  }

  return { filter: filter.join(" ") };
};

export default handleHandleFilterStyle;
