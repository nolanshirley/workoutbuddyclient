import { Component } from 'react'; 

type body = {
    currentUser: string
}

type User = {
    modal: boolean, 
    routine: any
}

class Routines extends Component < body, User > {
    
    constructor(props: body) {
        super(props)
        this.state = {
            modal: false, 
            routine: []
        }
    }

    toggle = () => {
        this.setState(state => ({ modal: !state.modal}))
    }


    getRoutines = () => {
        fetch('http://localhost:3000/routine/', {
            method: 'GET'
        })
        .then(r => r.json)
        .then(rArr => this.state.routine(rArr))
    }

    render () {
        return (
            <div>

            </div>
        )
    }
}

export default Routines; 