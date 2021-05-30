import React, {Component} from "react";
import AuthenticationService from '../../authorisation/AuthenticationService'
import {loginUser} from "../../api/index";
import GrayButton from "../base/buttons/GrayButton";

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: '',
            password: '',
            errorMessage: '',
        }

        this.handleChange = this.handleChange.bind(this);
    }

    // przechwytywanie zmian
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    // logowanie
    async login(event) {
        event.preventDefault();

        let message = ''
        if (!this.state.nickname || !this.state.password) {
            message = 'Enter login and password!';
            this.setState({errorMessage: message});
            return;
        }

        let response = await loginUser(this.state.nickname, this.state.password)

        if (response.status !== 200) {
            message = 'Invalid login or password!';
            this.setState({errorMessage: message});
            return;
        }

        AuthenticationService.loginSuccessful(this.state.nickname, response.id);
        this.props.history.push('/dashboard');
    }

    // przekierowanie do okna rejestracji
    register(event) {
        event.preventDefault();
        this.props.history.push('/register')
    }

    render() {
        return (
            <>
                <div className={'container-split-2 flex-center'}>
                    <div className={'split-2'}>
                        <h2 className={'error-message'}>{this.state.errorMessage}</h2>
                        <form className={'login-form'}>
                            <label htmlFor={'nickname'}
                                   className={'form-label'}
                            >
                                Nickname:
                            </label>
                            <input type={'text'}
                                   id={'nickname'}
                                   name={'nickname'}
                                   className={'form-input'}
                                   autoComplete={'off'}
                                   onChange={this.handleChange}
                            />

                            <label htmlFor="password"
                                   className={'form-label'}>
                                Password:
                            </label>
                            <input type="password"
                                   id={'password'}
                                   name={'password'}
                                   className={'form-input'}
                                   autoComplete={'off'}
                                   onChange={this.handleChange}
                            />

                            {/*<button className={'submit-button'}*/}
                            {/*        >*/}
                            {/*    Login*/}
                            {/*</button>*/}
                            <GrayButton txt={'Login'}
                                        onClick={(event) => this.login(event)}
                            />
                        </form>
                    </div>

                    <div className={'split-2'}>
                        <p>
                            Being our user we give you an access to create your own workout plans as well as a
                            possibility
                            to use works of professionals. You are only one click away from that :D
                        </p>
                        <GrayButton onClick={(event) => this.register(event)}
                                    text={'Register'}
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default LoginComponent;
