import React from 'react';
import './App.css';
import { CompanyList } from './features/company/Company';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import { ProductList } from './features/product/ProductList';

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
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
