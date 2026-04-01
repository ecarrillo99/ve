import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

const MONTHS = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const DAYS_SHORT = ["do","lu","ma","mi","ju","vi","sá"];

/* ── Scroll drum helper ──────────────────────────────────────── */
function ScrollDrum({ items, value, onChange, formatLabel }) {
  const ref = useRef(null);
  const itemH = 36;

  useEffect(() => {
    const idx = items.indexOf(value);
    if (ref.current && idx !== -1) {
      ref.current.scrollTop = idx * itemH;
    }
  }, [value, items]);

  const handleScroll = () => {
    if (!ref.current) return;
    const idx = Math.round(ref.current.scrollTop / itemH);
    const clamped = Math.max(0, Math.min(idx, items.length - 1));
    if (items[clamped] !== value) onChange(items[clamped]);
  };

  return (
    <div className="relative flex flex-col items-center" style={{ width: 56 }}>
      <div className="absolute top-0 left-0 right-0 h-8 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, white 0%, transparent 100%)" }} />
      <div className="absolute left-0 right-0 border-t border-b border-blue-400 pointer-events-none z-10"
        style={{ top: itemH * 2, height: itemH }} />
      <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, white 0%, transparent 100%)" }} />

      <div
        ref={ref}
        onScroll={handleScroll}
        className="overflow-y-auto scroll-smooth"
        style={{
          height: itemH * 5,
          scrollSnapType: "y mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div style={{ height: itemH * 2 }} />
        {items.map((item) => (
          <div
            key={item}
            onClick={() => {
              onChange(item);
              if (ref.current) ref.current.scrollTop = items.indexOf(item) * itemH;
            }}
            className={`flex items-center justify-center cursor-pointer select-none transition-colors ${
              item === value ? "text-blue-600 font-semibold text-base" : "text-gray-400 text-sm"
            }`}
            style={{ height: itemH, scrollSnapAlign: "start" }}
          >
            {formatLabel ? formatLabel(item) : item}
          </div>
        ))}
        <div style={{ height: itemH * 2 }} />
      </div>
    </div>
  );
}

