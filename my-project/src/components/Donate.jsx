export default function Donate() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Support Cleaner Tomorrow
      </h1>
      <p className="text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto">
        Your contribution helps us maintain accurate air quality tracking,
        create awareness content, and support on-ground clean air
        initiatives.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border border-gray-200 rounded-xl">
          <h3 className="text-2xl font-bold text-green-700 mb-2">₹100</h3>
          <p className="text-sm text-gray-600">
            Supports a small awareness campaign
          </p>
        </div>
        <div className="p-6 border-2 border-green-700 rounded-xl relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-700 text-white text-xs px-3 py-1 rounded-full">
            Popular
          </span>
          <h3 className="text-2xl font-bold text-green-700 mb-2">₹500</h3>
          <p className="text-sm text-gray-600">
            Helps fund a local clean-up drive
          </p>
        </div>
        <div className="p-6 border border-gray-200 rounded-xl">
          <h3 className="text-2xl font-bold text-green-700 mb-2">₹1000</h3>
          <p className="text-sm text-gray-600">
            Supports research and content development
          </p>
        </div>
      </div>

      <button className="bg-green-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-green-800 transition">
        Donate Now
      </button>

      <p className="text-gray-400 text-xs mt-6">
        All donations go directly towards supporting our mission for cleaner
        air.
      </p>
    </div>
  );
}