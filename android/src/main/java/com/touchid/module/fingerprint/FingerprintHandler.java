package com.touchid.module.fingerprint;

import android.support.v4.hardware.fingerprint.FingerprintManagerCompat;
import android.support.v4.os.CancellationSignal;
import android.util.Log;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by Teruya on 02/02/2018.
 */

public class FingerprintHandler extends FingerprintManagerCompat.AuthenticationCallback {

    private CancellationSignal cancellationSignal;
    private ReactContext reactContext;
    private FingerprintManagerCompat fingerprintManager;

    public FingerprintHandler(ReactContext context, FingerprintManagerCompat fingerprintManager) {
        this.reactContext = context;
        this.fingerprintManager = fingerprintManager;
    }

    public void startAuthentication(FingerprintManagerCompat.CryptoObject cryptoObject) {

        Log.d("TouchIDManagerModule", "startAuthentication: ");
        cancellationSignal = new CancellationSignal();
        fingerprintManager.authenticate(cryptoObject, 0, cancellationSignal, this, null);
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onAuthenticationResult", FingerprintIdentifierManagerModule.START);
    }

    public boolean endAuthentication() {

        Log.d("TouchIDManagerModule", "endAuthentication: ");
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

        Log.d("TouchIDManagerModule", "onAuthenticationError: ");
        endAuthentication();
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onAuthenticationResult", FingerprintIdentifierManagerModule.INVALIDCONTEXT);
    }

    @Override
    public void onAuthenticationFailed() {

        Log.d("TouchIDManagerModule", "onAuthenticationFailed: ");
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onAuthenticationResult", FingerprintIdentifierManagerModule.FAILED);
    }

    @Override
    public void onAuthenticationSucceeded(FingerprintManagerCompat.AuthenticationResult result) {

        Log.d("TouchIDManagerModule", "onAuthenticationSucceeded: ");
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onAuthenticationResult", FingerprintIdentifierManagerModule.SUCCESS);
    }
}
