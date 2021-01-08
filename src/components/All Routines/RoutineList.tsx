import {Component } from 'react'; 
import { Container, Row } from 'reactstrap'; 
import Favorites from '../All Routines/Favorites'; 

type routineListProps = {
    currentUser: () => void, 
    routineArray: any
}

type routineListStates = {
    
}



class RoutineList extends Component <routineListProps, routineListStates> {

    constructor (props: routineListProps) {
        super (props) 
            this.state = {
                routineArray: []
            }  
    }

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
