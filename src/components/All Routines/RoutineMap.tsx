import {Component } from 'react'; 
import { Container, Row } from 'reactstrap'; 
import RoutineIndex from './RoutineIndex'; 

type routineListProps = {
    currentUser: () => void, 
    routineArray: any, 
    getRoutines: () => void, 
    sessionToken: any
}

type routineListStates = {
    // routineArray: any
}



class RoutineList extends Component <routineListProps, routineListStates> {

    constructor (props: routineListProps) {
        super (props) 
            this.state = {
                // routineArray: []
            }  
    }


    mapper = () => {
        return this.props.routineArray?.map((wbObj: any, i: any) => {
            return (
                <>
                    <RoutineIndex wb={wbObj} key={i}  currentUser={this.props.currentUser} getRoutines={this.props.getRoutines} sessionToken={this.props.sessionToken} />
                </>
            )
        })
    }

    render () {
        return (
            <Container>
                <Row>
                    {this.mapper()}
                </Row>
            </Container>
        )
    }
}


export default RoutineList;
