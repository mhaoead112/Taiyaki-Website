import React from 'react';

const Toast = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur bg-black/80 border ${
            t.type === 'error' ? 'border-red-600 text-red-200' : t.type === 'success' ? 'border-green-600 text-green-200' : 'border-white/20 text-white'
          }`}
          role="status"
          aria-live="polite"
        >
          <span className="text-sm">{t.message}</span>
          <button onClick={() => onDismiss(t.id)} className="ml-2 text-xs hover:opacity-70">Dismiss</button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
