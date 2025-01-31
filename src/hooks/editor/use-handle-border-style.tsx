import {
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";

const useHandleBorderStyle = (styles: StyleType): Record<string, string> => {
  const filteredStyles: Record<string, string> = {};

  if (Array.isArray(styles?.border))
    filteredStyles.border = `${styles.border[0]}px ${styles.border[1]} ${styles.border[2]}`;
  if (Array.isArray(styles?.borderTop))
    filteredStyles.borderTop = `${styles.borderTop[0]}px ${styles.borderTop[1]} ${styles.borderTop[2]}`;
  if (Array.isArray(styles?.borderBottom))
    filteredStyles.borderBottom = `${styles.borderBottom[0]}px ${styles.borderBottom[1]} ${styles.borderBottom[2]}`;
  if (Array.isArray(styles?.borderLeft))
    filteredStyles.borderLeft = `${styles.borderLeft[0]}px ${styles.borderLeft[1]} ${styles.borderLeft[2]}`;
  if (Array.isArray(styles?.borderRight))
    filteredStyles.borderRight = `${styles.borderRight[0]}px ${styles.borderRight[1]} ${styles.borderRight[2]}`;

  return filteredStyles;
};

export default useHandleBorderStyle;
