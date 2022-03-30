import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetTeamsCode from "./GetTeamsCode";
import styled from "styled-components";

const Header = styled.header`
	font-size: 30px;
	padding: 30px;
`;

function App() {
	return (
		<div className='App'>
			<Header className='App-header'>Get Teams Code</Header>
			<GetTeamsCode />
			<ToastContainer />
		</div>
	);
}

export default App;
