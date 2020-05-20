import React, { Component } from 'react';
import Eisenboard from '../Eisenboard/Eisenboard';
import './App.css';

class App extends Component{
	
	render(){
		return (
			<div className="EisenboardContainer" >
				<Eisenboard></Eisenboard>
			</div>
		)
	}
}

export default App;