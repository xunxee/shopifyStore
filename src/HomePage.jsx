import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <div>HomePage</div>
      <Link to="/login">Log in</Link>
    </div>
  );
}
