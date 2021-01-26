import { Component } from 'react'; 
import { Button, Row } from 'reactstrap'; 
import '../Logout/Logout.css'; 

type logoutProps = {
    removeToken: () => void, 
    username: string
}

class Logout extends Component <logoutProps, {}> {

    logout = (e: any) => {
        e.preventDefault()
        this.props.removeToken()
    }


    render () {
        return (
            <div>
                <Row id="logoutRow">
                    <p id="usernameDisplay">
                        Hello, {this.props.username}  
                    </p>
                    <Button onClick={this.logout} id="logoutButton"> Logout </Button>
                </Row>
            </div>
        )
    }
}

export default Logout; 