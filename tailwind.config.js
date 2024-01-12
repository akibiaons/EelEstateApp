module.exports = {
  content: [
    './components/screens/login.tsx',
    './components/screens/signup.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        OCOMNI: 'OCOMNI',
      },
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
};
