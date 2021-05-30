import React, {Component} from "react";
import {registerUser} from "../../api/index";
import GrayButton from "../base/buttons/GrayButton";

class RegisterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: '',
            nickname: '',
            password1: '',
            password2: '',
            height: 0,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async register(event) {
        event.preventDefault()
        let errorMessage = ''

        if (this.state.nickname === '')
            errorMessage += 'Please enter the nickname! '
        if (this.state.password1 === '')
            errorMessage += 'Please enter the password! '
        if (this.state.password2 === '')
            errorMessage += 'Please enter the password confirmation! '
        if (this.state.height === '')
            errorMessage += 'Please enter the height! '
        if (this.state.password1 !== this.state.password2)
            errorMessage += 'Different passwords! '

        if (errorMessage !== '') {
            this.setState({errorMessage: errorMessage})
            return
        }

        let response = await registerUser(this.state.nickname, this.state.password1, this.state.height)

        if (response.status !== 200) {
            this.setState({errorMessage: 'User exist or invalid data!'})
            return
        }

        this.props.history.push('/login', {nickname: this.state.nickname})
    }

    render() {
        return (
            <div className={'container-split-2 flex-center'}>
                {/*przejscie do logowania*/}
                <div className={'split-2'}>
                    <p>
                        If you already have an account, go back to the login menu to access all the functionality of the
                        application
                    </p>
                    <button className={'submit-button'}
                            onClick={() => this.props.history.push('/login')}>
                        Login
                    </button>
                </div>

                {/*rejestracja*/}
                <div className={'split-2'}>
                    <h2 className={'error-message'}>
                        {this.state.errorMessage}
                    </h2>

                    <form className={'login-form'}
                          onSubmit={(event) => this.register(event)}
                    >
                        <label htmlFor={'nickname'}
                               className={'form-label'}>
                            Nickname:
                        </label>
                        <input type={'text'}
                               name={'nickname'}
                               id={'nickname'}
                               className={'form-input'}
                               autoComplete={'off'}
                               onChange={this.handleChange}
                        />

                        <label htmlFor={'password1'}
                               className={'form-label'}
                        >
                            Password:
                        </label>
                        <input type={'password'}
                               name={'password1'}
                               id={'password1'}
                               className={'form-input'}
                               autoComplete={'off'}
                               onChange={this.handleChange}
                        />

                        <label htmlFor={'password2'}
                               className={'form-label'}
                        >
                            Confirmed Password:
                        </label>
                        <input type={'password'}
                               name={'password2'}
                               id={'password2'}
                               className={'form-input'}
                               autoComplete={'off'}
                               onChange={this.handleChange}
                        />

                        <label htmlFor={'password1'}
                               className={'form-label'}
                        >
                            Height:
                        </label>

                        <input type={'number'}
                               name={'height'}
                               id={'height'}
                               className={'form-input'}
                               autoComplete={'off'}
                               onChange={this.handleChange}
                        />
                        <GrayButton type={'submit'}
                                    text={'Register'}
                        />
                        {/*<button*/}
                        {/*    className={'submit-button'}>*/}
                        {/*    Register*/}
                        {/*</button>*/}
                    </form>
                </div>
            </div>
        )
    }
}

export default RegisterComponent;
