import './App.css'
import { ProductList } from './components/ProductList/ProductList'
import {Header} from "./components/Header/Header"



function App() {


  return (
    <div className='container'>
   
    <Header />
    <div className='section'>
    <ProductList/>  
    </div>  
    </div>
  )
}

export default App;
