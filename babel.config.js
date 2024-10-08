module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        safe: true,
        envName: 'bookshelf_env',
        moduleName: '@env',
        path: '.env',
        allowUndefined: false,
      },
    ],
  ],
};
