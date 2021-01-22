import { Component } from 'react'; 
import Logout from '../Logout/Logout'; 
import { Nav, NavItem, NavbarText, Navbar } from 'reactstrap'; 
import '../Navbar/Navbar.css'; 

type navbarProps = {
    removeToken: () => void, 
    username: string
}

class Navbars extends Component <navbarProps, {}> {


    render () {
        return (
            <div>
                <Navbar className="navbar" id="flexNavbar" expand="md">
                    <Nav>
                        <NavItem>   
                            <NavbarText>
                                {/* Workout Buddy */}
                            </NavbarText>
                        </NavItem>
                        <NavItem>
                            <Logout removeToken = {this.props.removeToken} username={this.props.username}/>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default Navbars; 