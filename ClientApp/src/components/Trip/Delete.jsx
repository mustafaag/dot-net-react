import React, { Component } from 'react';
import axios from 'axios';


export class Delete extends Component {
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onConfirmation = this.onConfirmation.bind(this);

        this.state ={
            name: '',
            description: '',
            dateStarted: null,
            dateCompleted: null
        }
    }


    componentDidMount() {
        const {id} = this.props.match.params;
        axios.get("api/Trips/GetTripById/" + id).then(result =>{

            const resp = result.data;

            this.setState({
                name: resp.name,
                description: resp.description,
                dateStarted: new Date(resp.dateStarted).toISOString().slice(0,10),
                dateCompleted: resp.dateCompleted ?  new Date(resp.dateCompleted).toISOString().slice(0,10) : null
            });
        })
    }

    onCancel (e) {
        const {history} = this.props;
        history.push('/trips');
    }

    onConfirmation () {
        const {id} = this.props.match.params;
        const {history} = this.props;

        axios.delete("api/Trips/DeleteTrip/"+id).then(result => {
            
            if(result.status === 200){
                history.push('/trips');
            }
            
        });
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h2>Delete trip confirmation</h2>

                <div className="card">
                <div className="card-body">
                    <h4 className="card-title"> {this.state.name} </h4>
                    <p className="card-text"> {this.state.description} </p>
                    <button className="btn btn-default" onClick={this.onCancel}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={this.onConfirmation}> 
                        Confirm
                    </button>
                </div>
                </div>
            </div>
        )
    }
}