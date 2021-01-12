import { Component } from 'react'; 
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Form, Label, Input } from 'reactstrap'; 

type authProps = {
    tokenUpdate: (arg1: string, arg2: string) => void // this is how you pass a function down to a child component 
}

type authState = {
    email: string, 
    password: any, 
    username: any, 
    role: string, 
    modal: boolean
}

class Auth extends Component <authProps, authState>  { // <token, {}> use empty curly braces if no states or props have been declared yet 

    constructor(props: authProps) {
        super(props)
        this.state = {
            email: '', 
            password: '', 
            username: '', 
            role: 'user', 
            modal: false
        }
    }
    
    funcSignup = (e: any) => {
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

      funcLogin = (e: any) => {
          e.preventDefault(); 

          const url = 'http://localhost:3000/user/login'
          const body = {
              email: this.state.email, 
              password: this.state.password, 
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
          .then(rObj => this.props.tokenUpdate(rObj.sessionToken, rObj.user.id))
      }

      signupToggle = () => {
        this.setState(state => ({ modal: !this.state.modal})) // you want to make key value pairs within class components and you can set multiple states within setState
      }


    render () {
        return (
            <div>
                <Button id="btn-primary" onClick={this.signupToggle} type="button"> Login </Button>
                <Modal isOpen={this.state.modal} className="createModal">
                        <h1> Login </h1>
                        <Form>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="email"> Email </Label>
                                    <br />
                                    <Input value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password"> Password </Label>
                                    <br />
                                    <Input value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
                                </FormGroup>
                            </ModalBody>
                                {/* <Button id="btn-primary" onClick={this.funcLogin} type="button"> Submit </Button> */}
                        </Form>
                        <div>
                            <h1> Signup Here! </h1>
                        </div>
                        <Form>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="email"> Email </Label>
                                    <br />
                                    <Input value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                                </FormGroup>  
                                <FormGroup>
                                    <Label htmlFor="password"> Password </Label>
                                    <br />
                                    <Input value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
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
                                <Button id="btn-primary" onClick={this.funcSignup}>Submit</Button>
                            </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Auth; 