/* ── Calendar + Time content ──────────────────────────────────── */
function PickerContent({ viewYear, setViewYear, viewMonth, setViewMonth, selDate, selHour, selMin, selectDay, handleHour, handleMinute, isSelected, isToday, getDays, HOURS, MINUTES, today }) {
  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  return (
    <>
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-800 capitalize">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <div className="flex gap-1">
            <button onClick={prevMonth} className="p-1 rounded hover:bg-gray-100 text-gray-500 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={() => { setViewMonth(today.getMonth()); setViewYear(today.getFullYear()); }}
              className="px-2 py-0.5 text-xs rounded hover:bg-gray-100 text-blue-500 font-medium transition-colors">
              Ahora
            </button>
            <button onClick={nextMonth} className="p-1 rounded hover:bg-gray-100 text-gray-500 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {DAYS_SHORT.map(d => (
            <div key={d} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-0.5">
          {getDays().map((day, idx) => (
            <div key={idx} className="flex items-center justify-center">
              {day ? (
                <button
                  onClick={() => selectDay(day)}
                  className={`w-8 h-8 rounded-full text-sm transition-colors font-medium
                    ${isSelected(day)
                      ? "bg-blue-500 text-white"
                      : isToday(day)
                      ? "border border-blue-400 text-blue-600 hover:bg-blue-50"
                      : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {day}
                </button>
              ) : <div className="w-8 h-8" />}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 px-3 py-2">
        <div className="flex items-center justify-center gap-2">
          <ScrollDrum items={HOURS} value={selHour} onChange={handleHour} formatLabel={(h) => String(h).padStart(2, "0")} />
          <span className="text-xl font-bold text-gray-400 mb-0.5">:</span>
          <ScrollDrum items={MINUTES} value={selMin} onChange={handleMinute} formatLabel={(m) => String(m).padStart(2, "0")} />
        </div>
      </div>
    </>
  );
}

/* ── Main component ──────────────────────────────────────────── */
const DateTimePicker = ({ value, onChange, placeholder = "Cualquier día" }) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  const triggerRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile modal is open
  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, isMobile]);

  // Calculate dropdown position relative to viewport (desktop)
  const updateDropdownPosition = useCallback(() => {
    if (!triggerRef.current || isMobile) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const pickerWidth = 300;
    const pickerHeight = 420;

    // Center horizontally on the trigger
    let left = rect.left + rect.width / 2 - pickerWidth / 2;
    if (left < 8) left = 8;
    if (left + pickerWidth > window.innerWidth - 8) left = window.innerWidth - pickerWidth - 8;

    // Position below trigger
    let top = rect.bottom + 8;
    // If not enough space below, position above
    if (top + pickerHeight > window.innerHeight - 8) {
      top = rect.top - pickerHeight - 8;
      if (top < 8) top = 8;
    }

    setDropdownPos({ top, left });
  }, [isMobile]);

  useEffect(() => {
    if (open && !isMobile) {
      updateDropdownPosition();
      window.addEventListener('scroll', updateDropdownPosition, true);
      window.addEventListener('resize', updateDropdownPosition);
      return () => {
        window.removeEventListener('scroll', updateDropdownPosition, true);
        window.removeEventListener('resize', updateDropdownPosition);
      };
    }
  }, [open, isMobile, updateDropdownPosition]);

  // Close on outside click (desktop portal)
  useEffect(() => {
    if (!open || isMobile) return;
    const handleClickOutside = (e) => {
      const portal = document.getElementById('dtp-portal');
      if (
        triggerRef.current && !triggerRef.current.contains(e.target) &&
        (!portal || !portal.contains(e.target))
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, isMobile]);

  const parseValue = (v) => {
    if (!v) return { date: null, hour: 9, minute: 0 };
    const d = new Date(v);
    return { date: d, hour: d.getHours(), minute: d.getMinutes() };
  };

  const parsed = parseValue(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear]   = useState(parsed.date ? parsed.date.getFullYear() : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed.date ? parsed.date.getMonth() : today.getMonth());
  const [selDate, setSelDate]     = useState(parsed.date);
  const [selHour, setSelHour]     = useState(parsed.hour);
  const [selMin, setSelMin]       = useState(parsed.minute);

  const HOURS   = Array.from({ length: 24 }, (_, i) => i);
  const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);

  const getDays = () => {
    const first = new Date(viewYear, viewMonth, 1).getDay();
    const total = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(d);
    return cells;
  };

  const emitChange = (date, hour, minute) => {
    if (!date) return;
    const d = new Date(date);
    d.setHours(hour, minute, 0, 0);
    const pad = (n) => String(n).padStart(2, "0");
    const str = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(hour)}:${pad(minute)}`;
    onChange(str);
  };

  const selectDay = (day) => {
    if (!day) return;
    const d = new Date(viewYear, viewMonth, day, selHour, selMin);
    setSelDate(d);
    emitChange(d, selHour, selMin);
  };

  const handleHour = (h) => {
    setSelHour(h);
    if (selDate) emitChange(selDate, h, selMin);
  };

  const handleMinute = (m) => {
    setSelMin(m);
    if (selDate) emitChange(selDate, selHour, m);
  };

  const isSelected = (day) => {
    if (!selDate || !day) return false;
    return selDate.getDate() === day && selDate.getMonth() === viewMonth && selDate.getFullYear() === viewYear;
  };

  const isToday = (day) => {
    const t = new Date();
    return day === t.getDate() && viewMonth === t.getMonth() && viewYear === t.getFullYear();
  };

  const displayLabel = () => {
    if (!value || !selDate) return null;
    const d = new Date(value);
    const dias = ["dom","lun","mar","mié","jue","vie","sáb"];
    const pad = (n) => String(n).padStart(2, "0");
    return `${dias[d.getDay()]} ${pad(d.getDate())} ${MONTHS[d.getMonth()].slice(0,3)} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const label = displayLabel();

  const handleClear = (e) => {
    e.stopPropagation();
    onChange("");
    setSelDate(null);
  };

  const handleOpen = () => {
    setOpen(true);
    setTimeout(updateDropdownPosition, 0);
  };

  const handleClose = () => setOpen(false);

  const pickerProps = {
    viewYear, setViewYear, viewMonth, setViewMonth,
    selDate, selHour, selMin,
    selectDay, handleHour, handleMinute,
    isSelected, isToday, getDays,
    HOURS, MINUTES, today,
  };

  // ── Trigger ──
  const TriggerEl = (
    <div
      ref={triggerRef}
      className="cursor-pointer flex items-center gap-3 select-none"
      onClick={handleOpen}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#929292" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-normal text-gray-700 block leading-tight">Fecha</span>
        <span className={`text-xs block leading-tight ${label ? "text-gray-700" : "text-gray-400"}`}>
          {label || placeholder}
        </span>
      </div>
      {value && (
        <button
          className="text-gray-400 hover:text-gray-600 text-base leading-none ml-1 shrink-0"
          onClick={handleClear}
        >×</button>
      )}
    </div>
  );

  return (
    <div className="relative w-full">
      {TriggerEl}

      {/* Mobile: bottom sheet modal via portal */}
      {open && isMobile && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/40"
          onClick={handleClose}
        >
          <div
            className="bg-white w-full max-w-md rounded-t-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '85vh', overflowY: 'auto', animation: 'dtp-slide-up 0.25s ease-out' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="font-semibold text-gray-800">Seleccionar fecha y hora</h3>
              <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <PickerContent {...pickerProps} />

            <div className="flex gap-3 p-4 border-t border-gray-100 sticky bottom-0 bg-white">
              <button
                onClick={(e) => { handleClear(e); handleClose(); }}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Limpiar
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 rounded-lg bg-blue-500 text-white font-medium text-sm hover:bg-blue-600 transition-colors"
              >
                Aplicar
              </button>
            </div>
          </div>
          <style>{`
            @keyframes dtp-slide-up {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
          `}</style>
        </div>,
        document.body
      )}

      {/* Desktop: fixed-position dropdown via portal */}
      {open && !isMobile && createPortal(
        <div
          id="dtp-portal"
          className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          style={{
            position: 'fixed',
            top: dropdownPos.top,
            left: dropdownPos.left,
            width: 300,
            zIndex: 9999,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <PickerContent {...pickerProps} />
        </div>,
        document.body
      )}
    </div>
  );
};

export default DateTimePicker;