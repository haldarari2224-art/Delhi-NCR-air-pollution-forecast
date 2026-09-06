import { useState } from "react";

export default function FAQs() {
  const faqs = [
    {
      q: "What is Cleaner Tomorrow?",
      a: "Cleaner Tomorrow is a platform that tracks air quality in Delhi and educates people on pollution's causes, effects, and solutions.",
    },
    {
      q: "How accurate is the AQI data shown on the site?",
      a: "Our AQI data is sourced from publicly available monitoring stations and updated regularly, but it should be used as a general guide rather than an exact medical reference.",
    },
    {
      q: "Can I use this site outside of Delhi?",
      a: "Currently, our focus is on Delhi and nearby NCR regions. We plan to expand coverage to more cities in the future.",
    },
    {
      q: "How can I contribute to the cause?",
      a: "You can volunteer with us, spread awareness, or support through donations. Check our Volunteer and Donate pages for more details.",
    },
    {
      q: "Is my personal data safe on this site?",
      a: "Yes. We only collect minimal, non-personal data to improve your experience. Read our Privacy Policy for full details.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left px-5 py-4 flex justify-between items-center font-medium text-gray-900 hover:bg-gray-50"
            >
              {item.q}
              <span className="text-green-700 text-xl">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <p className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}