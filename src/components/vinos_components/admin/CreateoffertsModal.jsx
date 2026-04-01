import React, { useState, useEffect } from 'react';
import { 
  createOffert,
  createInventory, 
  updateInventory,
  uploadImage,
  uploadOffertImage,
  uploadInventoryImage,
  getEstablishments
} from '../../../core/vinoApiService';
import { OFFER_TYPE_OPTIONS, getOfferTypeConfig, getSubTypeOptions } from '../../../core/offertTypeConfig';

const DAYS = [
  { label: 'Lun', value: 1 },
  { label: 'Mar', value: 2 },
  { label: 'Mié', value: 3 },
  { label: 'Jue', value: 4 },
  { label: 'Vie', value: 5 },
  { label: 'Sáb', value: 6 },
  { label: 'Dom', value: 7 },
];

const DAY_NAMES = { 1: 'Lun', 2: 'Mar', 3: 'Mié', 4: 'Jue', 5: 'Vie', 6: 'Sáb', 7: 'Dom' };

const emptySchedule = () => ({ day_start: 1, day_end: 5, time_st: '08:00', time_ed: '18:00' });

const CreateOfferModal = ({ isOpen, onClose, onCreated, offerType = 'vinos' }) => {
  const typeConfig = getOfferTypeConfig(offerType);
  const [form, setForm] = useState({
    establishmentId: '',
    title: '',
    description: '',
    price: '',
    image: '',
    date_st: '',
    date_ed: '',
    type: offerType,
    subType: '',
  });

  const [schedules, setSchedules] = useState([emptySchedule()]);
  const [establishments, setEstablishments] = useState([]);
  const [loadingEstablishments, setLoadingEstablishments] = useState(false);
  const [establishmentQuery, setEstablishmentQuery] = useState('');
  const [filteredEstablishments, setFilteredEstablishments] = useState([]);
  const [showEstabDropdown, setShowEstabDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [inventories, setInventories] = useState([]);
  const [showInventoryForm, setShowInventoryForm] = useState(false);
  const [editingInventoryIndex, setEditingInventoryIndex] = useState(null);
  const [inventoryForm, setInventoryForm] = useState({
    name: '', price: '', image: '', icon: '', other_details: '', _file: null,
  });
  const [offerImageFile, setOfferImageFile] = useState(null);
  const [offerImagePreview, setOfferImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (isOpen) {
      loadEstablishments();
      resetForm();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (form.establishmentId && establishments.length) {
      const sel = establishments.find(e => e.id === form.establishmentId);
      if (sel) setEstablishmentQuery(`${sel.name} - ${sel.city}`);
    } else {
      setEstablishmentQuery('');
    }
  }, [form.establishmentId, establishments]);

  const loadEstablishments = async () => {
    setLoadingEstablishments(true);
    try {
      const data = await getEstablishments();
      setEstablishments(data || []);
      setFilteredEstablishments(data || []);
    } catch {
      setError('No se pudieron cargar los establecimientos');
    } finally {
      setLoadingEstablishments(false);
    }
  };

  const resetForm = () => {
    setForm({ establishmentId: '', title: '', description: '', price: '', image: '', date_st: '', date_ed: '', type: offerType, subType: '' });
    setSchedules([emptySchedule()]);
    setInventories([]);
    setOfferImageFile(null);
    setOfferImagePreview('');
    setStep(1);
    setError(null);
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // ── Schedules ──────────────────────────────────────────────
  const handleScheduleChange = (index, field, value) =>
    setSchedules(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));

  const addSchedule = () => setSchedules(prev => [...prev, emptySchedule()]);

  const removeSchedule = (index) => setSchedules(prev => prev.filter((_, i) => i !== index));

  const scheduleLabel = (s) =>
    `${DAY_NAMES[s.day_start]} – ${DAY_NAMES[s.day_end]}  ·  ${s.time_st} a ${s.time_ed}`;

  // ── Establishments ─────────────────────────────────────────
  const handleEstablishmentQueryChange = (e) => {
    const q = e.target.value;
    setEstablishmentQuery(q);
    setShowEstabDropdown(true);
    setFilteredEstablishments(establishments.filter(est =>
      (`${est.name} ${est.city}`).toLowerCase().includes(q.toLowerCase())
    ));
    setHighlightedIndex(0);
    if (form.establishmentId) setForm(prev => ({ ...prev, establishmentId: '' }));
  };

  const handleSelectEstablishment = (est) => {
    setForm(prev => ({ ...prev, establishmentId: est.id }));
    setEstablishmentQuery(`${est.name} - ${est.city}`);
    setShowEstabDropdown(false);
    setHighlightedIndex(0);
    setError(null);
  };

  const handleEstabKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightedIndex(i => Math.min(i + 1, filteredEstablishments.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlightedIndex(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (filteredEstablishments[highlightedIndex]) handleSelectEstablishment(filteredEstablishments[highlightedIndex]); }
    else if (e.key === 'Escape') setShowEstabDropdown(false);
  };

  const clearSelectedEstablishment = () => {
    setForm(prev => ({ ...prev, establishmentId: '' }));
    setEstablishmentQuery('');
    setShowEstabDropdown(false);
  };

  // ── Images ─────────────────────────────────────────────────
  const handleOfferImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOfferImageFile(file);
    setOfferImagePreview(URL.createObjectURL(file));
  };

  // ── Inventory ──────────────────────────────────────────────
  const handleInventoryChange = (e) => {
    const { name, value } = e.target;
    setInventoryForm(prev => ({ ...prev, [name]: value }));
  };

  const handleInventoryImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setInventoryForm(prev => ({ ...prev, image: URL.createObjectURL(file), _file: file }));
  };

  const openNewInventoryForm = () => {
    setEditingInventoryIndex(null);
    setInventoryForm({ name: '', price: '', image: '', icon: '', other_details: '', _file: null });
    setShowInventoryForm(true);
  };

  const openEditInventoryForm = (index) => {
    setEditingInventoryIndex(index);
    setInventoryForm({ ...inventories[index] });
    setShowInventoryForm(true);
  };

  const cancelInventoryForm = () => { setShowInventoryForm(false); setEditingInventoryIndex(null); };

  const saveInventoryToList = () => {
    if (!inventoryForm.name.trim()) { setError('El nombre es requerido'); return; }
    if (editingInventoryIndex !== null) {
      setInventories(prev => prev.map((inv, idx) => idx === editingInventoryIndex ? { ...inventoryForm } : inv));
    } else {
      setInventories(prev => [...prev, { ...inventoryForm }]);
    }
    cancelInventoryForm();
    setError(null);
  };

  const removeInventory = (index) => setInventories(prev => prev.filter((_, idx) => idx !== index));

  const goToStep2 = () => {
    if (!form.establishmentId) { setError('Selecciona un establecimiento'); return; }
    if (!form.title.trim()) { setError('El título es requerido'); return; }
    setError(null);
    setStep(2);
  };

  // ── Submit ─────────────────────────────────────────────────
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      let offerImageUrl = '';
      if (offerImageFile) offerImageUrl = await uploadImage(offerImageFile);

      const offerPayload = {
        establishmentId: form.establishmentId,
        title: form.title,
        description: form.description,
        price: form.price,
        image: offerImageUrl,
        type: form.type,
        subType: form.subType || undefined,
        schedules: schedules.map(s => ({
          day_start: Number(s.day_start),
          day_end: Number(s.day_end),
          time_st: s.time_st,
          time_ed: s.time_ed,
        })),
      };
      if (form.date_st) offerPayload.date_st = form.date_st;
      if (form.date_ed) offerPayload.date_ed = form.date_ed;

      const createdOffer = await createOffert(offerPayload);

      if (offerImageFile && createdOffer.id) {
        try {
          const finalImageUrl = await uploadOffertImage(createdOffer.id, offerImageFile);
          createdOffer.image = finalImageUrl;
        } catch {}
      }

      for (const inv of inventories) {
        const inventoryPayload = { offertId: createdOffer.id, name: inv.name, price: inv.price, icon: inv.icon, other_details: inv.other_details, image: '' };
        const createdInventory = await createInventory(inventoryPayload);
        if (inv._file && createdInventory.id) {
          try {
            const invImageUrl = await uploadInventoryImage(createdInventory.id, inv._file);
            await updateInventory(createdInventory.id, { image: invImageUrl });
          } catch {}
        }
      }

      onCreated && onCreated(createdOffer);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'No se pudo crear la oferta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>

          {/* Header */}
          <div className={`flex justify-between items-center p-4 border-b bg-gradient-to-r ${typeConfig.headerGradient} shrink-0`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{form.type === 'tours' ? '🏔️' : '🍷'}</span>
              <div>
                <h3 className="text-lg font-semibold text-white">Nueva Oferta — {typeConfig.label}</h3>
                <p className="text-white/70 text-sm">Paso {step} de 2</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="h-1 bg-gray-200 shrink-0">
            <div className="h-full bg-amber-500 transition-all" style={{ width: step === 1 ? '50%' : '100%' }} />
          </div>

          {error && <div className="mx-4 mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">⚠️ {error}</div>}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 border-b pb-2">📋 Información de la Oferta</h4>

                {/* Tipo de Oferta */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Oferta *</label>
                  <div className="flex gap-2">
                    {OFFER_TYPE_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, type: opt.value }))}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border-2 transition-colors ${
                          form.type === opt.value
                            ? opt.value === 'tours'
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                              : 'bg-amber-50 border-amber-500 text-amber-700'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-Tipo de Oferta */}
                {getSubTypeOptions(form.type).length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Tipo</label>
                    <select
                      name="subType"
                      value={form.subType}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none text-sm"
                    >
                      <option value="">— Sin sub-tipo —</option>
                      {getSubTypeOptions(form.type).map(sub => (
                        <option key={sub.value} value={sub.value}>{sub.label}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Establecimiento */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Establecimiento *</label>
                  {loadingEstablishments ? (
                    <div className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-500">Cargando...</div>
                  ) : (
                    <div>
                      <div className="relative">
                        <input
                          type="text"
                          value={establishmentQuery}
                          onChange={handleEstablishmentQueryChange}
                          onFocus={() => { setShowEstabDropdown(true); setFilteredEstablishments(establishments); }}
                          onKeyDown={handleEstabKeyDown}
                          onBlur={() => setTimeout(() => setShowEstabDropdown(false), 150)}
                          placeholder="Busca por nombre o ciudad..."
                          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                          autoComplete="off"
                        />
                        {form.establishmentId && (
                          <button type="button" onClick={clearSelectedEstablishment} className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">✖</button>
                        )}
                      </div>
                      {showEstabDropdown && filteredEstablishments.length > 0 && (
                        <div className="absolute z-30 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-44 overflow-y-auto">
                          {filteredEstablishments.map((est, idx) => (
                            <button key={est.id} type="button"
                              onMouseDown={e => { e.preventDefault(); handleSelectEstablishment(est); }}
                              onMouseEnter={() => setHighlightedIndex(idx)}
                              className={`w-full text-left px-3 py-2 ${idx === highlightedIndex ? 'bg-amber-50' : 'hover:bg-gray-50'}`}
                            >
                              <div className="text-sm font-medium">{est.name}</div>
                              <div className="text-xs text-gray-500">{est.city} - {est.country}</div>
                            </button>
                          ))}
                        </div>
                      )}
                      {showEstabDropdown && filteredEstablishments.length === 0 && (
                        <div className="mt-2 text-sm text-gray-500">No se encontraron establecimientos</div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                  <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none" placeholder={form.type === 'tours' ? 'Ej: Tour Valle de los Volcanes' : 'Ej: Promoción Vino Reserva'} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                    <input name="price" value={form.price} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
                    <input name="date_st" type="date" value={form.date_st} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
                    <input name="date_ed" type="date" value={form.date_ed} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                </div>

                {/* ── Horarios ── */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">🕐 Horarios de Atención</label>
                    <button type="button" onClick={addSchedule} className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-700 px-2 py-1 rounded-lg font-medium">+ Agregar horario</button>
                  </div>
                  <div className="space-y-3">
                    {schedules.map((s, i) => (
                      <div key={i} className="border rounded-lg p-3 bg-gray-50 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Horario {i + 1}</span>
                          {schedules.length > 1 && (
                            <button type="button" onClick={() => removeSchedule(i)} className="text-red-400 hover:text-red-600 text-xs">✕ Eliminar</button>
                          )}
                        </div>

                        {/* Selección de días */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Día inicio</label>
                            <div className="flex gap-1 flex-wrap">
                              {DAYS.map(d => (
                                <button key={d.value} type="button"
                                  onClick={() => handleScheduleChange(i, 'day_start', d.value)}
                                  className={`px-2 py-1 rounded text-xs font-medium border transition-colors ${
                                    s.day_start === d.value
                                      ? 'bg-amber-500 text-white border-amber-500'
                                      : 'bg-white text-gray-600 border-gray-300 hover:border-amber-400'
                                  }`}
                                >{d.label}</button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Día fin</label>
                            <div className="flex gap-1 flex-wrap">
                              {DAYS.map(d => (
                                <button key={d.value} type="button"
                                  onClick={() => handleScheduleChange(i, 'day_end', d.value)}
                                  className={`px-2 py-1 rounded text-xs font-medium border transition-colors ${
                                    s.day_end === d.value
                                      ? 'bg-amber-500 text-white border-amber-500'
                                      : 'bg-white text-gray-600 border-gray-300 hover:border-amber-400'
                                  }`}
                                >{d.label}</button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Horas */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Hora inicio</label>
                            <input type="time" value={s.time_st} onChange={e => handleScheduleChange(i, 'time_st', e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Hora fin</label>
                            <input type="time" value={s.time_ed} onChange={e => handleScheduleChange(i, 'time_ed', e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                          </div>
                        </div>

                        {/* Preview */}
                        <p className="text-xs text-amber-600 font-medium">📅 {scheduleLabel(s)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Imagen */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                  <div className="flex items-center gap-4">
                    {offerImagePreview && <img src={offerImagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border" />}
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg text-sm border-2 border-dashed flex items-center gap-2">
                      <input type="file" accept="image/*" onChange={handleOfferImageSelect} className="hidden" />
                      📷 {offerImagePreview ? 'Cambiar' : 'Seleccionar'}
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h4 className="font-semibold text-gray-700">🎁 Inventarios / Regalos</h4>
                  <button onClick={openNewInventoryForm} className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1.5 rounded-lg">+ Agregar</button>
                </div>
                <div className="space-y-2">
                  {inventories.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed">
                      <span className="text-4xl block mb-2">📦</span>
                      <p className="text-gray-500">No hay regalos agregados</p>
                    </div>
                  ) : inventories.map((inv, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                      {inv.image ? <img src={inv.image} alt={inv.name} className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">📦</div>}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{inv.name}</p>
                        <p className="text-sm text-gray-500">${inv.price || '0.00'}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openEditInventoryForm(index)} className="text-amber-600 hover:text-amber-700 text-sm font-medium">Editar</button>
                        <button onClick={() => removeInventory(index)} className="text-red-500 hover:text-red-600 text-sm font-medium">Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>

                {showInventoryForm && (
                  <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                    <h5 className="font-medium text-gray-700 mb-3">{editingInventoryIndex !== null ? '✏️ Editar' : '➕ Nuevo'} Regalo</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nombre *</label>
                        <input name="name" value={inventoryForm.name} onChange={handleInventoryChange} className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Precio</label>
                          <input name="price" value={inventoryForm.price} onChange={handleInventoryChange} className="w-full border rounded px-3 py-2 text-sm" placeholder="0.00" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Icono URL</label>
                          <input name="icon" value={inventoryForm.icon} onChange={handleInventoryChange} className="w-full border rounded px-3 py-2 text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Detalles</label>
                        <textarea name="other_details" value={inventoryForm.other_details} onChange={handleInventoryChange} rows={2} className="w-full border rounded px-3 py-2 text-sm resize-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Imagen</label>
                        <div className="flex items-center gap-3">
                          {inventoryForm.image && <img src={inventoryForm.image} alt="Preview" className="w-14 h-14 object-cover rounded border" />}
                          <label className="cursor-pointer bg-white hover:bg-gray-100 px-3 py-2 rounded border text-sm">
                            <input type="file" accept="image/*" onChange={handleInventoryImageSelect} className="hidden" />
                            📷 {inventoryForm.image ? 'Cambiar' : 'Subir'}
                          </label>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button type="button" onClick={cancelInventoryForm} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded text-sm">Cancelar</button>
                        <button type="button" onClick={saveInventoryToList} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded text-sm">
                          {editingInventoryIndex !== null ? 'Actualizar' : 'Agregar'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50 shrink-0">
            <div className="flex gap-3">
              {step === 1 ? (
                <>
                  <button onClick={onClose} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 rounded-lg font-medium">Cancelar</button>
                {/*  <button onClick={goToStep2} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-lg font-medium">Siguiente →</button>*/}
                        <button onClick={handleSubmit} disabled={loading} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-medium disabled:bg-green-300">
                    {loading ? '⏳ Creando...' : '✓ Crear Oferta'}
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setStep(1)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 rounded-lg font-medium">← Volver</button>
                  <button onClick={handleSubmit} disabled={loading} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-medium disabled:bg-green-300">
                    {loading ? '⏳ Creando...' : '✓ Crear Oferta'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOfferModal;