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

```javascript
/**
 * This function detect if the current device can identify finger print.
 * @async
 * @returns {boolean} true or false. true if device has finger print sensor, else return false.
 */
async hasFingerprintSensor()

/**
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

## Methods

|Description|Android|iOS
---|---|---
|Detect if has sensor hardware|✓|✓
|Request finger print authentication|✓|✓

## Events
Description|Android|IOS
---|---|---
|Audio finished play|✓|✓
|Track current time|✓|✓
|Volume changed
|System volume changed
|Wired headset plugged/unplugged|✓|✓
|Audio focus changed
|Silent mode changed (iOS only)| |✓
|Dim screen by proximity on/off|✓|✓
