import React, { Component } from 'react';
import Eisenboard from '../Eisenboard/Eisenboard';
import './App.css';


class App extends Component{

	
	state = {
		value: "What is real? How do you define real"
	};

	handleSave = (val) => {
		console.log('Edited Value -> ', val)
		this.setState({value: val})
	}

	
	render(){
		return (
			<div className="EisenboardContainer" >
				<Eisenboard></Eisenboard>
				{/* <ExportToCalender></ExportToCalender> */}
			</div>
			
		)
	}
}

export default App;