import { useState, useMemo } from "react";
import OFFER_TYPES from "../../../core/offertTypeConfig";

const CATEGORY_ICONS = {
  rutas: (active) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${active ? "text-[#97C121]" : "text-gray-400"}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 3l-.01 6.62c0 1.59.51 3.13 1.46 4.42l.05.07c.9 1.22 1.47 2.69 1.5 4.26V21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-2.63c.03-1.57.6-3.04 1.5-4.26l.05-.07c.95-1.29 1.46-2.83 1.46-4.42L17 3H6z" />
    </svg>
  ),
  descuentos: (active) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${active ? "text-[#97C121]" : "text-gray-400"}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
    </svg>
  ),
  tours: (active) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${active ? "text-[#97C121]" : "text-gray-400"}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z" />
    </svg>
  ),
  experiencias: (active) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${active ? "text-[#97C121]" : "text-gray-400"}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z" />
    </svg>
  ),
};

/** Normaliza type: vinos/vacío → rutas */
const normalizeType = (t) => {
  if (!t || !t.trim()) return "rutas";
  const k = t.toLowerCase().trim();
  return k === "vinos" ? "rutas" : k;
};

/**
 * Sidebar de beneficios.
 * Solo muestra types y subTypes que tienen al menos una oferta en `offers`.
 *
 * @param {Array}         offers          – todas las ofertas crudas del API
 * @param {string}        activeType      – type activo
 * @param {string|null}   activeSubType   – subType activo o null
 * @param {function}      onTypeChange    – callback(typeKey)
 * @param {function}      onSubTypeChange – callback(typeKey, subTypeValue|null)
 */
const BenefitsSidebar = ({
  offers = [],
  activeType,
  activeSubType = null,
  onTypeChange,
  onSubTypeChange,
}) => {
  const [expanded, setExpanded] = useState([activeType]);

  // Calcular qué types y subTypes existen en la data real
  const { availableTypes, availableSubTypes } = useMemo(() => {
    const types = new Set();
    const subTypes = new Set();

    offers.forEach((o) => {
      const t = normalizeType(o.type);
      types.add(t);
      if (o.subType && o.subType.trim()) {
        subTypes.add(`${t}::${o.subType.toLowerCase().trim()}`);
      }
    });

    return { availableTypes: types, availableSubTypes: subTypes };
  }, [offers]);

  // Generar categorías solo con los types que existen en la data
  const visibleCategories = useMemo(() => {
    return Object.values(OFFER_TYPES)
      .filter((cfg) => availableTypes.has(cfg.key))
      .map((cfg) => ({
        key: cfg.key,
        label: cfg.label,
        icon: CATEGORY_ICONS[cfg.key] || CATEGORY_ICONS.rutas,
        subTypes: (cfg.subTypes || []).filter((sub) =>
          availableSubTypes.has(`${cfg.key}::${sub.value}`)
        ),
      }));
  }, [availableTypes, availableSubTypes]);

  const handleCategoryClick = (key) => {
    setExpanded((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
    onTypeChange(key);
    if (onSubTypeChange) onSubTypeChange(key, null);
  };

  const handleSubTypeClick = (typeKey, subValue) => {
    if (activeType !== typeKey) onTypeChange(typeKey);
    if (onSubTypeChange) onSubTypeChange(typeKey, subValue);
  };

  if (visibleCategories.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
      <nav className="py-2">
        {visibleCategories.map((cat) => {
          const isActive = activeType === cat.key;
          const isExpanded = expanded.includes(cat.key);
          const hasSubTypes = cat.subTypes.length > 0;

          return (
            <div key={cat.key}>
              <button
                onClick={() => handleCategoryClick(cat.key)}
                className={`w-full flex items-center justify-between px-5 py-3.5 transition-all duration-200 group cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#97C121]/15 to-[#97C121]/5 border-l-[3px] border-[#97C121]"
                    : "hover:bg-gray-50 border-l-[3px] border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  {cat.icon(isActive)}
                  <span
                    className={`text-[15px] font-semibold tracking-tight transition-colors ${
                      isActive ? "text-[#97C121]" : "text-gray-700 group-hover:text-gray-900"
                    }`}
                  >
                    {cat.label}
                  </span>
                </div>

                {hasSubTypes ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-300 ease-out ${
                      isExpanded ? "rotate-180" : ""
                    } ${isActive ? "text-[#97C121]" : "text-gray-300 group-hover:text-gray-400"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-colors ${
                      isActive ? "text-[#97C121]" : "text-gray-300 group-hover:text-gray-400"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              {hasSubTypes && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="py-1 pl-8 pr-4">
                    {cat.subTypes.map((sub) => {
                      const isSubActive = isActive && activeSubType === sub.value;
                      return (
                        <button
                          key={sub.value}
                          onClick={() => handleSubTypeClick(cat.key, sub.value)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                            isSubActive
                              ? "bg-[#97C121]/10 text-[#97C121] font-medium"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }`}
                        >
                          {sub.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default BenefitsSidebar;