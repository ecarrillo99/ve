import { useState, useMemo } from "react";
import OFFER_TYPES from "../../../core/offertTypeConfig";
import Promociones from "../../suscription_components/Promociones/promo";

const CATEGORY_ICONS = {
  rutas: (active) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${active ? "text-[#97C121]" : "text-gray-400"}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  ),

  promociones: (active) => (
  <svg  className={`h-5 w-5 ${active ? "text-[#97C121]" : "text-gray-400"}`}viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.6349 23.8188H22.0516C22.9578 23.8188 23.8268 23.4785 24.4675 22.8727C25.1083 22.267 25.4683 21.4454 25.4683 20.5887C25.4683 19.732 25.1083 18.9104 24.4675 18.3046C23.8268 17.6988 22.9578 17.3585 22.0516 17.3585H16.9266C15.9016 17.3585 15.0474 17.6815 14.5349 18.3276L4.96826 27.049" stroke="#606060" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.9814 33.6562L14.6812 31.3695C15.1874 30.7162 16.031 30.3896 17.0434 30.3896H23.7927C25.6488 30.3896 27.3361 29.7362 28.5172 28.4296L36.2789 21.2429C36.93 20.6473 37.31 19.8257 37.3354 18.9588C37.3607 18.092 37.0292 17.2509 36.4139 16.6206C35.7986 15.9903 34.9498 15.6225 34.0543 15.598C33.1588 15.5735 32.2899 15.8943 31.6388 16.49L24.552 22.8599" stroke="#606060" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3.34985 25.2871L13.5999 34.9776" stroke="#666666" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <g clip-path="url(#clip0_944_9)">
    <path d="M20.5782 5.71713C20.4568 5.29479 20.4755 4.85562 20.6324 4.44033C20.7894 4.02505 21.0795 3.64709 21.476 3.3415C21.8725 3.03591 22.3625 2.81259 22.9005 2.69225C23.4385 2.5719 24.0071 2.55843 24.5537 2.65307C24.8545 2.28968 25.269 1.99064 25.7588 1.78349C26.2486 1.57635 26.7981 1.46777 27.3565 1.46777C27.9149 1.46777 28.4644 1.57635 28.9542 1.78349C29.444 1.99064 29.8585 2.28968 30.1593 2.65307C30.7067 2.55801 31.2763 2.57143 31.8152 2.69207C32.3541 2.81271 32.8447 3.03665 33.2414 3.34306C33.6381 3.64948 33.9281 4.02841 34.0843 4.44461C34.2405 4.86082 34.2578 5.30077 34.1348 5.72355C34.6052 5.9559 34.9924 6.27599 35.2606 6.6543C35.5288 7.03262 35.6694 7.457 35.6694 7.88831C35.6694 8.31963 35.5288 8.744 35.2606 9.12232C34.9924 9.50063 34.6052 9.82072 34.1348 10.0531C34.2573 10.4752 34.2398 10.9144 34.084 11.3299C33.9282 11.7455 33.6391 12.1239 33.2434 12.4301C32.8478 12.7364 32.3584 12.9605 31.8207 13.0817C31.283 13.2029 30.7144 13.2173 30.1676 13.1236C29.8672 13.4883 29.4524 13.7887 28.9618 13.9967C28.4711 14.2048 27.9204 14.3139 27.3607 14.3139C26.8009 14.3139 26.2502 14.2048 25.7596 13.9967C25.2689 13.7887 24.8541 13.4883 24.5537 13.1236C24.0071 13.2182 23.4385 13.2047 22.9005 13.0844C22.3625 12.964 21.8725 12.7407 21.476 12.4351C21.0795 12.1295 20.7894 11.7516 20.6324 11.3363C20.4755 10.921 20.4568 10.4818 20.5782 10.0595C20.1041 9.82775 19.7136 9.50717 19.443 9.12756C19.1724 8.74795 19.0305 8.32165 19.0305 7.88831C19.0305 7.45497 19.1724 7.02867 19.443 6.64906C19.7136 6.26945 20.1041 5.94887 20.5782 5.71713Z" stroke="#666666" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M24.8613 7.88824L26.5247 9.17296L29.8515 6.60352" stroke="#666666" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
    <clipPath id="clip0_944_9">
    <rect width="19.9605" height="15.4167" fill="white" transform="translate(17.3762 0.179932)"/>
    </clipPath>
    </defs>
  </svg>

  ),

  tours: (active) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${active ? "text-[#97C121]" : "text-gray-400"}`}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z" />
    </svg>
  ),

  experiencias: (active) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${active ? "text-[#97C121]" : "text-gray-400"}`}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
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
          availableSubTypes.has(`${cfg.key}::${sub.value.toLowerCase()}`)
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
    if (onSubTypeChange) onSubTypeChange(typeKey, subValue.toLowerCase());
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
                      const isSubActive = isActive && activeSubType === sub.value.toLowerCase();
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