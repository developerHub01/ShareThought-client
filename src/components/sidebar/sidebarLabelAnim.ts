export const sidebarLabelAnimProps = {
  animate: {
    opacity: 1,
    filter: "blur(0)",
  },
  exit: {
    opacity: 0,
    filter: "blur(10px)",
  },
  transition: {
    duration: 1,
    ease: "easeInOut",
    type: "inertia",
  },
};
