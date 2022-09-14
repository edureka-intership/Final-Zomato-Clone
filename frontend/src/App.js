import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home/Home';
import Filter from '../src/Components/Filter/Filter'
import RestaurantsDetails from './Components/Details/RestaurantsDetails';
function App() {
  return (
    <div>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/details/:rName" element={<RestaurantsDetails/>}/>
       <Route path='/filter/:MealType' element={<Filter/>}></Route> 
      </Routes>
    
   
    </div>
  );
}

export default App;
