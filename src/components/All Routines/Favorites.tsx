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
    isCurrentUser: boolean
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

    comment = () => {
        const url = "http://localhost:3000/favorite/comment"
        const body = {
            comment: this.state.comment, 
            userId: this.props.currentUser
        }
        fetch(url, {
            method: 'POST', 
            headers: {
                'Authorization': this.props.sessionToken, 
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(body)
        })
        .then(r => r.json())
        .then(rObj => {
            console.log(rObj)
            //this.favorites()
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
                
            </div>
        )
    }
}

export default Favorites; 