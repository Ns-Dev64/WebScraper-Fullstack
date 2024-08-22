import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Home from './screens/Home/Home.jsx';
import Product from './screens/Product/Product.jsx';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home></Home>}></Route>
          <Route exact path='/product' element={<Product></Product>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
