import React from 'react';

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-10 leading-relaxed">
        Have a question, suggestion, or want to collaborate with us? We'd
        love to hear from you.
      </p>

      <form className="space-y-5 mb-12">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-green-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-green-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            rows="5"
            placeholder="Write your message here..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-green-600"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-800 transition"
        >
          Send Message
        </button>
      </form>

      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Other Ways to Reach Us
        </h2>
        <p className="text-gray-600 text-sm">
          Email: contact@cleanertomorrow.org
        </p>
        <p className="text-gray-600 text-sm">Based in: Delhi, India</p>
      </div>
    </div>
  );
}