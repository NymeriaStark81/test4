import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login'
import EditTemplate from "./pages/EditTemplate";
import Homepage from './pages/Homepage'
import HabitList from './pages/HabitList'
import JournalCreate from './pages/JournalCreate'



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
                      path="/homepage"
                      element={<Homepage />}
                  />
                  <Route
                      exact
                      path="/habit"
                      element={<HabitList />}
                  />
                  <Route
                      exact
                      path="/editTemplate"
                      element={<EditTemplate />}
                  />
                  <Route
                      exact
                      path="/journalCreate"
                      element={<JournalCreate />}
                  />
              </Routes>
          </BrowserRouter>
      </>
  );
}


export default App