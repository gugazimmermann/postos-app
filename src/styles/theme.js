import { createTheme } from "@rneui/themed";
import {
  amber200,
  amber500,
  amber700,
  black,
  emerald500,
  red600,
  sky500,
  slate100,
  slate200,
  slate300,
  slate400,
  slate50,
  slate500,
  slate600,
  slate800,
  white,
  yellow500,
} from "./colors";

const theme = createTheme({
  lightColors: {
    primary: amber500,
    secondary: sky500,
    indicator: amber700,
    text: slate800,
    background: slate100,
    white: white,
    black: black,
    grey0: slate50,
    grey1: slate100,
    grey2: slate200,
    grey3: slate300,
    grey4: slate400,
    grey5: slate500,
    greyOutline: slate600,
    searchBg: slate100,
    success: emerald500,
    warning: yellow500,
    error: red600,
    disabled: slate300,
    divider: slate400,
  },
  darkColors: {
    primary: amber500,
    secondary: sky500,
    indicator: amber200,
    text: slate200,
    background: slate800,
    white: white,
    black: black,
    grey0: slate500,
    grey1: slate400,
    grey2: slate300,
    grey3: slate200,
    grey4: slate100,
    grey5: slate50,
    greyOutline: slate600,
    searchBg: slate100,
    success: emerald500,
    warning: yellow500,
    error: red600,
    disabled: slate300,
    divider: slate400,
  },
  components: {
    Text: (props, theme) => ({
      style: {
        fontSize: 16,
        color: theme.colors.text,
      },
      h1Style: {
        fontSize: 32,
        fontWeight: "bold",
        color: theme.colors.text,
      },
      h2Style: {
        fontSize: 26,
        fontWeight: "bold",
        color: theme.colors.text,
      },
      h3Style: {
        fontSize: 21,
        color: theme.colors.text,
      },
      h4Style: {
        fontSize: 18,
        color: theme.colors.text,
      },
    }),
    Dialog: (props, theme) => ({
      overlayStyle: {
        backgroundColor: theme.colors.background,
        padding: theme.spacing.xl,
        borderRadius: theme.spacing.md,
        elevation: 4,
      },
    }),
    DialogTitle: (props, theme) => ({
      titleStyle: {
        color: theme.colors.text,
        textTransform: "uppercase",
      },
    }),
    DialogButton: (props, theme) => ({
      titleStyle: {
        color: theme.colors.text,
      },
      buttonStyle: {
        marginVertical: theme.spacing.sm,
      },
      size: "md",
      uppercase: true,
    }),
    Tab: (props, theme) => ({
      indicatorStyle: {
        backgroundColor: theme.colors.indicator,
        height: theme.spacing.sm,
        elevation: theme.spacing.sm,
      },
      variant: "primary",
    }),
    TabItem: {
      titleStyle: {
        fontSize: 16,
      },
    },
    TabViewItem: (props, theme) => ({
      style: { paddingTop: theme.spacing.sm },
    }),
    ListItem: (props, theme) => ({
      style: {
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
      },
      containerStyle: {
        backgroundColor: theme.colors.grey0,
        marginBottom: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xl,
        elevation: theme.spacing.sm,
      },
      pad: theme.spacing.md,
      bottomDivider: true,
    }),
    ListItemSwipeable: (props, theme) => ({
      style: {
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
      },
      containerStyle: {
        backgroundColor: theme.colors.grey0,
        marginBottom: theme.spacing.md,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xl,
        elevation: theme.spacing.sm,
      },
      pad: theme.spacing.xs,
      bottomDivider: true,
      leftWidth: 70,
      minSlideWidth: 60,
    }),
    ListItemContent: {
      style: {
        width: "100%",
      },
    },
    ListItemTitle: (props, theme) => ({
      style: {
        fontSize: 18,
        fontWeight: "bold",
        color: theme.colors.text,
      },
    }),
    ListItemSubtitle: (props, theme) => ({
      style: {
        fontSize: 16,
        color: theme.colors.text,
      },
    }),
    ListItemChevron: (props, theme) => ({
      iconProps: {
        size: 36,
        color: theme.colors.greyOutline
      },
    }),
    FAB: {
      size: "large",
      placement: "left",
      color: white,
      style: {
        backgroundColor: amber500,
        color: white,
      },
    },
  },
  mode: "light",
});

export default theme;
