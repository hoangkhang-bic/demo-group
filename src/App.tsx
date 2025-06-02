import { Outlet, NavLink, useParams } from "react-router";
import "./App.css";

function App() {
  const { idCommunity } = useParams();
  return (
    <div id="root">
      <NavLink to={`/admin-pannel/${idCommunity}/1/dashboard`} />
      <Outlet />
    </div>
  );
}

export default App;
