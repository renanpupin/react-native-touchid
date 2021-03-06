/**
 * @author Haroldo Shigueaki Teruya <haroldo.s.teruya@gmail.com>
 * @version 1.0
 */

//==========================================================================
// IMPORTS

import React, {Component} from 'react';
import {TouchIDManager} from 'react-native-touchid';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    Modal,
    Text,
    TouchableHighlight,
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';

//==========================================================================
/**
 * @class
 * @classdesc
 */
class TouchIDModal extends Component {

    //==========================================================================
    // GLOBAL VARIABLES

    State = {}

    AuthenticationIdle = {}
    AuthenticationValid = {}
    AuthenticationInvalid = {}
    AuthenticationCanceled = {}
    EnableIdle = {}
    EnableValid = {}
    EnableInvalid = {}
    EnableCanceled = {}

    primaryTitle = "Acesse o FalaFreud";
    secondaryTitle = "Habilite TouchID";
    loginText = "FAZER LOGIN";
    cancelText = "CANCELAR";

    /**
     * Creates a instance of TouchIDModal.
     */
    constructor(props) {
        super(props);

        console.log("TouchIDManager", "TouchIDModal constructor");

        this.AuthenticationIdle = {
            TITLE:              this.primaryTitle,
            ICON:               "md-finger-print",
            BACKGROUND_COLOR:   "rgba(96, 125, 138, 1)",
            MESSAGE:            "Toque no sensor.",
            ACTION:             this.loginText,
        }

        this.AuthenticationValid = {
            TITLE:              this.primaryTitle,
            ICON:               "md-checkmark",
            BACKGROUND_COLOR:   "rgba(0, 149, 136, 1)",
            MESSAGE:            "Autenticação bem sucedida!",
            ACTION:             "",
        }

        this.AuthenticationInvalid = {
            TITLE:              this.primaryTitle,
            ICON:               "md-finger-print",
            BACKGROUND_COLOR:   "rgba(255, 0, 0, 1)",
            MESSAGE:            "Tente novamente.",
            ACTION:             this.loginText,
        }

        this.AuthenticationCanceled = {
            TITLE:              this.primaryTitle,
            ICON:               "md-close",
            BACKGROUND_COLOR:   "rgba(255, 0, 0, 1)",
            MESSAGE:            "Autenticação cancelado.",
            ACTION:             this.loginText,
        }

        this.EnableIdle = {
            TITLE:              this.secondaryTitle,
            ICON:               "md-finger-print",
            BACKGROUND_COLOR:   "rgba(96, 125, 138, 1)",
            MESSAGE:            "Toque no sensor.",
            ACTION:             "Cancelar",
        }

        this.EnableValid = {
            TITLE:              this.secondaryTitle,
            ICON:               "md-finger-print",
            BACKGROUND_COLOR:   "rgba(0, 149, 136, 1)",
            MESSAGE:            "TouchID habilitado!",
            ACTION:             "",
        }

        this.EnableInvalid = {
            TITLE:              this.secondaryTitle,
            ICON:               "md-finger-print",
            BACKGROUND_COLOR:   "rgba(255, 0, 0, 1)",
            MESSAGE:            "Tente novamente.",
            ACTION:             this.cancelText,
        }

        this.EnableCanceled = {
            TITLE:              this.secondaryTitle,
            ICON:               "md-close",
            BACKGROUND_COLOR:   "rgba(255, 0, 0, 1)",
            MESSAGE:            "Autenticação cancelado.",
            ACTION:             this.cancelText,
        }

        Object.freeze(this.AuthenticationIdle);
        Object.freeze(this.AuthenticationValid);
        Object.freeze(this.AuthenticationInvalid);
        Object.freeze(this.AuthenticationCanceled);
        Object.freeze(this.EnableIdle);
        Object.freeze(this.EnableValid);
        Object.freeze(this.EnableInvalid);
        Object.freeze(this.EnableCanceled);

        this.State = {
            AuthenticationIdle: this.AuthenticationIdle,
            AuthenticationValid: this.AuthenticationValid,
            AuthenticationInvalid: this.AuthenticationInvalid,
            AuthenticationCanceled: this.AuthenticationCanceled,
            EnableIdle: this.EnableIdle,
            EnableInvalid: this.EnableInvalid,
            EnableValid: this.EnableValid,
            EnableCanceled: this.EnableCanceled,
        }

        this.state = {
            title:           this.State.AuthenticationIdle.TITLE,
            icon:            this.State.AuthenticationIdle.ICON,
            backgroundColor: this.State.AuthenticationIdle.BACKGROUND_COLOR,
            message:         this.State.AuthenticationIdle.MESSAGE,
            action:          this.State.AuthenticationIdle.ACTION,
            visible:         false,
        }
    }

    //==========================================================================
    // METHODS

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    setType (type) : void {

        console.log("TouchIDManager", "TouchIDModal setType");
        this.setState({
            title:              type.TITLE,
            icon:               type.ICON,
            backgroundColor:    type.BACKGROUND_COLOR,
            message:            type.MESSAGE,
            action:             type.ACTION,
        });
    }

    show() : void {

        console.log("TouchIDManager", "TouchIDModal show");
        this.setType(this.AuthenticationIdle);
        this.setState({visible: true});
    }

    close() : void {

        console.log("TouchIDManager", "TouchIDModal close");
        this.setState({visible: false});
    }

    //==========================================================================
    // render

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.visible}
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
                            borderRadius: 3,
                            backgroundColor: "#fff",
                            elevation: 10,
                            width: '90%',
                            maxWidth: '90%',
                            minHeight: 240,
                            paddingHorizontal: 24,
                            paddingTop: 24,
                            paddingBottom: 16,
                        }}
                        >
                        <View
                            style={{
                                justifyContent: 'center',
                                flexGrow: 1,
                            }}
                            >
                            <Text
                                style = {{
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    color: 'black'
                                }}
                                >
                                {this.state.title}
                            </Text>
                        </View>
                        <View
                            style={{
                                paddingVertical: 10,
                                flexGrow: 1,
                                justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: 16,}}>
                                Por favor passe o dedo no sensor de impressão digital.
                            </Text>
                        </View>
                        <View
                            style={{
                                flexGrow: 2,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            >
                            <View
                                style = {{
                                    height: 50,
                                    width: 50,
                                    marginRight: 16,
                                    backgroundColor: this.state.backgroundColor,
                                    borderRadius: 50/2,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                >
                                <Icon
                                    name={this.state.icon}
                                    size={30}
                                    color={'white'}/>
                            </View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    flex: 1,
                                    color: '#ccc',
                                }}
                                >
                                {this.state.message}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                            >
                            {this._renderAction()}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    _renderAction() {
        if ( this.state.action != "" ) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.props.onActionPressed();
                    }}
                    style = {{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10,
                    }}
                    >
                    <Text
                        style = {{
                            fontWeight: 'bold',
                            color: '#87C4ED',
                            fontSize: 18,
                        }}
                        >
                        {this.state.action}
                    </Text>
                </TouchableOpacity>
            );
        }
    }
}

//==========================================================================
// EXPORTS

/**
 * @module TouchIDModal object
 */
export default TouchIDModal;
