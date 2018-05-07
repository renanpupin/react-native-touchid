

# react-native-touchid

[![React Native Version](https://img.shields.io/badge/react--native-latest-blue.svg?style=flat-square)](http://facebook.github.io/react-native/releases)

A react-native library to use the native authentication API of the iOS and android.

In IOS, the native API, provide a UI to handle the user I/O.
In Android must implement the UI to handle the user I/O.

## Getting started

`$ npm install react-native-touchid --save`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-touchid` and add `RNReactNativeTouchid.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNReactNativeTouchid.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.touchid.module.fingerprint.FingerprintIdentifierManagerPackage;` to the imports at the top of the file
  - Add `new FingerprintIdentifierManagerPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-touchid'
  	project(':react-native-touchid').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-touchid/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-touchid')
  	```

## Usage

### Android

```javascript
import { TouchIDManager } from 'react-native-touchid';

/**
 * Verify if current device has finger print available and ready to use.
 *
 * @returns {boolean} true or false. true if ready to use. false if do not have hardware or finger print registered.
 */
// Usage:
var response = await TouchIDManager.hasFingerprintSensor();
if ( response ) {
    console.log("have finger print sensor hardware and finger print registered");
} else {
    console.log("not have finger print sensor");
}


/**
 * In the Android, the UI must be implemented. When this function is called, the native API wait the user to input the finger print if everything is alright or immediately return an response. To cancel the authentication, or if the user give up in authenticate by finger print, call "TouchIDManager.cancelAuthentication".
 *
 * @return {int} see TouchIDManager.Response;
 */
// Usage:
let response = await TouchIDManager.authenticationFingerprintRequest();
switch ( response ) {
    case TouchIDManager.Response.APPCANCEL: alert("0 - Authentication was cancelled by application"); break;
    case TouchIDManager.Response.FAILED: alert("1 - The user failed to provide valid credentials"); break;
    case TouchIDManager.Response.INVALIDCONTEXT: alert("2 - The context is invalid"); break;
    case TouchIDManager.Response.PASSCODENOTSET: alert("3 - Passcode is not set on the device"); break;
    case TouchIDManager.Response.SYSTEMCANCEL: alert("4 - Authentication was cancelled by the system"); break;
    case TouchIDManager.Response.TOUCHIDLOCKOUT: alert("5 - Too many failed attempts."); break;
    case TouchIDManager.Response.TOUCHIDNOTAVAILABLE: alert("6 - TouchIDManager is not available on the device"); break;
    case TouchIDManager.Response.USERCANCEL: alert("7 - The user did cancel"); break;
    case TouchIDManager.Response.USERFALLBACK: alert("8 - The user chose to use the fallback"); break;
    case TouchIDManager.Response.NOTERROR: alert("9 - Did not find error code object"); break;
    case TouchIDManager.Response.NOLOCKSCREEN: alert("10 - (Android) No lock sreen enable"); break;
    case TouchIDManager.Response.SUCCESS: alert("11 - (Android)Authentication success"); break;
    case TouchIDManager.Response.START: alert("12 - (Android) Start authentication"); break;
    case DEFAULT: break;
}

/**
 * Just for Android.
 * Callback of the response for the authentication fingerprint process.  
 *
 * @return {boolean}
 */
TouchIDManager.setFingerprintStatusCallback((response) => {
    switch ( response ) {
        case TouchIDManager.Response.APPCANCEL: alert("0 - Authentication was cancelled by application"); break;
        case TouchIDManager.Response.FAILED: alert("1 - The user failed to provide valid credentials"); break;
        case TouchIDManager.Response.INVALIDCONTEXT: alert("2 - The context is invalid"); break;
        case TouchIDManager.Response.PASSCODENOTSET: alert("3 - Passcode is not set on the device"); break;
        case TouchIDManager.Response.SYSTEMCANCEL: alert("4 - Authentication was cancelled by the system"); break;
        case TouchIDManager.Response.TOUCHIDLOCKOUT: alert("5 - Too many failed attempts."); break;
        case TouchIDManager.Response.TOUCHIDNOTAVAILABLE: alert("6 - TouchIDManager is not available on the device"); break;
        case TouchIDManager.Response.USERCANCEL: alert("7 - The user did cancel"); break;
        case TouchIDManager.Response.USERFALLBACK: alert("8 - The user chose to use the fallback"); break;
        case TouchIDManager.Response.NOTERROR: alert("9 - Did not find error code object"); break;
        case TouchIDManager.Response.NOLOCKSCREEN: alert("10 - (Android) No lock sreen enable"); break;
        case TouchIDManager.Response.SUCCESS: alert("11 - (Android)Authentication success"); break;
        case TouchIDManager.Response.START: alert("12 - (Android) Start authentication"); break;
        case DEFAULT: break;
    }
});

/**
 * Just for Android.
 * Cancel the authentication fingerprint process.
 * Always return true.
 *
 * @return {boolean}
 */
var response = await TouchIDManager.cancelAuthentication();
```

### IOS

```javascript
import { TouchIDManager } from 'react-native-touchid';

/**
 * Verify if current device has finger print available and ready to use.
 *
 * @returns {boolean} true or false. true if ready to use. false if do not have hardware or finger print registered.
 */
// Usage:
var response = await TouchIDManager.hasFingerprintSensor();
if ( response ) {
    console.log("have finger print sensor hardware and finger print registered");
} else {
    console.log("not have finger print sensor");
}


/**
 * In IOS, the native api alredy provide a UI interface an eventually, easier to authenticate the finger print.
 *
 * @return {int} see TouchIDManager.Response;
 */
// Usage:
let response = await TouchIDManager.authenticationFingerprintRequest();
switch ( response ) {
    case TouchIDManager.Response.APPCANCEL: alert("0 - Authentication was cancelled by application"); break;
    case TouchIDManager.Response.FAILED: alert("1 - The user failed to provide valid credentials"); break;
    case TouchIDManager.Response.INVALIDCONTEXT: alert("2 - The context is invalid"); break;
    case TouchIDManager.Response.PASSCODENOTSET: alert("3 - Passcode is not set on the device"); break;
    case TouchIDManager.Response.SYSTEMCANCEL: alert("4 - Authentication was cancelled by the system"); break;
    case TouchIDManager.Response.TOUCHIDLOCKOUT: alert("5 - Too many failed attempts."); break;
    case TouchIDManager.Response.TOUCHIDNOTAVAILABLE: alert("6 - TouchIDManager is not available on the device"); break;
    case TouchIDManager.Response.USERCANCEL: alert("7 - The user did cancel"); break;
    case TouchIDManager.Response.USERFALLBACK: alert("8 - The user chose to use the fallback"); break;
    case TouchIDManager.Response.NOTERROR: alert("9 - Did not find error code object"); break;
    case TouchIDManager.Response.NOLOCKSCREEN: alert("10 - (Android) No lock sreen enable"); break;
    case TouchIDManager.Response.SUCCESS: alert("11 - (Android)Authentication success"); break;
    case TouchIDManager.Response.START: alert("12 - (Android) Start authentication"); break;
    case DEFAULT: break;
}
```
