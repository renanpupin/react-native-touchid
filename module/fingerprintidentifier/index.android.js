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

    _fingerprintStatusCallback = null;

    /**
     * Creates a instance of FingerprintIdentifierManager.
     */
    constructor() {
        super();

        this._hasFingerprintStatusCallback = false;

        DeviceEventEmitter.addListener('onAuthenticationResult', function(status: Event) {
            if ( _hasFingerprintStatusCallback ) {
                _fingerprintStatusCallback(status);
            }
        });
    }

    //==========================================================================
    // METHODS

    /**
     * This function to cancel an authentication request.
     *
     * @async
     * @return {boolean} return true or false. true if the cancelation was a sucess, else false.
     */
    async cancelAuthentication() : boolean {
        return await NativeModules.FingerprintIdentifierManagerModule.cancelAuthentication();
    }

    /**
     * Set the finger print status callback for response.
     *
     * @param {Callback} fingerprintStatusCallback - function to send the response.
     */
    setFingerprintStatusCallback(fingerprintStatusCallback : Callback) {
        _fingerprintStatusCallback = fingerprintStatusCallback;
        _hasFingerprintStatusCallback = true;
    }
}

//==========================================================================
// EXPORTS

/**
 * @module FingerprintIdentifierManager object
 */
module.exports = new FingerprintIdentifierManager();
