import React, { Component } from 'react';
import Eisenboard from '../Eisenboard/Eisenboard';
import './App.css';
import { push as Menu } from 'react-burger-menu';
import DailyCounter from '../../components/DailyCounter/DailyCounter';
import Modal from 'react-modal';
import ExportList from '../../components/ExportList/ExportList';

const modalStyle = {
	content : {
	  top                   : '50%',
	  left                  : '50%',
	  right                 : 'auto',
	  bottom                : 'auto',
	  marginRight           : '-30%',
	  transform             : 'translate(-50%, -50%)',
	  width 				: '80%',
	  height				: 'auto',
	},
	overlay: {zIndex: 1000}
};


class App extends Component{
	
	state = {
		dailyPomodoroTarget : 10,
		modalIsOpen : false,
		sidebarIsOpen: false
	};

	openModal = () => {
		this.setState({modalIsOpen: true});
	}

	closeModal= () => {
		this.setState({modalIsOpen: false});
	}

	openExportMenu = () => {
		this.closeSidebar();
		this.openModal();
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
		Modal.setAppElement('#root');

		return (
			<div id="outer-container">
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={modalStyle}
				>
					<ExportList/> 
				</Modal>

				<Menu
					left
					onStateChange={ this.isSidebarOpen }
					isOpen={this.state.sidebarIsOpen}
					pageWrapId={"page-wrap"}
					outerContainerId={ "outer-container" } 
				>
					<button 
					type="button"
					className="link-button menu-item--small" 
					onClick={this.openExportMenu}>
						Export to Calendar
					</button>
					<a className="sidebarlink menu-item" id="about" rel="noopener noreferrer" target="_blank" href="https://github.com/adityaketkar/eisenlist">About EisenList</a>
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
					</div>
				</main>
			</div>
		)
	}
}

export default App;