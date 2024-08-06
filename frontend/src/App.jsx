import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login'
import Signup from "./pages/Signup";

//const userInfo = token_decode(localStorage.getItem('canva_token'))

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route
                      exact
                      path="/"
                      element={<Login />}
                  />
                  <Route
                      exact
                      path="/signup"
                      element={<Signup />}
                  />
              </Routes>
          </BrowserRouter>
      </>
  );
}


export default App