const useWrapperContentStyleSeparator = (
  styles: Record<string, string | number | (string | number)[]>
) => {
  const contentStyles: Record<string, unknown> = {
    ...styles,
  };

  const wrapperStyles: Record<string, unknown> = {};

  for (const key in styles) {
    if (["padding", "justifyContent"].some((item) => key.startsWith(item))) {
      wrapperStyles[key] = styles[key];
      delete contentStyles[key];
    }
  }

  return {
    contentStyles,
    wrapperStyles,
  };
};

export default useWrapperContentStyleSeparator;
