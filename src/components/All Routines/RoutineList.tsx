import {Component } from 'react'; 
import { Container, Row } from 'reactstrap'; 
import Favorites from '../All Routines/Favorites'; 

type props = {
    currentUser: () => void
}


class RoutineList extends Component <props, {}> {


    render () {
        return (
            <Container>
                <Row>
                    {}
                </Row>
            </Container>
        )
    }
}


export default RoutineList; 
