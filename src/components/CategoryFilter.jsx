import { useRef, useEffect } from 'react';

export default function CategoryFilter({ categories, active, onChange }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeBtn = el.querySelector('[data-active="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [active]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none"
      style={{ scrollbarWidth: 'none' }}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          data-active={cat === active}
          className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer"
          style={{
            backgroundColor: cat === active ? 'var(--primary)' : '#f3f4f6',
            color: cat === active ? '#fff' : '#374151',
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
