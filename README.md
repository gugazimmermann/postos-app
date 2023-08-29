# React Native / Expo / React Native Elements - Drivers App
## Touch Sistemas - Postos

https://www.touchsistemas.com.br

## usefull commands

### IP

* hostname -I

My IPs:

win: 192.168.1.2

note: 10.255.241.197


#### emulator

`npx expo start`

* clear cache - `npx expo start --clear`

#### start dedv

`emulator -list-avds`

`emulator -avd Pixel_7_Android_13`

`emulator -avd Pixel_2_Android_9`

`emulator -avd Pixel_7_Android_13 -wipe-data`

* enable dark mode - `adb shell "cmd uimode night yes"`
* disable dark mode - `adb shell "cmd uimode night no"`

## expo

`npx expo config --type introspect`

`eas build -p android --profile preview`

### update

`eas update --branch [channel] --message [message]`

`eas update --branch preview --message "Updating the app"`

### Development Server

`npx expo start --dev-client`

use `ExpoPushToken` in https://expo.dev/notifications

### Libs

https://react-native-async-storage.github.io/async-storage/docs/usage/

https://docs.swmansion.com/react-native-reanimated/

* list of libs - https://reactnative.directory/?search=storage
