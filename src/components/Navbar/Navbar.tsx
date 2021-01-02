import { Component } from 'react'; 
import Logout from '../Logout/Logout'; 

type clearToken = {
    removeToken: () => void
}

class Navbar extends Component <clearToken, {}> {

    constructor(props: clearToken) {
        super(props)

    }

    render () {
        return (
            <div>
                <Logout removeToken={this.props.removeToken}/>
            </div>
        )
    }
}

export default Navbar; 