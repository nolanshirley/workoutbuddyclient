import { Component } from 'react'; 
import { Button } from 'reactstrap'; 

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
                <Button onClick={this.logout}> Logout </Button>
            </div>
        )
    }
}

export default Logout; 