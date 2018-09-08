import React from 'react';
import {Mutation} from 'react-apollo';
import {SIGNUP_USER} from '../../queries';
import {withRouter} from 'react-router-dom';

const inititialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
} 
class Signup extends React.Component {
  state = {...inititialState};

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }

  clearState = () => {
    this.setState({...inititialState})
  }

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(async ({data}) => {
      console.log(data)
      localStorage.setItem('token: ', data.signupUser.token);

      await this.props.refetch();
      
      this.clearState();
      this.props.history.push('/');
    });
  }

  validateForm = () => {
    const {username, email, password, passwordConfirmation} = this.state;
    const isInvalid = !username || !email || !password
    || password !== passwordConfirmation;

    return isInvalid;
  }

  render() {
    const {username, email, password, passwordConfirmation} = this.state;
    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation mutation={SIGNUP_USER} variables={{ username, email, password, passwordConfirmation }}>
          {(signupUser, {data, loading, error}) => {
            return (
              <form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>
              <input value={username} onChange={(event) => this.handleChange(event)} type="text" name="username" placeholder="Username" />
              <br/>
              <input value={email} onChange={(event) => this.handleChange(event)} type="email" name="email" placeholder="Email adress" />
              <br/>
              <input value={password} onChange={(event) => this.handleChange(event)} type="password" name="password" placeholder="Password" />
              <br/>
              <input value={passwordConfirmation} onChange={(event) => this.handleChange(event)} type="password" name="passwordConfirmation" placeholder="Confirm Password" />
              <br/>
              <button 
                type="submit" 
                className="button-primary" 
                disabled={loading || this.validateForm()}
              >
                Submit
              </button>

              {error && <p>{error.message}</p>}
            </form>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default withRouter(Signup);