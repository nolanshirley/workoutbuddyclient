import { Component } from 'react'; 
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Form, Label, Input } from 'reactstrap'; 
import '../Auth/Auth.css'; 

type authProps = {
    tokenUpdate: (arg1: string, arg2: string, arg3: string) => void, // this is how you pass a function down to a child component 
    adminCheck: () => void
}

type authState = {
    loginemail: string, 
    signemail: string
    loginpassword: any, 
    signpassword: any,
    username: any, 
    role: string, 
    modal: boolean
}

class Auth extends Component <authProps, authState>  { // <token, {}> use empty curly braces if no states or props have been declared yet 

    constructor(props: authProps) {
        super(props)
        this.state = {
            loginemail: '', 
            loginpassword: '',
            signemail: '', 
            signpassword: '',
            username: '', 
            role: 'user', 
            modal: false
        }
    }

    funcSignup = (e: any) => {
        e.preventDefault(); 
    
        const url = "http://localhost:3000/user/signup"
        const body = {
          email: this.state.signemail,
          password: this.state.signpassword, 
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
        .then(rObj => {this.props.tokenUpdate(rObj.sessionToken, rObj.user.id, rObj.user.username);
            if (rObj.user.role === "admin") {
                this.props.adminCheck()
            } 
        })
      }

      funcLogin = (e: any) => {
          e.preventDefault(); 

          const url = 'http://localhost:3000/user/signin'
          const body = {
              email: this.state.loginemail, 
              password: this.state.loginpassword, 
              role: 'user'
          }
          fetch(url, {
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json'
              }, 
              body: JSON.stringify(body)
          })
          .then(r => r.json())
          .then(rObj => {
            console.log(rObj)  
            this.props.tokenUpdate(rObj.sessionToken, rObj.user.id, rObj.user.username)
            if (rObj.user.role === "admin") {
                this.props.adminCheck()
            } 
        })
      }

      signupToggle = () => {
        this.setState(state => ({ modal: !this.state.modal})) // you want to make key value pairs within class components and you can set multiple states within setState
      }


    render () {
        return (
            <div className="authDiv">
                <Button id="btn-primary" className="btn-primary" onClick={this.signupToggle} type="button"> Login </Button>
                <Modal isOpen={this.state.modal} className="createModal" id="modalCreate">
                        <h1 id="modalHeader"> Login </h1>
                        <Form id="loginForm1">
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="email"> Email </Label>
                                    <br />
                                    <Input value={this.state.loginemail} onChange={e => this.setState({loginemail: e.target.value})}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password"> Password </Label>
                                    <br />
                                    <Input value={this.state.loginpassword} type="password" onChange={e => this.setState({loginpassword: e.target.value})}/>
                                </FormGroup>
                            </ModalBody>
                                <Button id="loginButton" onClick={this.funcLogin} type="button"> Login </Button>
                            <br />
                        </Form>
                        <div>
                            <h1 id="signupHeader"> Signup Below </h1>
                        </div>
                        <Form>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="email"> Email </Label>
                                    <br />
                                    <Input value={this.state.signemail} onChange={e => this.setState({signemail: e.target.value})}/>
                                </FormGroup>  
                                <FormGroup>
                                    <Label htmlFor="password"> Password </Label>
                                    <br />
                                    <Input value={this.state.signpassword} onChange={e => this.setState({signpassword: e.target.value})}/>
                                </FormGroup> 
                                <FormGroup>
                                    <Label htmlFor="username"> Username </Label>
                                    <br />
                                    <Input value={this.state.username} onChange={e => this.setState({username: e.target.value})} />
                                </FormGroup>   
                            </ModalBody> 
                        </Form>
                            <br />
                            <ModalFooter>
                                <Button type="button" id="authCancel" onClick={this.signupToggle}> Cancel </Button>
                                <Button id="btn-primary" className="authSubmit"  onClick={this.funcSignup}>Submit</Button>
                            </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Auth; 

