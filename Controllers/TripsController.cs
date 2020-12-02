using Microsoft.AspNetCore.Mvc;
using Trips.Data;
using System;

namespace Trips.Controllers
{
    [Route("api/[controller]")]
    public class TripsController: Controller {

        private ITripService _service;
        public TripsController(ITripService service){
            this._service = service;
        }

        [HttpGet("[action]")]
        public IActionResult GetTrips(){
            try {
                var allTrips = this._service.GetAllTrips();
                return Ok(allTrips); 
            } catch(Exception e) {
                return BadRequest();
            }
           
        }
        
        [HttpGet("[action]/{id}")]
        public IActionResult GetTripById( int id)
        {
            var trip = this._service.GetTripById(id);
            return Ok(trip); 
        }

        [HttpPost("AddTrip")]
        public IActionResult AddTrip([FromBody]Trip trip)
        {
            if(trip != null){
                _service.AddTrip(trip);
            }

            return Ok();
        }

        [HttpPut("[action]/{id}")]
        public IActionResult UpdateTrip(int id, [FromBody]Trip trip){
            _service.UpdateTrip(id, trip);
            return Ok (trip);
        }

        [HttpDelete("[action]/{id}")]
        public IActionResult DeleteTrip (int id){
            _service.DeleteTrip(id);
            return Ok();
        }

        
    }
    
}