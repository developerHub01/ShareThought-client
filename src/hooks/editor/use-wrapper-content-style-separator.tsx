const useWrapperContentStyleSeparator = (
  styles: Record<string, string | number | (string | number)[]>
) => {
  const contentStyles: Record<string, unknown> = {
    ...styles,
  };

  const wrapperStyles: Record<string, unknown> = {};

  for (const key in styles) {
    let style = styles[key];
    if (
      ["padding", "justifyContent", "boxShadow"].some((item) =>
        key.startsWith(item)
      )
    ) {
      if (key === "boxShadow" && Array.isArray(styles[key])) {
        const validValue = styles[key]
          .map((item, index) => (index < 4 ? `${item}px` : item))
          .join(" ");

        style = validValue;
      }

      wrapperStyles[key] = style;
      delete contentStyles[key];
    }
  }

  console.log({ wrapperStyles });

  return {
    contentStyles,
    wrapperStyles,
  };
};

export default useWrapperContentStyleSeparator;
