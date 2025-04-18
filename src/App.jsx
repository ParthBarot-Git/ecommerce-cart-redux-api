import { BrowserRouter, Routes, Route} from 'react-router-dom'
import  Navbar  from './Components/Navbar.jsx';
import ProductCard from './Components/ProductCard.jsx';
import CartItem from './Components/CartItem.jsx';
import SearchProduct from './Components/SearchProduct.jsx';

import './App.css';

function App() {
  

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
     <Route  path="/" element={<ProductCard />} /> 
      <Route  path="/search" element={<SearchProduct />} />
      <Route  path="/cart" element={<CartItem />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
