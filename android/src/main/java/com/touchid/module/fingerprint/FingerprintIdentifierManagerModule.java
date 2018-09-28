package com.touchid.module.fingerprint;

import android.Manifest;
import android.annotation.TargetApi;
import android.app.KeyguardManager;
import android.content.Context;
import android.content.pm.PackageManager;
import android.hardware.fingerprint.FingerprintManager;
import android.os.Build;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyPermanentlyInvalidatedException;
import android.security.keystore.KeyProperties;
import android.support.v4.app.ActivityCompat;
import android.support.v4.hardware.fingerprint.FingerprintManagerCompat;
import android.util.Log;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;

/**
 * Created by Teruya on 09/01/2018.
 * <p>
 * Finger print recognition is available with API level 23 (Marshmallow) and higher only.
 */

public class FingerprintIdentifierManagerModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private static final String TAG = "TouchId";

    // =============================================================================================
    // ATTRIBUTES ==================================================================================

    public static final int APPCANCEL = 0;            // Authentication was cancelled by application
    public static final int FAILED = 1;               // The user failed to provide valid credentials
    public static final int INVALIDCONTEXT = 2;       // The context is invalid
    public static final int PASSCODENOTSET = 3;       // Passcode is not set on the device
    public static final int SYSTEMCANCEL = 4;         // Authentication was cancelled by the system
    public static final int TOUCHIDLOCKOUT = 5;       // Too many failed attempts.
    public static final int TOUCHIDNOTAVAILABLE = 6;  // TouchID is not available on the device
    public static final int USERCANCEL = 7;           // The user did cancel
    public static final int USERFALLBACK = 8;         // The user chose to use the fallback
    public static final int NOTERROR = 9;             // Did not find error code object
    public static final int NOLOCKSCREEN = 10;        // No lock sreen enable
    public static final int SUCCESS = 11;             // Authentication sucess
    public static final int START = 12;               // Start authentication

    private ReactApplicationContext reactContext = null;
    private FingerprintManagerCompat fingerprintManager;
    private KeyguardManager keyguardManager;
    private FingerprintHandler fingerprintHandler;
    private KeyStore keyStore;
    private KeyGenerator keyGenerator;
    private Cipher cipher;
    private FingerprintManagerCompat.CryptoObject cryptoObject;
    private static final String KEY_NAME = "key";

    // =============================================================================================
    // CONSTRUCTOR =================================================================================

    public FingerprintIdentifierManagerModule(ReactApplicationContext reactContext) {

        super(reactContext);
        this.reactContext = reactContext;

        fingerprintManager = FingerprintManagerCompat.from(reactContext);
        keyguardManager = (KeyguardManager) reactContext.getSystemService(Context.KEYGUARD_SERVICE);
        this.reactContext.addLifecycleEventListener(this);
    }

    // =============================================================================================
    // METHODS =====================================================================================

    @Override
    public String getName() {

        return "FingerprintIdentifierManagerModule";
    }

    @ReactMethod
    public void hasFingerprintSensor(Promise promise) {
        promise.resolve(hasFingerprintSensor() ? SUCCESS : TOUCHIDNOTAVAILABLE);
    }

    @Override
    public void onCatalystInstanceDestroy() {

        super.onCatalystInstanceDestroy();
        Log.d(TAG, "FingerprintIdentifierManagerModule onCatalystInstanceDestroy: ");
        cancelAuthentication(null);
    }

    public boolean hasFingerprintSensor() {

        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {

                // code of the application permission (granted or not)
                int appPermissionCode = ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.USE_FINGERPRINT);

                // code of the permission grated
                int permissionGratedCode = PackageManager.PERMISSION_GRANTED;

                // does exist hardware
                boolean isHardwareDetected = false;

                // fingerprintManager instance (some OS do not exist)
                FingerprintManager fingerprintManager = reactContext.getSystemService(FingerprintManager.class);
                if (fingerprintManager != null) {
                    isHardwareDetected = fingerprintManager.isHardwareDetected();
                    return (appPermissionCode == permissionGratedCode && isHardwareDetected);
                }

                return false;
            }

            return (FingerprintManagerCompat.from(reactContext).isHardwareDetected());
        } catch (Exception e) {
            Log.d(TAG, "hasFingerprintSensor: " + e.toString());
            return false;
        }
    }

    @ReactMethod
    public void authenticationFingerprintRequest(Promise promise) {

        cancelAuthentication(null);

        if (!hasFingerprintSensor()) {

            // if do not exist finger print sensor or API compatibility
            Log.d(TAG, "FingerprintIdentifierManagerModule no sensor");
            promise.resolve(TOUCHIDNOTAVAILABLE);

        } else if (!fingerprintManager.hasEnrolledFingerprints()) {

            // if do not exist finger print registered
            Log.d(TAG, "FingerprintIdentifierManagerModule no registered");
            promise.resolve(PASSCODENOTSET);

        } else if (!keyguardManager.isKeyguardSecure()) {

            // if lock screen security is not enabled
            Log.d(TAG, "FingerprintIdentifierManagerModule lock screen not enable");
            promise.resolve(NOLOCKSCREEN);

        } else {
            try {
                generateKey();
                if (initCipher()) {
                    cryptoObject = new FingerprintManagerCompat.CryptoObject(cipher);
                    fingerprintHandler = new FingerprintHandler(reactContext, fingerprintManager);
                    fingerprintHandler.startAuthentication(cryptoObject);
                    promise.resolve(START);
                } else {
                    promise.resolve(FAILED);
                }
            } catch (FingerprintException e) {
                e.printStackTrace();
                promise.resolve(FAILED);
            }
        }
    }

    @ReactMethod
    private void cancelAuthentication(Promise promise) {

        if (!hasFingerprintSensor()) {
            if (promise != null) {
                promise.resolve(false);
            }
        } else {
            boolean sucess = true;
            if (fingerprintHandler != null) {
                sucess = fingerprintHandler.endAuthentication();
            }
            fingerprintHandler = null;
            cryptoObject = null;
            cipher = null;
            if (promise != null) {
                promise.resolve(sucess);
            }
        }
    }

    private void generateKey() throws FingerprintException {

        try {
            keyStore = KeyStore.getInstance("AndroidKeyStore");
            keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
            keyStore.load(null);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                keyGenerator.init(new KeyGenParameterSpec.Builder(KEY_NAME, KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT).setBlockModes(KeyProperties.BLOCK_MODE_CBC).setUserAuthenticationRequired(true).setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_PKCS7).build());
            }
            keyGenerator.generateKey();
        } catch (KeyStoreException | NoSuchAlgorithmException | NoSuchProviderException | InvalidAlgorithmParameterException | CertificateException | IOException exc) {
            exc.printStackTrace();
            throw new FingerprintException(exc);
        }
    }

    @TargetApi(Build.VERSION_CODES.M)
    public boolean initCipher() {

        try {
            cipher = Cipher.getInstance(KeyProperties.KEY_ALGORITHM_AES + "/" + KeyProperties.BLOCK_MODE_CBC + "/" + KeyProperties.ENCRYPTION_PADDING_PKCS7);
        } catch (NoSuchAlgorithmException | NoSuchPaddingException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to get Cipher", e);
        }
        try {
            keyStore.load(null);
            SecretKey key = (SecretKey) keyStore.getKey(KEY_NAME, null);
            cipher.init(Cipher.ENCRYPT_MODE, key);
            return true;
        } catch (KeyPermanentlyInvalidatedException e) {
            e.printStackTrace();
            return false;
        } catch (NullPointerException e) {
            e.printStackTrace();
            return false;
        } catch (KeyStoreException | CertificateException | UnrecoverableKeyException | IOException | NoSuchAlgorithmException | InvalidKeyException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to init Cipher", e);
        }
    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {
        Log.d(TAG, "FingerprintIdentifierManagerModule onHostPause: ");
        cancelAuthentication(null);
    }

    @Override
    public void onHostDestroy() {
//         do not set state to destroyed, do not send an event. By the current implementation, the
//         catalyst instance is going to be immediately dropped, and all JS calls with it.
    }

    // =============================================================================================
    // SEND EVENT ==================================================================================

    // =============================================================================================
    // CLASS =======================================================================================

    private class FingerprintException extends Exception {

        public FingerprintException(Exception e) {

            super(e);
        }
    }
}
