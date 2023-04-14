import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <strong>Home</strong>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
