/**
 * @author Haroldo Shigueaki Teruya <haroldo.s.teruya@gmail.com>
 * @version 1.0
 */

//==========================================================================
// IMPORTS

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    Modal,
    Text,
    TouchableHighlight,
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated
} from 'react-native';

//==========================================================================
/**
 * @class
 * @classdesc
 */
class TouchIDModal extends Component {

    //==========================================================================
    // GLOBAL VARIABLES

    /**
     * Creates a instance of TouchIDModal.
     */
    constructor(props) {
        super(props);

        console.log("TouchIDModal", "TouchIDModal constructor");
        this.state = {
            fadeAnim: new Animated.Value(0),
        }
        this._handleCancelFingerprintIdentification = this._handleCancelFingerprintIdentification.bind(this);
    }

    //==========================================================================
    // METHODS

    _handleCancelFingerprintIdentification () {

        console.log("TouchIDManager", "_handleCancelFingerprintIdentification");
        // this.props.toggleVisible();

        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 1000,
        }).start();
    }

    //==========================================================================
    // render

    render() {
        let { fadeAnim } = this.state;

        return (
            <Modal
                animationType="fade"
                transparent={false}
                visible={this.props.visible}
                transparent={true}
                onRequestClose={() => {}}
                >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.4)'
                    }}
                    >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            elevation: 10
                        }}
                        >
                        <View
                            style={{
                                paddingTop: 24,
                                paddingLeft: 24,
                                paddingRight: 24,
                                paddingBottom: 16,
                                backgroundColor: 'yellow',
                            }}
                            >
                            <Text
                                style = {{
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    color: 'black'
                                }}
                                >
                                Login
                            </Text>
                            <Text
                                style = {{
                                    fontSize: 18,
                                    marginTop: 20,
                                }}
                                >
                                Confirme biometria para continuar
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 28,
                                    alignItems: 'center'
                                }}
                                >
                                <View
                                    style = {{
                                        height: 40,
                                        width: 40,
                                        marginRight: 16,
                                        backgroundColor: 'rgba(96, 125, 138, 1)',
                                        borderRadius: 40/2,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    >

                                    <Animated.View style={{ opacity: fadeAnim, }}>
                                        <Icon
                                            name = {"md-finger-print"}
                                            size = {24}
                                            color={'white'}/>
                                    </Animated.View>
                                </View>
                                <Text style = {{fontSize: 16}}>
                                    Toque no sensor
                                </Text>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                paddingTop: 8,
                                paddingRight: 8,
                                paddingBottom: 8,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                height: 52,
                                backgroundColor: 'green',
                            }}
                            >
                            <TouchableOpacity
                                onPress={this.props.toggleVisible}
                                style = {{
                                    backgroundColor: 'red',
                                    height: 36,
                                    marginRight: 8,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }}
                                >
                                <Text
                                    style = {{
                                        fontWeight: 'bold',
                                        color: '#87C4ED',
                                        fontSize: 18,
                                    }}
                                    >
                                    USAR SENHA
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this._handleCancelFingerprintIdentification()
                                }}
                                style = {{
                                    height: 36,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }}
                                >
                                <Text
                                    style = {{
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                    }}
                                    >
                                    CANCELAR
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({

});

//==========================================================================
// EXPORTS

/**
 * @module TouchIDModal object
 */
export default TouchIDModal;
