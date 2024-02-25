import './App.css';
import Product from './components/product';
import ProductCreate from './components/productCreate';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Product/>} />
        <Route path='/products' element={<Product/>} />
        <Route path='/products/create' element={<ProductCreate/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
