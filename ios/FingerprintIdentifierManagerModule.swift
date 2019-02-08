//
//  FingerprintIdentifierManagerModule.swift
//
//  Created by Haroldo Shigueaki Teruya on 02/02/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import UIKit
import LocalAuthentication

@objc(FingerprintIdentifierManagerModule)
class FingerprintIdentifierManagerModule: NSObject {

  // ATTRIBUTES =============================================================================================================

  var bridge: RCTBridge!

  // METHODS ================================================================================================================

  @objc func hasFingerprintSensor(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {

    // 1. Create a authentication context
    let authenticationContext = LAContext()
    var error:NSError?
    
    // 2. Check if the device has a fingerprint sensor
    // If not, show the user an alert view and bail out!
    guard authenticationContext.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) else {
      print("No fingerprint sensor")
      resolve(false)
      return
    }

    print("Yes fingerprint sensor")
    resolve(true)
  }

  @objc func hasEnrolledFingerprints(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    
    // 1. Create a authentication context
    let authenticationContext = LAContext()
    var error:NSError?
    
    // 2. Check if the device has a fingerprint sensor
    // If not, show the user an alert view and bail out!
    guard authenticationContext.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) else {
      print("No fingerprint sensor")
      resolve(false)
      return
    }

    print("Yes fingerprint sensor")
    resolve(true)
  }

  @objc func authenticationFingerprintRequest(_ message: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {

    print("authenticationFingerprintRequest " + message)
    // 1. Create a authentication context
    let authenticationContext = LAContext()

    // 2. Check the fingerprint
    authenticationContext.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: message, reply: {

      [unowned self]
      (success, error) -> Void in

      if( success ) {
        print("fingerprint recognized")
        resolve(11)
      } else {
        // Check if there is an error
        if let error = error {
          let message = self.errorMessageForLAErrorCode(errorCode: (error as! LAError).code.rawValue)
          print(message)
          resolve(message)
        }
      }
    })
  }

  /**
   *
   */
  func errorMessageForLAErrorCode( errorCode : Int ) -> Int {
    var code = 9
    switch errorCode {
      case LAError.appCancel.rawValue:
        code = 0
        break
      case LAError.authenticationFailed.rawValue:
        code = 1
        break
      case LAError.invalidContext.rawValue:
        code = 2
        break
      case LAError.passcodeNotSet.rawValue:
        code = 3
        break
      case LAError.systemCancel.rawValue:
        code = 4
        break
      case LAError.touchIDLockout.rawValue:
        code = 5
        break
      case LAError.touchIDNotAvailable.rawValue:
        code = 6
        break
      case LAError.userCancel.rawValue:
        code = 7
        break
      case LAError.userFallback.rawValue:
        code = 8
        break
      default:
        code = 9
    }
    return code
  }
}
