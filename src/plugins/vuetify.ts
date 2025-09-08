// Styles
import "vuetify/styles";

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
          background: "#FFFFFF",
        },
      },
    },
  },
  defaults: {
    VBtn: {
        rounded: 'lg',
        color: 'button',
        variant: 'flat',
    },
    VTextField: {
        variant: 'outlined',
        density: 'compact',
        color: 'background',
    },
    VSelect: {
        variant: 'outlined',
        density: 'compact',
        color: 'secondary',
    },
    VCardTitle: {
        style: {
            'font-size': '12px',
            'font-weight': 'bold',
            'font-color': 'white',
        },
    },
  }
});