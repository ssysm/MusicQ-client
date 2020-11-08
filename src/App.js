import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import HomePage from "./pages/HomePage";
import RoomPage from "./pages/RoomPage";
import HostPage from "./pages/HostPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/room/:id">
          <RoomPage />
        </Route>
        <Route path="/host">
          <HostPage />
        </Route>
        <Route path="/create-room">
          <CreateRoomPage />
        </Route>
        <Route path="/join-room">
          <JoinRoomPage />
        </Route>
        <Route path="*">
            <NotFoundPage />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
