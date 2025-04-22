import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login'
import EditTemplate from "./pages/EditPage/EditTemplate";
import Homepage from './pages/Homepage/Home'
import JournalView from './pages/Journal/JournalView'


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
                      path="/editTemplate"
                      element={<EditTemplate />}
                  />
                  <Route
                      exact
                      path="/journalView"
                      element={<JournalView />}
                  />
              </Routes>
          </BrowserRouter>
      </>
  );
}


export default App