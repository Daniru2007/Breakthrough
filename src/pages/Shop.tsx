import { Gem, Heart, Shield, Zap } from 'lucide-react';
import './Shop.css';

const shopItems = [
  {
    icon: Heart,
    title: 'Extra Lives',
    description: 'Continue learning when you make a mistake',
    price: 100,
    color: '#ef4444',
  },
  {
    icon: Shield,
    title: 'Streak Freeze',
    description: 'Protect your streak when you miss a day',
    price: 200,
    color: '#3b82f6',
  },
  {
    icon: Zap,
    title: 'Double XP',
    description: 'Earn double XP for 30 minutes',
    price: 150,
    color: '#f59e0b',
  },
];

function Shop() {
  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1>Shop</h1>
        <div className="gems-display">
          <Gem className="h-6 w-6" color="#ce82ff" />
          <span className="gems-count">1,250</span>
        </div>
      </div>

      <div className="shop-grid">
        {shopItems.map((item) => (
          <div key={item.title} className="shop-item">
            <div className="item-icon"<div className="shop-grid"> style={{ backgroundColor: `${item.color}20`, color: item.color }}>
              <item.icon size={24} />
            </div>
            <h3 className="item-title">{item.title}</h3>
            <p className="item-description">{item.description}</p>
            <button className="buy-button">
              Buy for {item.price} gems
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;