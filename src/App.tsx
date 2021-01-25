import React from 'react';
import Auth from './components/Auth/Auth'; 
import Navbar from './components/Navbar/Navbar'; 
import Routines from './components/All Routines/Routines';
import './App.css'; 

type appState = {
  sessionToken: string, 
  currentUser: string, 
  username: string, 
  isAdmin: boolean
}

class App extends React.Component <{}, appState>{

  state = {
    sessionToken: '', 
    currentUser: '', 
    username: '', 
    isAdmin: false
  }

  componentDidMount() { 
    const token = localStorage.getItem('token')
    if (token) {
      this.setState({ sessionToken: token }) 
    }

    this.getUsername(); 
    this.userIdentification(); // added this to call the function for a user to get their userId
    this.adminCheck();
  }

  getUsername = () => {
    const userName = localStorage.getItem('username')
    if (userName) {
      this.setState({username: userName})
    }
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

  adminCheck = () => {
      this.setState({isAdmin: true })
  }



    render () {
      return (
        <div className="App">
          <div className="title">
            <h1 className="titleText"> Workout Buddy </h1>
          </div>
          {
            !localStorage.getItem('token') ? 
            <p id="loginPara">
            Welcome to Workout Buddy, I created this application to connect YOU with other individuals to share your own Workout Routines and allow you to comment and make suggestions on other Routines. I hope you enjoy!
          </p> : null 
          }
          { !localStorage.getItem('token') ? <Auth tokenUpdate={this.tokenUpdate} adminCheck={this.adminCheck}/> : <div>
            <Navbar removeToken={this.removeToken} username={this.state.username}/> 
            <Routines currentUser={this.userIdentification} sessionToken={this.state.sessionToken} adminCheck={this.state.isAdmin}/>
            </div> }
        </div>
      )
  }
}


export default App;
