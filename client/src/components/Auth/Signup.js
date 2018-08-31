import React from 'react';

class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const {username, email, password, passwordConfirmation} = this.state;
    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <form className="form">
          <input value={username} onChange={(event) => this.handleChange(event)} type="text" name="username" placeholder="Username" />
          <br/>
          <input value={email} onChange={(event) => this.handleChange(event)} type="email" name="email" placeholder="Email adress" />
          <br/>
          <input value={password} onChange={(event) => this.handleChange(event)} type="password" name="password" placeholder="Password" />
          <br/>
          <input value={passwordConfirmation} onChange={(event) => this.handleChange(event)} type="password" name="passwordConfirmation" placeholder="Confirm Password" />
          <br/>
          <button type="submit" className="button-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default Signup;