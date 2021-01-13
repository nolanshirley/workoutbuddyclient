import {Component } from 'react'; 
import {Card, CardTitle, CardBody, Button, Modal} from 'reactstrap'; 
import RoutineEdit from '../All Routines/RoutineEdit'; 

type RoutineIndexProps = {
    currentUser: () => void, 
    wb: any, 
    getRoutines: () => void, 
    sessionToken: any
}

type RoutineIndexState = {
    modal: boolean
}

class RoutineIndex extends Component <RoutineIndexProps, RoutineIndexState>{

    constructor(props: RoutineIndexProps) {
        super(props) 
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    deleteRoutine = async () => {
        const url = `http://localhost:3000/routine/delete/${this.props.wb.id}`
        await fetch (url, {
            method: 'DELETE'
        })       
        .then(r => r.json())
        .then(rObj => console.log(rObj))
        this.props.getRoutines()
    }

   
    render () {
            return (
            <div>
                <Card>
                    <CardTitle>
                        Routine 
                    </CardTitle>
                    <CardBody>
                        <p> Exercise: {this.props.wb.exercise} </p>
                        <p> Equipment: {this.props.wb.equipment} </p>
                        <p> Weight: {this.props.wb.weight} lbs </p> 
                        <p> Duration: {this.props.wb.duration} min </p>
                        <p> Sets: {this.props.wb.sets} </p> 
                        <p> Reps: {this.props.wb.reps} </p>
                    </CardBody>
                    <Modal isOpen={this.state.modal} >
                        <RoutineEdit toggle={this.toggle} wb={this.props.wb} getRoutines={this.props.getRoutines} currentUser={this.props.currentUser}/> 
                    </Modal>
                        { this.props.wb.userId == localStorage.getItem('userId') ? 
                        <>
                        <Button type="button" > Delete Routine </Button>
                        <Button type="button" onClick={this.toggle}> Edit Routine </Button>
                        </> : null
                        }
                </Card>
            </div>
        )
    }
}

export default RoutineIndex; 