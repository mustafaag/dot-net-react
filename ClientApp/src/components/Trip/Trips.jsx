import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getAllTrips } from '../../actions/tripActions';

export class Trips extends Component {
    constructor(props){
        super(props);

        this.onTripUpdate = this.onTripUpdate.bind(this);
        this.onTripDelete = this.onTripDelete.bind(this);

        this.state = {
            trips: [],
            loading: true,
            failed: false,
            error: ''
        }
    }

    componentDidMount(){
        this.props.getAllTrips();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.trips.data !== this.props.trips.data){
            this.setState({
                trips: this.props.trips.data
            })
        }
    }


    onTripUpdate (id) {
        const {history} = this.props;
        history.push("update/"+id);
    }

    onTripDelete (id) {
        const {history} = this.props;
        history.push("delete/"+id);
    }
    renderAllTripsTable = (trips) =>{
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Desc</th>
                        <th>D. Started</th>
                        <th>D. Completed</th>
                        <th>Action</th> 
                    </tr>
                </thead>
                <tbody>
                    {trips.map(trip =>(
                        <tr key={trip.id}>
                         <td>{trip.name}</td>
                         <td>{trip.description}</td>
                         <td>{new Date(trip.dateStarted).toISOString().slice(0,10)}</td>
                         <td>{trip.dateCompleted? new Date(trip.dateCompleted).toISOString().slice(0,10): "-" }</td>
                         <td>
                             <div className="form-group">
                                <button className="btn btn-success" onClick={() =>{
                                    this.onTripUpdate(trip.id)
                                }}>
                                    Update
                                </button>
                                <button className="btn btn-danger" onClick={() =>{
                                    this.onTripDelete(trip.id)
                                }}>
                                    Delete
                                </button>
                             </div>
                           
                         </td>
                        </tr>
                    ))}
                   
                </tbody>
            </table>
        )
    }

    render () {
 

        const content = this.props.trips.loading?
        (
            <p>
                <em> Loading...</em>
            </p>
        ): ( 
            this.state.trips.length &&  this.renderAllTripsTable(this.state.trips)
        );
            

        return (
            <div>
                <h1>All Trips</h1>
                <p>Here you can see all trips</p>
                {content}
            </div>
        )
    }
}

const mapStateToProps = ({trips}) => ({
    trips
});

export default connect(mapStateToProps, {getAllTrips})(Trips);