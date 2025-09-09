// Styles
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css"

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
          background: "#241F0F", // Add background color for full page
        },
      },
    },
  },
  defaults: {
    VContainer: {
        class: 'bg-primary',
    },
    VCard: {
        color: 'primary',
    },
    VBtn: {
      rounded: "lg",
      color: "button",
      variant: "flat",
    },
    VTextField: {
      variant: "outlined",
      density: "compact",
      color: "secondary",
    },
    VCard: {
      color: "primary",
        variant: 'outlined',
        density: 'compact',
        baseColor: 'white',
        bgColor: 'secondary',
        clearable: true,
    },
    VSelect: {
        variant: 'outlined',
        density: 'compact',
        color: 'secondary',
        clearable: true,
    },
    VCardTitle: {
      style: {
        "font-size": "12px",
        "font-weight": "bold",
        "font-color": "white",
      },
    },
    VMain: {
      style: {
        "background-color": "#241F0F",
      },
    },
  },
});
