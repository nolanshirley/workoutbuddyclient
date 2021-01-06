import { Component } from 'react'; 
import Logout from '../Logout/Logout'; 
import { Nav, NavItem, NavbarText, Navbar } from 'reactstrap'; 

type clearToken = {
    removeToken: () => void
}

class Navbars extends Component <clearToken, {}> {

    constructor(props: clearToken) {
        super(props)
    }

    render () {
        return (
            <div>
                <Navbar className="navbar" expand="md">
                    <Nav>
                        <NavItem>   
                            <NavbarText>
                                Workout Buddy
                            </NavbarText>
                        </NavItem>
                        <NavItem>
                            <Logout removeToken = {this.props.removeToken}/>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default Navbars; 