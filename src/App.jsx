import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Product from './components/Product/Product';
import Catalog from './components/Catalog/Catalog';
import About from './components/About/About';
import Contacts from './components/Contacts/Contacts';
import CartOrder from './components/CartOrder/CartOrder';
import Home from './components/Home/Home';
import Page404 from './components/404/404';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className="container">
          <div className="row">
            <div className="col">
              <Banner />
              <Switch>
                <Route path="/catalog/:id" component={Product} />
                <Route path="/catalog" component={Catalog} />
                <Route path="/about" component={About} />
                <Route path="/contacts" component={Contacts} />
                <Route path="/cart" component={CartOrder} />
                <Route path="/" exact component={Home} />
                <Route component={Page404} />
              </Switch>
            </div>
          </div>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
