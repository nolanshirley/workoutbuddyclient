import { Component } from 'react'; 
import { Button } from 'reactstrap'; 

type clearToken = {
    removeToken: () => void
}

class Logout extends Component <clearToken, {}> {

    constructor(props: clearToken) {
        super(props)

    }

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