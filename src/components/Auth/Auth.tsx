import { Component } from 'react'; 

type token = {
    tokenUpdate: (arg1: string, arg2: string) => void // this is how you pass a function down to a child component 
}

type body = {
    email: any, 
    password: any, 
    username: any, 
    role: string
}

class Auth extends Component <token, body>  { // <token, {}> throw in the empty curly braces if no useStates have been declared yet 

    constructor(props: token) {
        super(props)
        this.state = {
            email: '', 
            password: '', 
            username: '', 
            role: 'user'
        }
    }
    
    handleSubmit = (e: any) => {
        e.preventDefault(); 
    
        const url = "http://localhost:3000/user/signup"
        const body = {
          email: this.state.email,
          password: this.state.password, 
          username: this.state.username,
          role: "user"
        } 
        fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json', 
          }, 
          body: JSON.stringify(body)
        })
        .then(r => r.json())
        .then(rObj => this.props.tokenUpdate(rObj.sessionToken, rObj.user.id) )
      }

    render () {
        return (
            <div>

            </div>
        )
    }
}

export default Auth; 