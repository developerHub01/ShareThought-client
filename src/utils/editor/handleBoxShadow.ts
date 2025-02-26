const handleBoxShadow = (
  styles: Record<string, string | number | (string | number)[]>
) => {
  for (const key in styles) {
    let style = styles[key];
    if (key.startsWith("boxShadow") && Array.isArray(style)) {
      const validValue = style
        .map((item, index) => (index < 4 ? `${item}px` : item))
        .join(" ");

      styles[key] = validValue;
    }
  }

  return {
    ...styles,
  };
};

export default handleBoxShadow;
