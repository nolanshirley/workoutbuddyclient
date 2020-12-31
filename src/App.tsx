import React from 'react';
import Auth from './components/Auth/Auth'; 
import Navbar from './components/Navbar/Navbar'; 
import Routine from './components/Routine/Routines'; 
import All from './components/All Routines/Favorites'; 


class App extends React.Component {

  state = {
    sessionToken: undefined, 
    currentUser: undefined
  }
  
  componentDidMount() { 
    const token = localStorage.getItem('token')
    if (token) {
      this.setState.bind({ sessionToken: token }) // why do I need to bind this? 
    }
  }

  userIdentification = () => {
    const userId = localStorage.getItem('userID'); 
    if(userId) {
      this.setState({ currentUser: userId})
    }
  }

// making this an arrow function below allowed me to remove the .bind before I coded sessionToken 
  tokenUpdate = (newToken: string, userId: string) => { // do I need a lifecycle here?
    this.setState({sessionToken: newToken}) 
    localStorage.setItem('token', newToken); 
    localStorage.setItem('userId', userId); 
  }

  removeToken = () => {
    this.setState({sessionToken: undefined}); 
    this.setState({currentUser: undefined}); 
    localStorage.clear(); 
  }

    render () {
      return (
        <div className="App">
          { !this.state.sessionToken ? <Auth tokenUpdate={this.tokenUpdate} /> : <div>
            <Navbar removeToken={this.removeToken} /> 
            <Routine currentUser={this.state.currentUser} /> 
            <All currentUser={this.state.currentUser} sessionToken={this.state.sessionToken} />
            </div>}
        </div>
      )
  }
}




export default App;
