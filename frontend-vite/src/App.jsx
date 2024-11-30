
import './App.css';
import {RouterProvider,createBrowserRouter} from 'react-router-dom' 
import Login from './pages/Login';
function App() {


const router = createBrowserRouter([{
  element:<Login/>,
  path:"/"
}])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
