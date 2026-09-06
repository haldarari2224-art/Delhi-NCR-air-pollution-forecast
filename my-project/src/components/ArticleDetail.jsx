import React from "react";
import { useParams, Link } from "react-router-dom";
import { articles } from "./Articles";

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === Number(id));

  
      <div className="px-10 py-16 text-center">
        <p className="text-gray-500">Article not found.</p>
        <Link to="/articles" className="text-green-700 underline">
          Back to All Articles
        </Link>
      </div>
   

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link
        to="/articles"
        className="text-green-700 text-sm font-medium hover:underline"
      >
        ← Back to All Articles
      </Link>

      <div className="mt-4">
        <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700 font-medium">
          {article.tag}
        </span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-3">
        {article.title}
      </h1>
      <p className="text-gray-600 mb-4">{article.desc}</p>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        <span>{article.date}</span>
      </div>

      <img
        src={article.image}
        alt={article.title}
        className="w-full h-80 object-cover rounded-lg mb-8"
      />

      {article.takeaways && (
        <div className="bg-green-50 border border-green-100 rounded-lg p-5 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Key Takeaways
          </h2>
          <ul className="space-y-2">
            {article.takeaways.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="text-green-600">✅</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {article.causes && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            What's Causing It?
          </h2>
          <ol className="space-y-3">
            {article.causes.map((c, i) => (
              <li key={i} className="flex gap-3">
                <span className="bg-green-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-1">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">
                    {c.title}
                  </span>{" "}
                  – {c.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}