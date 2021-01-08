import {Component } from 'react'; 
import { Container, Row } from 'reactstrap'; 
import RoutineIndex from './RoutineIndex'; 

type routineListProps = {
    currentUser: () => void, 
    routineArray: any, 
    routineFetch: () => void
}

type routineListStates = {
    routineArray: any
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
                    {this.state.routineArray.map((wbObj: any, i: any) => <RoutineIndex wb={wbObj} key={i}  currentUser={this.props.currentUser}  routineFetch={this.props.routineFetch}/>)}
                </Row>
            </Container>
        )
    }
}


export default RoutineList;
