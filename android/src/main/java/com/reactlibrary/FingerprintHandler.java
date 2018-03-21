package com.reactlibrary;

import android.support.v4.hardware.fingerprint.FingerprintManagerCompat;
import android.support.v4.os.CancellationSignal;

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
        cancellationSignal = new CancellationSignal();
        fingerprintManager.authenticate(cryptoObject, 0, cancellationSignal, this, null);
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onAuthenticationResult", FingerprintIdentifierManagerModule.START);
    }

    public boolean endAuthentication() {
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
    }

    @Override
    public void onAuthenticationFailed() {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onAuthenticationResult", FingerprintIdentifierManagerModule.FAILED);
    }

    @Override
    public void onAuthenticationSucceeded(FingerprintManagerCompat.AuthenticationResult result) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onAuthenticationResult", FingerprintIdentifierManagerModule.SUCCESS);
    }
}
