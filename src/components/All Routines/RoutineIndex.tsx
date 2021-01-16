import {Component } from 'react'; 
import {Card, CardTitle, CardBody, Button, Modal, Container, Row } from 'reactstrap'; 
import RoutineEdit from '../All Routines/RoutineEdit'; 
import '../All Routines/RoutineIndex.css'; 
import Favorites from '../All Routines/Favorites'; 

type RoutineIndexProps = {
    currentUser: () => void, 
    wb: any, 
    getRoutines: () => void, 
    sessionToken: any
}

type RoutineIndexState = {
    modal: boolean, 
    isCurrentUser: boolean
}

class RoutineIndex extends Component <RoutineIndexProps, RoutineIndexState>{

    constructor(props: RoutineIndexProps) {
        super(props) 
        this.state = {
            modal: false, 
            isCurrentUser: false
        }
    }

    componentDidMount () {
        this.userCurrent() 
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

    userCurrent = () => {
        if (this.props.wb.userId == localStorage.getItem('userId')) {
            this.setState({isCurrentUser: true}) 
        } else {
            this.setState({isCurrentUser: false})
        }
    }

    render () {
            return (
            <Container className="routineContainer">
                <Row >
                    <Card className="routineCard">
                        <CardTitle>
                            Routine 
                        </CardTitle>
                        <CardBody className="cardBody">
                            <p className="exercise"> Exercise: {this.props.wb.exercise} </p>
                            <p className="equipment"> Equipment: {this.props.wb.equipment} </p>
                            <p className="weight"> Weight: {this.props.wb.weight} lbs </p> 
                            <p className="duration"> Duration: {this.props.wb.duration} min </p>
                            <p className="sets"> Sets: {this.props.wb.sets} </p> 
                            <p className="reps"> Reps: {this.props.wb.reps} </p>
                                <Favorites wb={this.props.wb} isCurrentUser={this.state.isCurrentUser} currentUser={this.props.currentUser} sessionToken={this.props.sessionToken}/>
                        </CardBody>
                        <Modal isOpen={this.state.modal} >
                            <RoutineEdit toggle={this.toggle} wb={this.props.wb} getRoutines={this.props.getRoutines} currentUser={this.props.currentUser}/> 
                        </Modal>
                    </Card>
                </Row>
                <Row>
                    { this.state.isCurrentUser ? 
                        <>
                        <Button type="button" className="deleteroutineButton"> Delete Routine </Button>
                        <Button type="button" className="editroutineButton" onClick={this.toggle}> Edit Routine </Button>
                        </> : null // added the empty html tags within the ternary b/c it will only return one thing within the ternary 
                    }
                </Row>
            </Container>
        )
    }
}

export default RoutineIndex; 