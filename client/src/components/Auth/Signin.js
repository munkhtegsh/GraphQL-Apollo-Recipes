import React from 'react';
import {Mutation} from 'react-apollo';
import {SIGNIN_USER} from '../../queries';
import {withRouter} from 'react-router-dom';

const inititialState = {
  username: '',
  password: '',
} 
class Signin extends React.Component {
  state = {...inititialState}

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }

  clearState = () => {
    this.setState({...inititialState})
  }

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(async ({data}) => {
      console.log(data);

      localStorage.setItem('token', data.signinUser.token);

      await this.props.refetch();

      this.clearState();
      this.props.history.push('/');

    });


  }

  validateForm = () => {
    const {username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  }

  render() {
    const {username, password} = this.state;
    return (
      <div className="App">
        <h2 className="App">Signin</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, {data, loading, error}) => {
            return (
              <form className="form" onSubmit={event => this.handleSubmit(event, signinUser)}>
              <input value={username} onChange={(event) => this.handleChange(event)} type="text" name="username" placeholder="Username" />
              <br/>
              <input value={password} onChange={(event) => this.handleChange(event)} type="password" name="password" placeholder="Password" />
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

export default withRouter(Signin);