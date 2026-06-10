import { useState } from 'react';
import { Megaphone, X } from 'lucide-react';
import { getNotices } from '../lib/cms';

export function NoticeBar() {
  const [visible, setVisible] = useState(true);
  const notices = getNotices();
  const notice = notices[0];

  if (!visible || !notice) return null;

  return (
    <div className="bg-[#c9a962] text-white">
      <div className="container mx-auto px-6 flex items-center justify-between py-2.5">
        <div className="flex items-center gap-3 min-w-0">
          <Megaphone className="w-4 h-4 shrink-0" />
          <span className="text-sm font-medium truncate">
            <strong>{notice.title}:</strong> {notice.content}
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 ml-4 p-0.5 rounded hover:bg-white/20 transition-colors"
          aria-label="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
