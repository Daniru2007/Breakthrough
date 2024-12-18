import React, {useContext, useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { ShopCategory } from './components/Shop/components/ShopCategory';
import { CurrencyDisplay } from './components/Shop/components/CurrencyDisplay';
import shopData from './components/Shop/data/shop-items.json';
import { Store } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import "./ShopUpdate.css"
import {DisplayGems, DoubleXP} from "./IncreaseXP.tsx";
import UserContext from "./UserContext.tsx";
import UserExtensionUpdate from "./UserExtensionUpdate.tsx";

function Shop() {
  const [currency, setCurrency] = useState(1000);
  const [purchaseHistory, setPurchaseHistory] = useState<number[]>([]);
  const {user, setUser} = useContext(UserContext);
  const [userExtension, setUserExtension] = useState({Gems: 0, XP: 0});

  useEffect(() => {
    DisplayGems(setUserExtension,user.email);
  }, [userExtension]);

  const handlePurchase = (itemId: number) => {
    const item = shopData.categories
      .flatMap((cat) => cat.items)
      .find((i) => i.id === itemId);

    if (item && userExtension.Gems >= item.price) {
      setCurrency((prev) => prev - item.price);
      setPurchaseHistory((prev) => [...prev, itemId]);

      if (item.id === 1){
        DoubleXP(setUserExtension, user.email);
      }
      
      toast.success(`Successfully purchased ${item.name}!`, {
        icon: '🎉',
        style: {
          borderRadius: '1rem',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      toast.error('Not enough currency!, DO BETTER', {
        icon: '😢',
        style: {
          borderRadius: '1rem',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Toaster position="bottom-right" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-6 py-12"
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="w-12 h-12 rounded-2xl bg-[#2ECB46]/10 flex items-center justify-center"
            >
              <Store className="w-6 h-6 text-[#2ECB46]" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Virtual Shop</h1>
              <p className="text-gray-600">Upgrade your experience</p>
            </div>
          </div>
          <CurrencyDisplay amount={userExtension.Gems} />
        </div>

        <div className="space-y-8">
          {shopData.categories.map((category, index) => (
            <ShopCategory
              key={index}
              name={category.name}
              items={category.items}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Shop;