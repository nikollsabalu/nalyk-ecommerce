// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        elms: ["var(--font-elms)"],
      },
    },
  },
  plugins: [],
};
export default config;