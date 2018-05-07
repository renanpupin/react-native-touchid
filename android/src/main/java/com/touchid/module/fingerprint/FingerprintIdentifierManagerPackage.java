package com.touchid.module.fingerprint;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Teruya on 05/01/2018.
 */

public class FingerprintIdentifierManagerPackage implements ReactPackage
{
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext)
    {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new FingerprintIdentifierManagerModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext)
    {
        return Collections.emptyList();
    }
}
