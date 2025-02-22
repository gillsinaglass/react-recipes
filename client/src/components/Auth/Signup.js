import React from 'react';
import { Mutation } from 'react-apollo'
import { SIGNUP_USER } from '../../queries';
import Error from '../Error'

const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
}

class Signup extends React.Component {

    state = {...initialState}

    clearState = () => {
        this.setState({...initialState})
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmit = (event, signupUser) => {
        event.preventDefault();
        signupUser().then(data => {
            console.log(data);
            this.clearState()
            
        });
    }

    validateForm = () => {
        const {username, email, password, passwordConfirmation} = this.state
        const isInvalid = !username || !password || !email || password !== passwordConfirmation
        return isInvalid
    }

    render() {
        const {username, email, password, passwordConfirmation} = this.state
        return (
            <div className="App">
            
                <h2 className="App">SignUp</h2>
                <Mutation mutation={SIGNUP_USER} variables={{username, email, password}}>
                    {(signupUser, {data, loading, error}) => {

                        return (
                        <form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>
                            <input type="text" name="username" placeholder="Username" onChange={this.handleChange} value={username}/>
                            <input type="email" name="email" placeholder="Email" onChange={this.handleChange} value={email}/>
                            <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={password}/>
                            <input type="password" name="passwordConfirmation" placeholder="Confirm Password" onChange={this.handleChange} value={passwordConfirmation}/>
                            <button type="submit" 
                            disabled={loading || this.validateForm()} 
                            className="button-primary">Submit
                            </button>
                            {error && <Error error={error}/>}
                        </form>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}

export default Signup;