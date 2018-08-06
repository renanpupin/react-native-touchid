package com.touchid.module.fingerprint;

import android.support.annotation.Nullable;
import android.support.v4.hardware.fingerprint.FingerprintManagerCompat;
import android.support.v4.os.CancellationSignal;
import android.util.Log;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by Teruya on 02/02/2018.
 */

public class FingerprintHandler extends FingerprintManagerCompat.AuthenticationCallback {

    private static final String TAG = "TouchID";

    // =============================================================================================
    // ATTRIBUTES ==================================================================================

    private CancellationSignal cancellationSignal;
    private ReactContext reactContext;
    private FingerprintManagerCompat fingerprintManager;
    private static final String ON_AUTHENTICATION_RESULT = "onAuthenticationResult";

    // =============================================================================================
    // CONSTRUCTOR =================================================================================

    public FingerprintHandler(ReactContext context, FingerprintManagerCompat fingerprintManager) {
        this.reactContext = context;
        this.fingerprintManager = fingerprintManager;
    }

    // =============================================================================================
    // METHODS =====================================================================================

    public void startAuthentication(FingerprintManagerCompat.CryptoObject cryptoObject) {

        Log.d(TAG, TAG + " startAuthentication: ");
        cancellationSignal = new CancellationSignal();
        fingerprintManager.authenticate(cryptoObject, 0, cancellationSignal, this, null);
        emitEvent(ON_AUTHENTICATION_RESULT, FingerprintIdentifierManagerModule.START);
    }

    public boolean endAuthentication() {

        Log.d(TAG, TAG + " endAuthentication: ");
        if (cancellationSignal != null) {
            cancellationSignal.cancel();
            cancellationSignal = null;
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void onAuthenticationError(int errMsgId, CharSequence errString) {

        endAuthentication();
        emitEvent(ON_AUTHENTICATION_RESULT, FingerprintIdentifierManagerModule.INVALIDCONTEXT);
    }

    @Override
    public void onAuthenticationFailed() {

        emitEvent(ON_AUTHENTICATION_RESULT, FingerprintIdentifierManagerModule.FAILED);
    }

    @Override
    public void onAuthenticationSucceeded(FingerprintManagerCompat.AuthenticationResult result) {

        emitEvent(ON_AUTHENTICATION_RESULT, FingerprintIdentifierManagerModule.SUCCESS);
    }

    // =============================================================================================
    // EVENT =======================================================================================

    private void emitEvent(String eventName, @Nullable Object data) {

        Log.d(TAG, TAG + " emitEvent: " + eventName);

        if (this.reactContext != null && this.reactContext.hasActiveCatalystInstance()) {
            this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, data);
        }
    }

    // =============================================================================================
    // CLASS =======================================================================================
}
