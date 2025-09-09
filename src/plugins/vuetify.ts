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
          background: "#241F0F",
          selectDropdown: "#2A1F0D",
          selectText: "#6B592E",
          labelText: "#FFFFFF",
        },
      },
    },
  },
  defaults: {
    VCard: {
      color: 'primary',
    },
    VBtn: {
      rounded: 'lg',
      color: 'button',
      variant: 'flat',
    },
    VLabel: {
      labelColor: "labelText",
    },
    VTextField: {
      variant: "outlined",
      density: "compact",
      color: "#6B592E",
      bgColor: "secondary",
      clearable: true,
      border: '1px',
      padding: '15px',
      rounded: 'lg',
    },
    VSelect: {
      variant: 'outlined',
      density: 'compact',
      color: 'selectText',
      bgColor: 'secondary',
      clearable: true,
    },
    VMain: {
      style: {
        "background-color": "#241F0F",
      },
    },
  },
});
