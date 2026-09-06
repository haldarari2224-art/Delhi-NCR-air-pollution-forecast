import React from 'react'
function WDIMsection (){
    return(
         <div className="w-full px-10 py-16 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-3">Why does it matter?</h2>
      <p className="text-gray-600 mb-2">
        Air pollution is not just an environmental issue, it's a health emergency.
      </p>
      <p className="text-gray-600 mb-10">
        Let's understand, act and bring change.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full border-2 border-green-700 flex items-center justify-center mb-3">
            <span className="text-green-700 text-xl">❤️</span>
          </div>
          <p className="text-sm font-medium text-gray-700">Affects Health</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full border-2 border-green-700 flex items-center justify-center mb-3">
            <span className="text-green-700 text-xl">🌍</span>
          </div>
          <p className="text-sm font-medium text-gray-700">Harms Environment</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full border-2 border-green-700 flex items-center justify-center mb-3">
            <span className="text-green-700 text-xl">👁️</span>
          </div>
          <p className="text-sm font-medium text-gray-700">Reduces Visibility</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full border-2 border-green-700 flex items-center justify-center mb-3">
            <span className="text-green-700 text-xl">💰</span>
          </div>
          <p className="text-sm font-medium text-gray-700">Impacts Economy</p>
        </div>
      </div>
    </div>
  )
}

export default WDIMsection

