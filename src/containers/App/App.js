import React, { Component } from 'react';
import Eisenboard from '../Eisenboard/Eisenboard';
import './App.css';
import ExportToCalender from '../../components/ExportToCalendar/ExportToCalendar';

class App extends Component{
	
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