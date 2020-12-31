import { Component } from 'react'; 

type user = {
    userIdentification: () => void
}

type body = {
    currentUser: any, 
    modal: boolean
}

class Routines extends Component <user, body> {
    
    constructor(props: user) {
        super(props)
        this.state = {
            currentUser: '',
            modal: false 
        }
    }


    toggle = () => {
        this.setState({
            modal: true
        })
    }


    render () {
        return (
            <div>

            </div>
        )
    }
}

export default Routines; 