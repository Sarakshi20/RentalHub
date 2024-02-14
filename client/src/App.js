import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/Pages/HomePage';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Profile from './components/Pages/Profile';
import ListItems from './components/Pages/ListItems';
import ListView from './components/Pages/ListView';
import Products from './components/Pages/Products';
import ItemDetails from './components/Pages/ItemDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path="/login" element={localStorage.getItem('token')?<Profile />:<Login />}></Route>
          <Route path="/register" element={localStorage.getItem('token')?<Profile />:<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/profile/listItems" element={<ListItems />}></Route>
          <Route path='/profile/listView' element={<ListView />}></Route>
          <Route path='/Items' element={<Products />}></Route>
          <Route path="/item-details/:itemId" element={<ItemDetails />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
