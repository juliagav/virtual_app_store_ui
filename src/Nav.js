import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/create-user">Create User</Link>
        </li>
        <li>
          <Link to="/edit">Edit</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/create-product">Create Product</Link>
        </li>
      </ul>
    </nav>
  );
}