
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login';
import { AuthProvider } from './context/AuthProvider';
import PersistLogin from './pages/PersistLogin';
import Home from './pages/Home';
import Layout from './components/Layout';
import SignUp from './pages/SignUp';
import Update from './pages/Update';
import AddEmployee from './pages/AddEmployee';
function App() {


  const router = createBrowserRouter([{
    element: <PersistLogin />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            element: <Login />,
            path: "/"
          },
          {
            element:<SignUp/>,
            path:"/signup"
          },
          {
            element: <Home />,
            path: '/home'
          },
          {
            element:<Update/>,
            path:"/update/:id"
          },
          {
            element:<AddEmployee/>,
            path:'/addEmployee'
          }
        ]
      }

    ]

  }])

  return (
    <AuthProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
