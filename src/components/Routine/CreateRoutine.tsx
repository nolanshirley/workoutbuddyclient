import { Component } from 'react'; 
import { ModalHeader, Form, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from 'reactstrap';


type props = {
    toggle: () => void, 
    getRoutines: () => void, 
    currentUser: () => void
}

type state = {
    exercise: string, 
    equipment: string, 
    weight: number, 
    duration: number, 
    sets: number, 
    reps: number
}

class createRoutine extends Component <props, state> {

    constructor(prop: props) {
        super(prop)
        this.state = {
            exercise: '', 
            equipment: '', 
            weight: 1, 
            duration: 1, 
            sets: 1, 
            reps: 1
        }
    }

    resetForm = () => {
        this.setState(state => ({
            exercise: '', 
            equipment: '', 
            weight: 1, 
            duration: 1, 
            sets: 1,
            reps: 1
        }))
    }

    handleSubmit = (e: any) => {
        e.preventDefault(); 
        const body = {
            exercise: this.state.exercise, 
            equipment: this.state.equipment, 
            weight: this.state.weight, 
            duration: this.state.duration, 
            sets: this.state.sets, 
            reps: this.state.reps, 
            userId: this.props.currentUser 
        }
        const url = 'http://localhost:3000/routine/workout'
        fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(body)
        })
        .then(r => r.json())
        .then(rObj => {
            console.log(rObj)
            this.props.getRoutines()
            this.props.toggle()
        })
    }


    render () {
        return (
            <div>
                <ModalHeader charCode="WB"><h1> Create a New Routine </h1></ModalHeader> 
                <Form> 
                    <ModalBody>
                        <FormGroup>
                            <Label htmlFor="exercise"> Exercise </Label>
                            <Input value={this.state.exercise} onChange={e => this.setState({exercise: e.target.value})}/>
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <Label htmlFor="equipment"> Equipment </Label>
                            <Input value={this.state.equipment} onChange={e => this.setState({equipment: e.target.value})} />
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <Label htmlFor="weight"> Weight </Label>
                            <Input value={this.state.weight} type="range" min="1" max="50" onChange={e => this.setState({weight: parseInt(e.target.value)})} /> 
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <Label htmlFor="duration"> Duration </Label>
                            <Input value={this.state.duration} type="range" min="1" max="200" onChange={e => this.setState({duration: parseInt(e.target.value)})} /> 
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <Label htmlFor="sets"> Sets </Label>
                            <Input value={this.state.sets} type="range" min="1" max="50" onChange={e => this.setState({sets: parseInt(e.target.value)})} /> 
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <Label htmlFor="reps"> Reps </Label>
                            <Input value={this.state.reps} type="range" min="1" max="200" onChange={e => this.setState({reps: parseInt(e.target.value)})} /> 
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" onClick={this.resetForm}> Cancel </Button>
                        <Button type="button" onClick={this.handleSubmit}> Submit </Button> 
                    </ModalFooter>
                </Form>
            </div>
        )
    }
}

export default createRoutine; 