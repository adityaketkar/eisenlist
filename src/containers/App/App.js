import React, { Component } from 'react';
import Eisenboard from '../Eisenboard/Eisenboard';
import './App.css';
import { push as Menu } from 'react-burger-menu';
import DailyCounter from '../../components/DailyCounter/DailyCounter';
import Modal from 'react-modal';
import ExportList from '../../components/ExportList/ExportList';

const customStyles = {
	content : {
	  top                   : '50%',
	  left                  : '50%',
	  right                 : 'auto',
	  bottom                : 'auto',
	  marginRight           : '-50%',
	  transform             : 'translate(-50%, -50%)'
	},
	overlay: {zIndex: 1000}

  };


class App extends Component{


	
	state = {
		dailyPomodoroTarget : 10,
		modalIsOpen : false,
		sidebarIsOpen: false
	};

	// let subtitle
	openModal = () => {
		this.setState({modalIsOpen: true});
	}

	afterOpenModal= () =>  {
		// references are now sync'd and can be accessed.
		// this.state.subtitle.style.color = '#f00';
	}

	closeModal= () => {
		this.setState({modalIsOpen: false});
	}

	openExportMenu = () => {
		this.openModal();
		this.closeSidebar();
	}

	isSidebarOpen = (state) => {
		this.setState({sidebarIsOpen:state.isOpen});
		return state.isOpen;
	};

	closeSidebar =() => {
		this.setState({sidebarIsOpen:false});
	}


	
	updateDailyPomodoroTarget = (direction) => {
        if(direction==="decrease"){
            this.setState({dailyPomodoroTarget : this.state.dailyPomodoroTarget-1});
        }
        else if (direction==="increase"){
            this.setState({dailyPomodoroTarget : this.state.dailyPomodoroTarget+1});
        }   
    }
	
	render(){
		return (
			<div id="outer-container">
					<Modal
					// isOpen={this.state.modalIsOpen}
					isOpen={true}
					// onAfterOpen={afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Export Tasks to Calendar"
					>
					<ExportList
						key="TEST"
					/> 
					</Modal>
			<Menu left onStateChange={ this.isSidebarOpen } isOpen={this.state.sidebarIsOpen} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } >
					<a className="sidebarlink menu-item" id="about" target="_blank" href="https://github.com/adityaketkar/eisenlist">About EisenList</a>

					<a className="sidebarlink menu-item--small" href="#" onClick={this.openExportMenu}>Export to Calendar</a>

					<div className="DailyCounter">
						<DailyCounter
							dailyPomodoroTarget={this.state.dailyPomodoroTarget}
							onClickDecrease={() => this.updateDailyPomodoroTarget('decrease')}
							onClickIncrease={() => this.updateDailyPomodoroTarget('increase')}
						></DailyCounter>
					</div>
			</Menu>
			<main id="page-wrap">
				<div className="EisenboardContainer" >
					<Eisenboard></Eisenboard>
					{/* <ExportToCalender></ExportToCalender> */}
				</div>
			</main>
			</div>
			
		)
	}
}

export default App;