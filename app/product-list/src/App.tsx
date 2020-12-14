import React from 'react';
import './App.css';
import { CompanyList } from './features/company/Company';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import { ProductList } from './features/product/ProductList';
import { Typography } from '@material-ui/core';

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<Typography variant="h3">Balaji Pharma Distributors Product List</Typography>
					<Switch>
						<Route path="/products">
							<ProductList />
						</Route>
						<Route path="/">
							<CompanyList />
						</Route>
					</Switch>
				</header>
			</div>
		</Router>
	);
}

export default App;
