import React, { useState } from "react";
import qrImage from "../assets/airnova72_qr.png";

const WEBSITE_URL = "https://delhi-air-pollution-forecast-j4wv.onrender.com";

function QRCodeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(WEBSITE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 text-center transform transition-all animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Website QR
        </div>

        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          AirNova<span className="text-emerald-700">72</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 mb-5">
          Scan with your smartphone camera to access the live coupled air forecasting system
        </p>

        {/* QR Code Container */}
        <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 p-3 bg-white rounded-2xl border-2 border-emerald-800/20 shadow-inner flex items-center justify-center group">
          <img
            src={qrImage}
            alt="AirNova72 QR Code"
            className="w-full h-full object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-200"
          />
        </div>

        {/* URL Pill */}
        <div className="mt-4 flex items-center justify-between gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
          <span className="truncate font-mono select-all text-slate-600">{WEBSITE_URL}</span>
          <button
            onClick={handleCopy}
            className="shrink-0 px-2.5 py-1 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Download & Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <a
            href={qrImage}
            download="AirNova72_QR.png"
            className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
          >
            <span>⬇️</span> Download QR
          </a>
          <a
            href={WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span>🌐</span> Open Link
          </a>
        </div>

        <p className="text-[11px] text-slate-400 mt-4">
          Smart India Hackathon • Real-Time 72h Coupled ML Atmospheric Forecast
        </p>
      </div>
    </div>
  );
}

export default QRCodeModal;
