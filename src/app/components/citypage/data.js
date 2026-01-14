// app/components/city-page/data.js
import dynamic from 'next/dynamic';

// Dynamic imports
const Wrench = dynamic(() => import('lucide-react').then(mod => mod.Wrench), { ssr: false });
const Calendar = dynamic(() => import('lucide-react').then(mod => mod.Calendar), { ssr: false });
const Clock = dynamic(() => import('lucide-react').then(mod => mod.Clock), { ssr: false });
const Package = dynamic(() => import('lucide-react').then(mod => mod.Package), { ssr: false });
const Shield = dynamic(() => import('lucide-react').then(mod => mod.Shield), { ssr: false });
const Zap = dynamic(() => import('lucide-react').then(mod => mod.Zap), { ssr: false });
const Droplet = dynamic(() => import('lucide-react').then(mod => mod.Droplet), { ssr: false });
const Wifi = dynamic(() => import('lucide-react').then(mod => mod.Wifi), { ssr: false });

export const citySliders = {
  
  dhaka: {
    name: 'Dhaka',
    slides: [
      {
        id: 1,
        title: 'Powerful In-line UV',
        subtitle: 'High powered 7W LED UV Lamp',
        image: 'https://i.ibb.co.com/Jwnf2wQs/1-lg-copper-alive-product-production.webp', 
        color: 'from-cyan-600 to-blue-700'
      },
      {
        id: 2,
        title: 'Copper Infused Water',
        subtitle: 'Natural Copper Benefits',
        description: 'Enhances digestion and improves immunity with copper-infused water',
        image: 'https://i.ibb.co.com/gMXpXPCH/types-of-web-development-services.jpg2',
        color: 'from-amber-600 to-orange-700'
      },
      {
        id: 3,
        title: 'Smart IoT Features',
        subtitle: 'WiFi Connected Monitoring',
        description: 'Real-time water quality tracking through mobile app',
        image: 'https://i.ibb.co.com/gMXpXPCH/types-of-web-development-services.jpg3',
        color: 'from-emerald-600 to-green-700'
      },
      {
        id: 4,
        title: '5-Stage Filtration',
        subtitle: 'Advanced Purification System',
        description: 'Complete removal of impurities with 5-stage filtration process',
        image: 'https://i.ibb.co.com/gMXpXPCH/types-of-web-development-services.jpg4.jpg',
        color: 'from-purple-600 to-indigo-700'
      }
    ],
    stats: {
      users: '8,000+',
      rating: '4.8',
      installations: '25,000+'
    }
  },
  chattogram: {
    name: 'Chattogram',
    slides: [
      {
        id: 1,
        title: 'Industrial Grade Filtration',
        subtitle: 'For Port City Water',
        description: 'Specialized filtration for Chattogram\'s unique water conditions',
        image: '/images/chattogram-slide-1.jpg',
        color: 'from-blue-600 to-cyan-700'
      },
      {
        id: 2,
        title: 'High Capacity Purification',
        subtitle: '20 LPH Output',
        description: 'Large capacity purification for industrial and residential use',
        image: '/images/chattogram-slide-2.jpg',
        color: 'from-teal-600 to-emerald-700'
      },
      {
        id: 3,
        title: 'Salt Water Protection',
        subtitle: 'Coastal Area Special',
        description: 'Extra protection against salt and mineral content in water',
        image: '/images/chattogram-slide-3.jpg',
        color: 'from-sky-600 to-blue-700'
      }
    ],
    stats: {
      users: '5,000+',
      rating: '4.7',
      installations: '15,000+'
    }
  },

  khulna: {
    name: 'Khulna',
    slides: [
      {
        id: 1,
        title: 'Agricultural Area Special',
        subtitle: 'Pesticide Removal',
        description: 'Advanced filtration for agricultural area water conditions',
        image: '/images/khulna-slide-1.jpg',
        color: 'from-green-600 to-emerald-700'
      }
    ],
    stats: {
      users: '3,000+',
      rating: '4.6',
      installations: '10,000+'
    }
  }
};

//  products data
export const demoProducts = {
  dhaka: [
    {
      name: 'SafeTap Copper',
      price: '৳417/month',
      features: ['Copper Infused', 'RO+UV', 'IoT Smart', '15 LPH', 'Free Installation'],
      description: 'Best RO+UV Copper Water Purifier with IoT features'
    },
    {
      name: 'SafeTap RO+',
      price: '৳349/month',
      features: ['Mineral Added', 'RO Technology', 'Smart Monitoring'],
      description: 'RO with Essential Minerals'
    },
    {
      name: 'SafeTap Alkaline',
      price: '৳399/month',
      features: ['pH Balanced', 'Alkaline Water', 'Better Hydration'],
      description: 'Balanced pH Alkaline Water'
    }
  ],
  chattogram: [
    {
      name: 'SafeTap Copper',
      price: '৳427/month',
      features: ['Copper Infused', 'RO+UV', 'Port City Special'],
      description: 'Port city special RO+UV Copper Purifier'
    },
    {
      name: 'SafeTap Industrial',
      price: '৳799/month',
      features: ['High Capacity', 'Industrial Grade', 'Salt Protection'],
      description: 'Industrial grade purification for Chattogram'
    }
  ]
};

// RO+UV Copper Water Purifier Product Description 
export const techSpecs = [
  {
    icon: Shield, 
    title: 'RO+UV+Copper Filtration',
    details: '3-stage purification with copper infusion'
  },
  {
    icon: Zap, 
    title: 'IoT Enabled',
    details: 'Smart monitoring through mobile app'
  },
  {
    icon: Droplet, 
    title: '15 LPH Capacity',
    details: 'High purification capacity for families'
  },
  {
    icon: Wifi, 
    title: 'WiFi Connected',
    details: 'Real-time water quality updates'
  },
   {
    icon: Clock,
    title: '48-hour Installation',
    details: 'Quick installation within 48 hours of booking',
  
  },
   {
    icon: Calendar, 
    title: '7 Days Risk-Free Trial',
    details:'Try for 7 days, cancel anytime if not satisfied',
   
  },
];
