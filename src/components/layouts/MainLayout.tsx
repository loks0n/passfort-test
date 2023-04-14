import { Outlet } from 'react-router-dom';
import Nav from '../nav/Nav';
import { Toaster } from 'react-hot-toast';

function MainLayout() {
  return (
    <main className="container">
      <Toaster position="top-center" />
      <Nav />
      <hr />
      <Outlet />
    </main>
  );
}

export default MainLayout;
