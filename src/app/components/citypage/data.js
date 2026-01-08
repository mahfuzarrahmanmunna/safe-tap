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
        image: 'https://i.ibb.co.com/v6B21T50/2-copper-product-production.webp',
        color: 'from-amber-600 to-orange-700'
      },
      {
        id: 3,
        title: 'Smart IoT Features',
        subtitle: 'WiFi Connected Monitoring',
        image: 'https://i.ibb.co.com/v6vh8HGy/Multistage-Purification-production.webp',
        color: 'from-emerald-600 to-green-700'
      },
      {
        id: 4,
        title: '5-Stage Filtration',
        subtitle: 'Advanced Purification System',
        image: 'https://i.ibb.co.com/PG3mTSHg/Powerful-In-line-UV-production.webp',
        color: 'from-purple-600 to-indigo-700'
      }
    ]
  },
  chattogram: {
    name: 'Chattogram',
    slides: [
      {
        id: 1,
        title: 'Industrial Grade Filtration',
        subtitle: 'For Port City Water',
        image: 'https://i.ibb.co.com/Jwnf2wQs/1-lg-copper-alive-product-production.webp',
        color: 'from-blue-600 to-cyan-700'
      },
      {
        id: 2,
        title: 'High Capacity Purification',
        subtitle: '20 LPH Output',
        image: 'https://i.ibb.co.com/v6B21T50/2-copper-product-production.webp',
        color: 'from-teal-600 to-emerald-700'
      }
    ]
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


//  export const features = [
//   {
//     icon: Wrench, 
//     title: 'Lifetime Free Maintenance',
//     description: 'Free maintenance and filter replacement for life',
//     color: 'text-green-500'
//   },
//   {
//     icon: Calendar, 
//     title: '7 Days Risk-Free Trial',
//     description: 'Try for 7 days, cancel anytime if not satisfied',
//     color: 'text-blue-500'
//   },
//   {
//     icon: Clock,
//     title: '48-hour Installation',
//     description: 'Quick installation within 48 hours of booking',
//     color: 'text-amber-500'
//   },
//   {
//     icon: Package, 
//     title: 'Plans starting ₹417/month',
//     description: 'Affordable subscription plans with no upfront cost',
//     color: 'text-purple-500'
//   }
// ];

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
