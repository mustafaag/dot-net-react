import axios from 'axios';
import React, { Component } from 'react';


export class Update extends Component {
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDateStarted = this.onChangeDateStarted.bind(this);
        this.onChangeDateCompleted = this.onChangeDateCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUpdateCancel = this.onUpdateCancel.bind(this);

        this.state = {
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
    onChangeName (e){
        this.setState({
            name: e.target.value
        })
    }
    onChangeDescription (e){
        this.setState({
            description: e.target.value
        })
    }
    onChangeDateStarted (e){
        this.setState({
            dateStarted: e.target.value
        })
    }
    onChangeDateCompleted(e){
        this.setState({
            dateCompleted: e.target.value
        })
    }

    onSubmit (e) {
        e.preventDefault();

        const {history} = this.props;
        const {id} = this.props.match.params;

        let tripObject = {
            name: this.state.name,
            description: this.state.description,
            dateStarted: new Date(this.state.dateStarted).toISOString(),
            dateCompleted: this.state.dateCompleted ? new Date(this.state.dateCompleted).toISOString() : null
        }

        axios.put("api/trips/UpdateTrip/"+ id, tripObject).then(result =>{
            history.push('/trips');
        })

    }

    onUpdateCancel () {
        const {history} = this.props;
        history.push('/trips');
    }
    render () {
        return (
            <div className="trip-form" >
                <h3>Add new trip</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Trip name:  </label>
                        <input 
                          value={this.state.name}
                          onChange= {this.onChangeName}
                          type="text" 
                          className="form-control" 
                         />
                    </div>
                    <div className="form-group">
                        <label>Trip description: </label>
                        <textarea 
                            onChange= {this.onChangeDescription}
                            value={this.state.description}
			                type="text" 
                            className="form-control"
                        />
                    </div>
                    <div className="row">
                        <div className="col col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label>Date of start:  </label>
                                <input 
                                    onChange= {this.onChangeDateStarted}
                                    value={this.state.dateStarted}
                                    type="date" 
                                    className="form-control" 
                                />
                            </div>
                        </div>
                        <div className="col col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label>Date of completion:  </label>
                            <input 
                                onChange= {this.onChangeDateCompleted}
                                value={this.state.dateCompleted}
                                type="date" 
                                className="form-control" 
                            />
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className="form-group">                    
                        <button   onClick={this.onUpdateCancel} className="btn btn-default">Cancel</button>
                        <button type="submit" className="btn btn-success">Update</button>
                    
                    </div>
                </form>
            </div>
        )
    }

}