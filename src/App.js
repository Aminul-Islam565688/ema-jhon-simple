import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./component/Header/Header";
import Inventory from "./component/Inventory/Inventory";
import Login from "./component/Login/Login";
import NotFound from "./component/NotFound/NotFound";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import ProductDetail from "./component/ProductDetail/ProductDetail";
import Review from "./component/Review/Review";
import Shipment from "./component/Shipment/Shipment";
import Shop from "./component/Shop/Shop";

export const UseContext = createContext();

function App() {
  const [logggedInUser, setLoggedInUser] = useState({});
  return (
    <UseContext.Provider value={[logggedInUser, setLoggedInUser]}>
      <h3>Email:{logggedInUser.email}</h3>

      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/manage">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="/dokan"></Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UseContext.Provider>
  );
}

export default App;
