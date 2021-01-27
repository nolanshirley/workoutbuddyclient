import { Component } from 'react'; 
import { Button, Modal } from 'reactstrap'; 
import CreateRoutine from './CreateRoutine';
import RoutineMap from './RoutineMap'; 
import '../All Routines/Routines.css'; 

type routinesProps = { 
    currentUser: () => void, 
    sessionToken: any, 
    adminCheck: boolean
}

type routinesState = {
    modal: boolean, 
    routine: any
}

class Routines extends Component < routinesProps, routinesState > {

    constructor(props: routinesProps) {
        super(props)
        this.state = {
            modal: false, 
            routine: []
        }
    }

    toggle = () => {
        this.setState(state => ({ modal: !this.state.modal}))
    }

    componentDidMount() {
        this.getRoutines()
    }


    getRoutines = () => {
        fetch('http://localhost:3000/routine/', {
            method: 'GET'
        })
        .then(r => r.json())
        .then(rArr => this.setState({ routine: rArr}))
    }

    adminUserSearch = async () => {
        if (this.props.adminCheck === true) {
            const url = `http://localhost:3000/user/adminSearch/username`
            await fetch(url, {
            method: 'GET', 
            headers: {
                'Authorization': this.props.sessionToken
                }
            })
            .then(r => r.json())
            .then(rObj => console.log(rObj))
            this.getRoutines();
        } 
    }

    render () {
        return (
            <div className="createRoutineDiv">
                <Button type="button" className="createRoutineButton" onClick={this.toggle}> Create A Routine </Button>
                <Modal className="routineModal" isOpen={this.state.modal}>
                    <CreateRoutine toggle={this.toggle} getRoutines={this.getRoutines} sessionToken={this.props.sessionToken} currentUser={this.props.currentUser}/> 
                </Modal>
                <RoutineMap currentUser={this.props.currentUser} sessionToken={this.props.sessionToken} routineArray={this.state.routine} getRoutines={this.getRoutines} adminCheck={this.props.adminCheck} /> 
            </div>
        )
    }
}

export default Routines; 