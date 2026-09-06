export default function Volunteer() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Volunteer With Us
      </h1>
      <p className="text-gray-600 mb-10 leading-relaxed">
        Join a growing community of people working towards cleaner air and
        a healthier tomorrow. No experience needed — just passion.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="p-5 border border-gray-200 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-2">
            📢 Spread Awareness
          </h3>
          <p className="text-sm text-gray-600">
            Share verified information about air quality within your
            community, school, or workplace.
          </p>
        </div>
        <div className="p-5 border border-gray-200 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-2">
            🌱 Local Clean-Up Drives
          </h3>
          <p className="text-sm text-gray-600">
            Join or organize tree plantation and waste reduction drives in
            your neighborhood.
          </p>
        </div>
        <div className="p-5 border border-gray-200 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-2">
            💻 Tech & Content
          </h3>
          <p className="text-sm text-gray-600">
            Help us build features, write articles, or design content for
            the platform.
          </p>
        </div>
        <div className="p-5 border border-gray-200 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-2">
            🎤 Community Events
          </h3>
          <p className="text-sm text-gray-600">
            Support or host local workshops and awareness sessions.
          </p>
        </div>
      </div>

      <form className="space-y-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Sign Up as a Volunteer
        </h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-green-600"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-green-600"
        />
        <textarea
          rows="4"
          placeholder="Why do you want to volunteer with us?"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-green-600"
        ></textarea>
        <button
          type="submit"
          className="bg-green-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-800 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}