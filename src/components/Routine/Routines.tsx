import { Component } from 'react'; 

type user = {
    userIdentification: () => void
}

// type body = {
//     currentUser: number
// }

class Routines extends Component <user, {}> {
    
    constructor(props: user) {
        super(props)
        this.state = {
            routine: '',
            modal: false
        }
    }





    render () {
        return (
            <div>

            </div>
        )
    }
}

export default Routines; 