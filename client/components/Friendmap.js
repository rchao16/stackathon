import React, {Component} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {connect} from 'react-redux'
import {postActivity} from '../store'

import Friendpin from './Friendpin'

class Friendmap extends Component {
    constructor() {
        super();
        this.state = {
            viewport: {
              width: 800,
              height: 800,
              latitude: 41.8885,
              longitude: -87.6354,
              zoom: 16
            },
            // popupInfo: null,
            name: '',
            description: '',
            longitude: 0.0,
            latitude: 0.0
          };
    }

    _handleChange = (evt) => {
      this.setState({
          [evt.target.name]: evt.target.value
      })
    }

    _renderFriendMarker = (longitude, latitude) => {
        return (
            <Marker
            longitude={longitude}
            latitude={latitude}>
            <div>
              <Friendpin size={20} onClick={() => this.setState({popupInfo: true})} />
            </div>
            </Marker>

        )
    }

    _renderPopup = (longitude, latitude, name, user) => {
        // const {popupInfo} = this.state
        console.log(user)
        return (
            <Popup 
            tipSize={5}
            anchor="top"
            longitude={longitude}
            latitude={latitude}
            onClose={() => this.setState({popupInfo: null})} >
                <div>
                  {user}
                </div>
                <div>
                  {name} 
                </div>
            </Popup>
        )
    }


  render() {
    if (this.props.activities.length === 0){
      return(
        <h1> Loading... </h1>
      )
    }
        
    return (
      <div>
        {this.props.activities.activity.map(elem => {
          return(
            <ReactMapGL
            mapboxApiAccessToken='pk.eyJ1IjoicmNoYW80IiwiYSI6ImNqaW00ZHdoOTAwOG0za28ydjB6c2Q5a2wifQ.meGWBAB525S8OEn_XnYsuQ'
              {...this.state.viewport}
              onViewportChange={(viewport) => this.setState({viewport})}
              key = {elem.id}
            >
      
              {this._renderFriendMarker(elem.longitude, elem.latitude)}
              {this._renderPopup(elem.longitude, elem.latitude, elem.name, elem.email)}
            </ReactMapGL>
          )
            
        })}
      
      <form onSubmit={this.props.handleSubmit}>
        <label>Add Activity</label>
        <input name='name' value={this.state.name} onChange={this._handleChange} />
        <label>Add description:</label>
        <input name='description' value={this.state.description} onChange={this._handleChange} />
        <label>longitude:</label>
        <input name='longitude' value={this.state.longitude} onChange={this._handleChange} />
        <label>latitude:</label>
        <input name='latitude' value={this.state.latitude} onChange={this._handleChange} />
        <button type='submit'> SUBMIT </button>
      </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activities: state.activities,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      handleSubmit: (evt) => {
          evt.preventDefault()
          console.log(evt.target)
          const name = evt.target.name.value
          const description = evt.target.description.value
          const longitude = evt.target.longitude.value
          const latitude = evt.target.latitude.value
          dispatch(postActivity({name, description, longitude, latitude }))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friendmap)