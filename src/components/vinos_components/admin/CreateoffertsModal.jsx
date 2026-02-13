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

const CreateOfferModal = ({ isOpen, onClose, onCreated }) => {
  const [form, setForm] = useState({
    establishmentId: '',
    title: '',
    description: '',
    price: '',
    image: '',
    date_st: '',
    date_ed: '',
  });
  
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
    name: '',
    price: '',
    image: '',
    icon: '',
    other_details: '',
    _file: null,
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
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    // actualizar la query cuando se selecciona un establecimiento
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
    } catch (err) {
      setError('No se pudieron cargar los establecimientos');
    } finally {
      setLoadingEstablishments(false);
    }
  };

  const resetForm = () => {
    setForm({ establishmentId: '', title: '', description: '', price: '', image: '', date_st: '', date_ed: '' });
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

  const handleEstablishmentQueryChange = (e) => {
    const q = e.target.value;
    setEstablishmentQuery(q);
    setShowEstabDropdown(true);
    const filtered = establishments.filter(est => (`${est.name} ${est.city}`).toLowerCase().includes(q.toLowerCase()));
    setFilteredEstablishments(filtered);
    setHighlightedIndex(0);
    // limpiamos selection por si el usuario está buscando otro
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
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(i => Math.min(i + 1, filteredEstablishments.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredEstablishments[highlightedIndex]) {
        handleSelectEstablishment(filteredEstablishments[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowEstabDropdown(false);
    }
  };

  const clearSelectedEstablishment = () => {
    setForm(prev => ({ ...prev, establishmentId: '' }));
    setEstablishmentQuery('');
    setShowEstabDropdown(false);
  };

  const handleOfferImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOfferImageFile(file);
    setOfferImagePreview(URL.createObjectURL(file));
  };

  const handleInventoryChange = (e) => {
    const { name, value } = e.target;
    setInventoryForm(prev => ({ ...prev, [name]: value }));
  };

  const handleInventoryImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setInventoryForm(prev => ({ ...prev, image: preview, _file: file }));
  };

  const openNewInventoryForm = () => {
    setEditingInventoryIndex(null);
    setInventoryForm({ name: '', price: '', image: '', icon: '', other_details: '', _file: null });
    setShowInventoryForm(true);
  };

  const openEditInventoryForm = (index) => {
    const inv = inventories[index];
    setEditingInventoryIndex(index);
    setInventoryForm({ ...inv });
    setShowInventoryForm(true);
  };

  const cancelInventoryForm = () => {
    setShowInventoryForm(false);
    setEditingInventoryIndex(null);
  };

  const saveInventoryToList = () => {
    if (!inventoryForm.name.trim()) {
      setError('El nombre es requerido');
      return;
    }
    if (editingInventoryIndex !== null) {
      setInventories(prev => prev.map((inv, idx) => idx === editingInventoryIndex ? { ...inventoryForm } : inv));
    } else {
      setInventories(prev => [...prev, { ...inventoryForm }]);
    }
    cancelInventoryForm();
    setError(null);
  };

  const removeInventory = (index) => {
    setInventories(prev => prev.filter((_, idx) => idx !== index));
  };

  const goToStep2 = () => {
    if (!form.establishmentId) {
      setError('Selecciona un establecimiento');
      return;
    }
    if (!form.title.trim()) {
      setError('El título es requerido');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      let offerImageUrl = '';
      if (offerImageFile) {
        offerImageUrl = await uploadImage(offerImageFile);
      }

      const offerPayload = {
        establishmentId: form.establishmentId,
        title: form.title,
        description: form.description,
        price: form.price,
        image: offerImageUrl,
      };
      if (form.date_st) offerPayload.date_st = new Date(form.date_st).toISOString();
      if (form.date_ed) offerPayload.date_ed = new Date(form.date_ed).toISOString();

      const createdOffer = await createOffert(offerPayload);

      if (offerImageFile && createdOffer.id) {
        try {
          const finalImageUrl = await uploadOffertImage(createdOffer.id, offerImageFile);
          createdOffer.image = finalImageUrl;
        } catch (e) {}
      }

      for (const inv of inventories) {
        const inventoryPayload = {
          offertId: createdOffer.id,
          name: inv.name,
          price: inv.price,
          icon: inv.icon,
          other_details: inv.other_details,
          image: '',
        };
        const createdInventory = await createInventory(inventoryPayload);
        if (inv._file && createdInventory.id) {
          try {
            const invImageUrl = await uploadInventoryImage(createdInventory.id, inv._file);
            await updateInventory(createdInventory.id, { image: invImageUrl });
          } catch (e) {}
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      
      {/* Modal centrado */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div 
          className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-amber-500 to-amber-600 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍷</span>
              <div>
                <h3 className="text-lg font-semibold text-white">Nueva Oferta</h3>
                <p className="text-amber-100 text-sm">Paso {step} de 2</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress */}
          <div className="h-1 bg-gray-200 shrink-0">
            <div className="h-full bg-amber-500 transition-all" style={{ width: step === 1 ? '50%' : '100%' }} />
          </div>

          {/* Error */}
          {error && (
            <div className="mx-4 mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">⚠️ {error}</div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {step === 1 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 border-b pb-2">📋 Información de la Oferta</h4>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Establecimiento *</label>
                  {loadingEstablishments ? (
                    <div className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-500">Cargando...</div>
                  ) : (
                    <div>
                      <div className="relative">
                        <input
                          type="text"
                          name="establishmentQuery"
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
                            <button
                              key={est.id}
                              type="button"
                              onMouseDown={(e) => { e.preventDefault(); handleSelectEstablishment(est); }}
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
                  <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Ej: Promoción Vino Reserva" />
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
                  ) : (
                    inventories.map((inv, index) => (
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
                    ))
                  )}
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
                  <button onClick={goToStep2} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-lg font-medium">Siguiente →</button>
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