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
} from 'react-native';

//==========================================================================
/**
 * @class
 * @classdesc
 */
class TouchIDModal extends Component {

    //==========================================================================
    // GLOBAL VARIABLES

    Identification = {}
    Idle = {}
    Valid = {}
    Invalid = {}

    /**
     * Creates a instance of TouchIDModal.
     */
    constructor(props) {
        super(props);

        console.log("TouchIDManager", "TouchIDModal constructor");

        this.Idle = {
            ICON:               "md-finger-print",
            BACKGROUND_COLOR:   "rgba(96, 125, 138, 1)",
            MESSAGE:                "Toque no sensor.",
        }
        Object.freeze(this.Idle);

        this.Valid = {
            ICON: "md-checkmark",
            BACKGROUND_COLOR: "rgba(0, 149, 136, 1)",
            MESSAGE: "Autenticação bem sucedida!",
        }
        Object.freeze(this.Valid);

        this.Invalid = {
            ICON:               "md-close",
            BACKGROUND_COLOR:   "rgba(255, 0, 0, 1)",
            MESSAGE:            "Tente novamente.",
        }
        Object.freeze(this.Invalid);

        this.Identification = {
            Idle: this.Idle,
            Valid: this.Valid,
            Invalid: this.Invalid,
        }

        this.state = {
            icon:            this.Identification.Idle.ICON,
            backgroundColor: this.Identification.Idle.BACKGROUND_COLOR,
            message:         this.Identification.Idle.MESSAGE,
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

    async setType (type) : void {

        console.log("TouchIDManager", "setType");
        this.setState({
            icon:               type.ICON,
            backgroundColor:    type.BACKGROUND_COLOR,
            message:            type.MESSAGE,
        });
    }

    show() : void {

        console.log("TouchIDManager", "show");
        this.setState({visible: true});
    }

    //==========================================================================
    // render

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={false}
                // visible={this.props.visible}
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
                            paddingBottom: 8,
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
                                Acesse o FalaFreud
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
                            <TouchableOpacity
                                visible={this.state.noActionVisible}
                                onPress={() => {
                                    this.props.onCanceled();
                                }}
                                style = {{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // backgroundColor: 'magenta',
                                    paddingVertical: 10,
                                    paddingHorizontal: 4,
                                }}
                                >
                                <Text
                                    style = {{
                                        fontWeight: 'bold',
                                        color: '#87C4ED',
                                        fontSize: 18,
                                    }}
                                    >
                                    Cancelar
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
