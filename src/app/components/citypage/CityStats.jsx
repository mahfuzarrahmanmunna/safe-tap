// app/components/city-page/CityStats.jsx
export default function CityStats({ stats, cityName, theme }) {
  if (!stats) return null;
  
  return (
    <div className={`md:hidden ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-lg -mt-12 mx-4 rounded-2xl shadow-xl p-6 relative z-10`}>
      <h3 className="text-xl font-bold mb-4">SafeTap in {cityName}</h3>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="text-center">
            <div className="text-2xl font-bold text-cyan-600">{value}</div>
            <div className="text-sm text-gray-600 capitalize">{key}</div>
          </div>
        ))}
      </div>
    </div>
  );
}