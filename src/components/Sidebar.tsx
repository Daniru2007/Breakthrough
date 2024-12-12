import { NavLink } from 'react-router-dom';
import { 
  Flame, 
  GraduationCap, 
  Dumbbell, 
  Trophy, 
  ShoppingBag, 
  User, 
  MoreHorizontal 
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { icon: GraduationCap, text: 'LEARN', path: '/content/learn' },
  { icon: Dumbbell, text: 'PRACTICE', path: '/content/practice' },
  { icon: Trophy, text: 'LEADERBOARDS', path:'/content/leaderboards' },
  { icon: ShoppingBag, text: 'SHOP', path: '/content/shop' },
  { icon: User, text: 'PROFILE', path: '/content/profile' },
  { icon: MoreHorizontal, text: 'MORE', path: '/content/more' },
];

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img 
          src="https://d35aaqx5ub95lt.cloudfront.net/images/duo-spark.svg" 
          alt="Logo" 
          className="logo"
        />
        <span className="logo-text">BreakThrough</span>
      </div>

      <div className="streak-container">
        <Flame className="streak-icon" color="#f59e0b" size={24} />
        <span>1</span>
        <div className="streak-progress">
          <div className="streak-fill"></div>
        </div>
      </div>

      <nav className="nav-list">
        {navItems.map((item) => (
          <NavLink
            key={item.text}
            to={item.path}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <item.icon size={20} />
            <span className="nav-text">{item.text}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}