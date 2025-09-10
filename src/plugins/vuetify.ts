// Styles
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#241F0F",
          secondary: "#362E17",
          button: "#FAC738",
          error: "#ff0000ff",
          background: "#241F0F",
          selectDropdown: "#2A1F0D",
          selectText: "#6B592E",
          labelText: "#FFFFFF",
        },
      },
    },
  },
  defaults: {
    VBtn: {
      rounded: "lg",
      color: "button",
      variant: "flat",
    },
    VLabel: {
      style: {
        color: "#fff", // label color
      },
    },
    VTextField: {
      variant: "outlined",
      density: "compact",
      color: "secondary",
      style: {
        color: "#fff", // text color inside input
      },
    },
    VCard: {
      color: "primary",
      variant: "outlined",
      density: "compact",
      baseColor: "background",
      bgColor: "secondary",
      clearable: true,
    },

    VCardTitle: {
      style: {
        "font-size": "12px",
        "font-weight": "bold",
        "font-color": "white",
      },
    },

    VSelect: {
      variant: "outlined",
      density: "compact",
      color: "selectText",
      bgColor: "secondary",
      clearable: true,
    },

    VTextarea: {
      variant: "outlined",
      density: "compact",
      color: "secondary",
      style: {
        color: "#fff",
      },
    },

    VMain: {
      style: {
        "background-color": "#241F0F",
      },
    },
  },
});