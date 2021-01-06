import { Component } from 'react'; 

type clearToken = {
    removeToken: () => void
}

class Logout extends Component <{}, clearToken> {

    constructor(props: clearToken) {
        super(props)

        
    }

    render () {
        return (
            <div>

            </div>
        )
    }
}

export default Logout; 