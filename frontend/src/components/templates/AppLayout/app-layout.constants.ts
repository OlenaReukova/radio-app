export const APP_LAYOUT_BEHAVIOR = {
  header: {
    height: {
      desktop: 72,
      mobile: 64,
    },
  },
  sidebar: {
    width: 80,
    breakpoint: "md",
  },
  bottomNav: {
    height: 64,
    breakpoint: "md",
  },
  player: {
    persistant: true,
    overlay: true,
  },
} as const;
