import { Component } from 'react'; 
import { Button, Modal } from 'reactstrap'; 
import CreateRoutine from '../Routine/CreateRoutine';
import RoutineList from '../All Routines/RoutineList'; 

type routinesProps = { 
    currentUser: () => void
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

    render () {
        return (
            <div>
                <Button type="button" onClick={this.toggle}> Create Routine </Button>
                <Modal className="routineModal">
                    <CreateRoutine toggle={this.toggle} getRoutines={this.getRoutines} currentUser={this.props.currentUser}/>
                </Modal>
                <RoutineList currentUser={this.props.currentUser} routineArray={this.state.routine} routineFetch={this.getRoutines}/> 
            </div>
        )
    }
}

export default Routines; 