import { defineShikiSetup } from "@slidev/types";

export default defineShikiSetup(() => {
  return {
    themes: {
      dark: "vitesse-dark",
      light: "vitesse-light",
    },
    langs: ["python", "ts", "mermaid"],
  };
});
