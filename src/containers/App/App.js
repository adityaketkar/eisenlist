import React, { Component } from 'react';
import Eisenboard from '../Eisenboard/Eisenboard';
import styled from 'styled-components';
import Aux from '../../hoc/Aux/Aux';

const EisenboardContainer = styled.div`
	background-color: lightblue;
	padding: 20px;
	margin: 20px;
`;

class App extends Component{
	
	render(){
		return (
			<Aux>
				<EisenboardContainer>
					<Eisenboard></Eisenboard>
				</EisenboardContainer>
			</Aux>
		)
	}
}

export default App;