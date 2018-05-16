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
    Events = {}

    /**
     * Creates a instance of FingerprintIdentifierManager.
     */
    constructor() {
        super();

        this.Events = {
            ON_AUTHENTICATION_RESULT: "onAuthenticationResult"
        };
        Object.freeze(this.Events);

        this.setFingerprintStatusCallback = this.setFingerprintStatusCallback.bind(this);
        this.cancelAuthentication = this.cancelAuthentication.bind(this);
        this.removeFingerprintStatusCallback = this.removeFingerprintStatusCallback.bind(this);
        this.authenticationFingerprintRequest = this.authenticationFingerprintRequest.bind(this);

        DeviceEventEmitter.addListener(this.Events.ON_AUTHENTICATION_RESULT, (status: Event) => {
            if ( this._fingerprintStatusCallback != null ) {
                this._fingerprintStatusCallback(status);
            }
        });
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
    async authenticationFingerprintRequest() : int {
        return await NativeModules.FingerprintIdentifierManagerModule.authenticationFingerprintRequest();
    }

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
        this._fingerprintStatusCallback = fingerprintStatusCallback;
    }

    /**
     * Remove the finger print status callback for response.
     */
    removeFingerprintStatusCallback() {
        if ( this._fingerprintStatusCallback != null ) {
            DeviceEventEmitter.removeListener(this.Events.ON_AUTHENTICATION_RESULT, this._fingerprintStatusCallback);
        }
    }
}

//==========================================================================
// EXPORTS

// export TouchIDModal;

/**
 * @module FingerprintIdentifierManager object
 */
export default new FingerprintIdentifierManager();
