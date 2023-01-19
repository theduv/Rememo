module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gwen-pink": "#9E788F",
        "gwen-purple": "#A9B3CE",
        "gwen-black": "#474954",
        "gwen-yellow": "#F6E27F",
        "gwen-green": "#C7F0BD",
        "gwen-white": "#FAF9F6",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
