import { Settings, HelpCircle, Bell, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './More.css';

const menuItems = [
  {
    icon: Settings,
    title: 'Settings',
    description: 'Customize your learning experience',
    path: '/settings'
  },
  {
    icon: HelpCircle,
    title: 'Help Center',
    description: 'Get support and answers',
    path: '/help'
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Manage your notifications',
    path: '/notifications'
  },
  {
    icon: Users,
    title: 'Friends',
    description: 'Connect with other learners',
    path: '/friends'
  },
  {
    icon: Shield,
    title: 'Privacy',
    description: 'Manage your privacy settings',
    path: '/privacy'
  },
];

function More() {
  const navigate = useNavigate();

  return (
    <div className="more-container">
      <h1 className="more-title">More Options</h1>
      <div className="menu-list">
        {menuItems.map((item) => (
          <button
            key={item.title}
            className="menu-item"
            onClick={() => navigate(item.path)}
          >
            <div className="menu-icon">
              <item.icon size={20} />
            </div>
            <div className="menu-content">
              <h3 className="menu-title">{item.title}</h3>
              <p className="menu-description">{item.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default More;