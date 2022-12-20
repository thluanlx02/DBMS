import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import 'antd/dist/reset.css';

import AddSupplier from "./components/supplier";
import Product from "./components/product";
import Customer from "./components/customer";
import Order from "./components/order";
import Dashboard from "./components/Dashboard";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/dashboard"} className="navbar-brand">
            DBMS
          </Link>
          <div className="navbar-nav mr-auto">
          <li className="nav-item">
              <Link to={"/order"} className="nav-link">
               Order
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/supplier"} className="nav-link">
               Supplier
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/product"} className="nav-link">
               Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/customer"} className="nav-link">
               Customer
              </Link>
            </li>

          </div>
        </nav>

        <div className="container mt-3">
          <Switch>

            <Route exact path="/supplier" component={AddSupplier} />
            <Route exact path="/product" component={Product} />
            <Route exact path="/customer" component={Customer} />
            <Route exact path={["/order"]} component={Order} />
            <Route exact path={["/", "/dashboard"]} component={Dashboard} />
           
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
