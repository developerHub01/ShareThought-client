const useWrapperContentStyleSeparator = (
  imageStyles: Record<string, string | number | (string | number)[]>
) => {
  const contentStyles: Record<string, unknown> = {
    ...imageStyles,
  };

  const wrapperStyles: Record<string, unknown> = {};

  for (const key in imageStyles) {
    if (key.startsWith("padding")) {
      wrapperStyles[key] = imageStyles[key];
      delete contentStyles[key];
    }
  }

  return {
    contentStyles,
    wrapperStyles,
  };
};

export default useWrapperContentStyleSeparator;
