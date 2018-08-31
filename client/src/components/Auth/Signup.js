import React from 'react';

class Signup extends React.Component {
  render() {
    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <form className="form">
          <input type="text" name="username" placeholder="Username" />
          <br/>
          <input type="email" name="email" placeholder="Email adress" />
          <br/>
          <input type="password" name="password" placeholder="Password" />
          <br/>
          <input type="password" name="passwordConfirmation" placeholder="Confirm Password" />
          <br/>
          <button type="submit" className="button-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default Signup;