import { useState } from 'react';
import { Info, X } from 'lucide-react';

export function StandardBadge() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-[#0c2340]/90 text-white text-xs rounded-lg shadow-lg hover:bg-[#0c2340] transition-all duration-300 backdrop-blur-sm"
      >
        <Info className="w-3.5 h-3.5" />
        <span className="font-medium">Standard Package Demo</span>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 p-5 text-sm">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 p-0.5 rounded hover:bg-gray-100 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#0c2340] rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-[#0c2340] mb-1">Standard Package Demo</h4>
              <p className="text-gray-600 leading-relaxed">
                This demo represents the Standard Website Package (₹40,000-50,000 NPR). Upgrade to Pro or Elite for advanced features like Online Payment, Student Portals, Auto-Timetable, and more.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
