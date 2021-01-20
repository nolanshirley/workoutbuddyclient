import { Component } from 'react'; 
import {Button, Modal, ModalHeader, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'; 
import '../All Routines/Favorites.css'; 

type FavoritesState = {
    comment: string, 
    modal: boolean
}

type FavoritesProps = { 
    currentUser: () => void, 
    sessionToken: any, 
    wb: any, 
    isCurrentUser: boolean, 
    routineId: number, 
    getRoutines: () => void
}

class Favorites extends Component <FavoritesProps , FavoritesState> {

    constructor(props: FavoritesProps) {
        super(props) 
        this.state = {
            comment: '', 
            modal: false
        }
    }

    resetComment = () => {
        this.toggle(); 
        this.setState(state => ({comment: ''}))
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal})
    }

    comment = async () => {
        const url = `http://localhost:3000/favorite/comment/${this.props.routineId}`
        const body = {
            comment: this.state.comment, 
            userId: this.props.currentUser
        }
        await fetch(url, {
            method: 'POST', 
            headers: {
                'Authorization': this.props.sessionToken, // localStorage.getItem('token') || ' ', the or operator helps with typescript readability 
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(body)
        })
        .then(r => r.json())
        .then(rObj => {
            console.log(rObj)
            this.toggle()
            this.props.getRoutines()
        }) 
    }


    render () {
        return (
            <div>
                { !this.props.isCurrentUser ? 
                    <>
                        <Button type="button" id="commentButton" onClick={this.toggle}>
                           Comment   
                        </Button> 
                    </> : null
                }
                <Modal isOpen={this.state.modal}>
                    <ModalHeader>
                        What do you like about this Routine?
                    </ModalHeader>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="comment"> Comment </Label>
                            <Input value={this.state.comment} onChange={e => this.setState({comment: e.target.value})}/>
                        </FormGroup>
                    </Form>
                    <ModalFooter>
                        <Button type="button" onClick={this.resetComment}> Cancel </Button>
                        <Button type="button" onClick={this.comment}> Submit </Button>
                    </ModalFooter>
                </Modal>
                {this.props.wb.favorites.map((comment: any, i: any) => {
                    return (
                     <div id="commentMap">  
                        {comment.comment} 
                        {/* {comment.from}'s {comment.comment} this will show the other users username for their comment on other routines*/} 
                     </div>
                    )
                })}
                        {/* give the parent div a fixed max height and overflow y auto will give it a scrollable box feature  */}
            </div>
        )
    }
}

export default Favorites; 