import { Component } from 'react'; 
import { Button } from 'reactstrap'; 
import '../Logout/Logout.css'; 

type logoutProps = {
    removeToken: () => void
}

class Logout extends Component <logoutProps, {}> {

    logout = (e: any) => {
        e.preventDefault()
        this.props.removeToken()
    }

    render () {
        return (
            <div>
                <Button onClick={this.logout} id="logoutButton"> Logout </Button>
            </div>
        )
    }
}

export default Logout; 