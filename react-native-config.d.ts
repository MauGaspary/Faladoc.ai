declare module 'react-native-config' {
    interface Config {
      API_URL: string;
    }
  
    const config: Config;
    export default config;
}