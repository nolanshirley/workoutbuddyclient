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
    isCurrentUser: boolean, 
    routineId: number
}

class RoutineIndex extends Component <RoutineIndexProps, RoutineIndexState>{

    constructor(props: RoutineIndexProps) {
        super(props) 
        this.state = {
            modal: false, 
            isCurrentUser: false, 
            routineId: 0
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
            method: 'DELETE', 
            headers: {
                'Authorization': this.props.sessionToken
            }
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
            <Container className="routineContainer" onMouseOver={() => {
                this.setState({routineId: this.props.wb.id})
                console.log(this.state.routineId)
            }}>
                <Row className="cardRow">
                    <Card className="routineCard" >
                        <CardTitle>
                            {/* {!this.state.isCurrentUser ? 
                                <> 'Users' Routine' </>: 
                                'Your Routine' 
                            }            */}
                        </CardTitle>
                        <CardBody className="cardBody">
                            <p className="exercise"> {this.props.wb.exercise} </p>
                            <p className="equipment"> Equipment : {this.props.wb.equipment} </p>
                            <p className="weight"> Weight : {this.props.wb.weight} lbs </p> 
                            <p className="sets"> {this.props.wb.sets} sets </p> 
                            <p className="reps"> {this.props.wb.reps} reps </p>
                            <p className="duration"> {this.props.wb.duration} minute routine </p>
                                <Favorites wb={this.props.wb} isCurrentUser={this.state.isCurrentUser} currentUser={this.props.currentUser} sessionToken={this.props.sessionToken} routineId={this.state.routineId} getRoutines={this.props.getRoutines}/> 
                        </CardBody>
                        <Modal isOpen={this.state.modal} >
                            <RoutineEdit toggle={this.toggle} sessionToken={this.props.sessionToken} wb={this.props.wb} getRoutines={this.props.getRoutines} currentUser={this.props.currentUser}/> 
                        </Modal>
                    </Card>
                </Row>
                <Row className="buttonRow">
                    { this.state.isCurrentUser ? 
                        <>
                        <Button type="button" className="deleteroutineButton" onClick={this.deleteRoutine}> Delete Routine </Button>
                        <Button type="button" className="editroutineButton" onClick={this.toggle}> Edit Routine </Button>
                        </> : null // added the empty html tags within the ternary b/c it will only return one thing within the ternary 
                    }
                    {
                        !this.state.isCurrentUser ? 
                        <div id="emptyDiv">
                            
                        </div> : null
                    }
                </Row>
            </Container>
        )
    }
}

export default RoutineIndex; 