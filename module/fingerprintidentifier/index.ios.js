/**
 * @author Haroldo Shigueaki Teruya <haroldo.s.teruya@gmail.com>
 * @version 0.0
 */

//==========================================================================
// IMPORTS

/**
 * This class requires:
 * @class
 * @requires [BaseFingerprintIdentifierManager]{@link ./base/BaseFingerprintIdentifierManager}
 * @requires DeviceEventEmitter from react-native
 * @requires NativeModules from react-native
 */
import BaseFingerprintIdentifierManager from './base/BaseFingerprintIdentifierManager';
import { DeviceEventEmitter, NativeModules } from 'react-native';

//==========================================================================
/**
 * @class
 * @classdesc This class is responsible to provide the functionalities to identify a fingerprint request.
 * See [Class BaseFingerprintIdentifierManager]{@link ./base/BaseFingerprintIdentifierManager}
 */
class FingerprintIdentifierManager extends BaseFingerprintIdentifierManager {

    //==========================================================================
    // GLOBAL VARIABLES

    /**
     * Creates a instance of FingerprintIdentifierManager.
     */
    constructor() {
        super();

        this.setFingerprintStatusCallback = this.setFingerprintStatusCallback.bind(this);
        this.cancelAuthentication = this.cancelAuthentication.bind(this);
        this.removeFingerprintStatusCallback = this.removeFingerprintStatusCallback.bind(this);
        this.authenticationFingerprintRequest = this.authenticationFingerprintRequest.bind(this);
    }

    //==========================================================================
    // METHODS

    /**
     * This function detect if the current device can valid the input finger print.
     * Must be aware the many possible results of the process to identify the finger print.
     * See {AuthenticationError}
     *
     * @async
     * @returns
     */
    async authenticationFingerprintRequest(message = "") : int {
        return await NativeModules.FingerprintIdentifierManagerModule.authenticationFingerprintRequest(message);
    }

    /**
     *
     */
    async cancelAuthentication() : boolean {
        console.log("In IOS not exist finger print response. Just for Android!");
        return false;
    }

    /**
     *
     */
    async cancelAuthentication() : boolean {
        console.log("In IOS not exist finger print response. Just for Android!");
        return false;
    }

    /**
     * Only for Android.
     */
    setFingerprintStatusCallback(fingerprintStatusCallback : Callback) {
        console.log("In IOS not exist finger print response. Just for Android!");
    }

    removeFingerprintStatusCallback() {
        console.log("In IOS not exist finger print response. Just for Android!");
    }
}

//==========================================================================
// EXPORTS

/**
 * @module FingerprintIdentifierManager object
 */
module.exports = new FingerprintIdentifierManager();
