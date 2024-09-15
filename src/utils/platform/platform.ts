import { Dimensions, Platform, PlatformIOSStatic } from 'react-native';


export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const platformIOS = Platform as PlatformIOSStatic
export const isIpad = platformIOS.isPad

export const aspectRatio = windowHeight / windowWidth;
