import { Outlet } from 'react-router-dom';
import Nav from '../nav/Nav';

function MainLayout() {
  return (
    <main className="container">
      <Nav />
      <hr />
      <Outlet />
    </main>
  );
}

export default MainLayout;
