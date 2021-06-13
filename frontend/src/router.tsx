import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import BookList from './pages/book-list';
import BookDetails from './pages/book-details';
import BasePage from './pages/base-page';




const routes = (
	<Switch>
		<BasePage>
		<Switch>
		<Route exact path="/" component={BookList} />
		<Route exact path="/books" component={BookList} />
		<Route exact path="/books/:id" component={BookDetails} />
		</Switch>
		</BasePage>
	</Switch>
);

export default function configureRoutes() {
	return <BrowserRouter>{routes}</BrowserRouter>;
}
