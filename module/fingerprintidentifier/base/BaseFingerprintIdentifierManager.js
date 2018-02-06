/**
 * @author Haroldo Shigueaki Teruya <haroldo.s.teruya@gmail.com>
 * @version 0.0
 */

//==========================================================================
// IMPORTS

/**
 * This class requires:
 * @class
 * @requires DeviceEventEmitter from react-native
 * @requires NativeModules from react-native
 */
import { DeviceEventEmitter, NativeModules } from 'react-native';

//==========================================================================

/**
 * @constant
 * @type {int}
 * @default {}
*/
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

/**
 * @class
 * @classdesc This class is responsible to provide the functionalities to identify a fingerprint request.
 */
class BaseFingerprintIdentifierManager {

    //==========================================================================
    // GLOBAL VARIABLES

    //==========================================================================
    // CONSTRUCTOR

    //==========================================================================
    // METHODS

    /**
     * This function detect if the current device can identify finger print.
     *
     * @async
     * @returns {boolean} true or false. true if device has finger print sensor, else return false.
     */
    async hasFingerprintSensor() : boolean {
        return await NativeModules.FingerprintIdentifierManagerModule.hasFingerprintSensor();
    }

    /**
     * This function detect if the current device can valid the input finger print.
     * Must be aware the many possible results of the process to identify the finger print.
     * See {AuthenticationError}
     *
     * @async
     * @returns
     */
    async authenticationFingerprintRequest() : int {
        return await NativeModules.FingerprintIdentifierManagerModule.authenticationFingerprintRequest();
    }

    //==========================================================================
    // SETTERS & GETTERS
}

/**
 * @module BaseFingerprintIdentifierManager
 */
module.exports = BaseFingerprintIdentifierManager;
