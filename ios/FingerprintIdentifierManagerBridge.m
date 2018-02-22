//
//  FingerprintIdentifierManagerModule.m
//
//  Created by Haroldo Shigueaki Teruya on 02/02/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

// FingerprintIdentifierManagerBridge.m
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(FingerprintIdentifierManagerModule, NSObject)

RCT_EXTERN_METHOD(authenticationFingerprintRequest: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(hasFingerprintSensor: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end
