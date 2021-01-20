import React from 'react';
import Auth from './components/Auth/Auth'; 
import Navbar from './components/Navbar/Navbar'; 
import Routines from './components/All Routines/Routines';
import './App.css'; 

type appState = {
  sessionToken: string, 
  currentUser: string, 
  username: string
}

class App extends React.Component <{}, appState>{

  state = {
    sessionToken: '', 
    currentUser: '', 
    username: ''
  }

  componentDidMount() { 
    const token = localStorage.getItem('token')
    if (token) {
      this.setState({ sessionToken: token }) 
    }
    this.userIdentification(); // added this to call the function for a user to get their userId
  }

  userIdentification = () => {
    const userId = localStorage.getItem('userID'); 
    if(userId) {
      this.setState({ currentUser: userId})
    }
  }

// making this an arrow function below allowed me to remove the .bind before I coded sessionToken 
  tokenUpdate = (newToken: string, userId: string, username: string) => { // do I need a lifecycle here?
    this.setState({sessionToken: newToken}) 
    localStorage.setItem('token', newToken); 
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);  
  }

  removeToken = () => {
    this.setState({sessionToken: ''}); 
    this.setState({currentUser: ''});
    this.setState({username: ''}) 
    localStorage.clear(); 
  }

    render () {
      return (
        <div className="App">
          <div className="title">
            <h1 className="titleText"> Workout Buddy </h1>
          </div>
          { !localStorage.getItem('token') ? <Auth tokenUpdate={this.tokenUpdate} /> : <div>
            <Navbar removeToken={this.removeToken} /> 
            <Routines currentUser={this.userIdentification} sessionToken={this.state.sessionToken} />
            </div> }
        </div>
      )
  }
}


export default App;
