# react-native-touchid

[![React Native Version](https://img.shields.io/badge/react--native-latest-blue.svg?style=flat-square)](http://facebook.github.io/react-native/releases)

A react-native library to authenticate finger print.

## Installation

Install the package:

```javascript
npm install react-native-touchid --save
```

or

```javascript
yarn add react-native-touchid
```

### Automatic

Link the native code with your RN application:

```javascript
react-native link react-native-touchid
```

### Usage

An big difference beetween Android and IOS version is:
1. Android: the API do not provide a UI, then, the developer must create the UI and use this library and handle the response by event.
2. IOS: the API provide a UI to response to the user.

#### Android and IOS
```javascript
/**
 * This function detect if the current device can identify finger print.
 * @async
 * @returns {boolean} true or false. true if device has finger print sensor, else return false.
 */
async hasFingerprintSensor()

/**
 * Must 'setFingerprintStatusCallback' or will not work properly in Android.
 * This function detect if the current device can valid the input finger print.
 * Must be aware the many possible results of the process to identify the finger print.
 * See {AuthenticationError}
 *
 * @async
 * @returns
 */
// Result:
const AuthenticationError = {
    APPCANCEL: 0,            // Authentication was cancelled by application
    FAILED: 1,               // The user failed to provide valid credentials
    INVALIDCONTEXT: 2,       // The context is invalid
    PASSCODENOTSET: 3,       // Passcode is not set on the device
    SYSTEMCANCEL: 4,         // Authentication was cancelled by the system
    TOUCHIDLOCKOUT: 5,       // Too many failed attempts.
    TOUCHIDNOTAVAILABLE: 6,  // TouchID is not available on the device
    USERCANCEL: 7,           // The user did cancel
    USERFALLBACK: 8,         // The user chose to use the fallback
    NOTERROR: 9,             // Did not find error code object
    NOLOCKSCREEN: 10,        // (Android) No lock sreen enable
    SUCESS: 11,              // (Android) Authentication sucess
    START: 12                // (Android) Start authentication
}
async authenticationFingerprintRequest()
```

#### Android
```javascript
/**
 * Cancel an authentication request.
 *
 * @async
 * @return {boolean} return true or false. true if the cancelation was a sucess, else false.
 */
async cancelAuthentication()

/**
 * Set the finger print status callback for response.
 *
 * @param {Callback} fingerprintStatusCallback - function to send the response.
 */
setFingerprintStatusCallback(fingerprintStatusCallback : Callback)
```

## Function

|Description|Android|iOS
---|---|---
|Detect if has sensor hardware|✓|✓
|Request finger print authentication|✓|✓
