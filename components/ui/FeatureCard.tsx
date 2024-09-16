function FeatureCard({ icon, title, description }: any) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg text-center transition-transform hover:scale-105 hover:bg-gray-900 hover:border hover:border-yellow-400">
        <div className="mb-4 flex justify-center transition-colors">{icon}</div>
        <h3 className="text-xl mb-3 text-yellow-400 font-bold transition-colors">{title}</h3>
        <p className="text-blue-400 text-sm transition-colors">{description}</p>
      </div>
    );
  }
  
  export default FeatureCard;
  