import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import UploadImageInput from '../../global_components/UploadImageInput/UploadImageInput';
import { 
  updateOffert, 
  createInventory, 
  updateInventory, 
  uploadOffertImage,
  uploadInventoryImage 
} from '../../../core/vinoApiService';

const EditOfferModal = ({ isOpen, onClose, offer, inventory, mode = 'offer', onUpdated }) => {
    const [form, setForm] = useState({
      title: '', description: '', price: '', image: '', date_st: '', date_ed: '',
    });
    const [inventories, setInventories] = useState([]);
    const [editingInventory, setEditingInventory] = useState(null);
    const [showInventoryForm, setShowInventoryForm] = useState(false);
    const [inventoryForm, setInventoryForm] = useState({
      name: '', price: '', image: '', icon: '', other_details: '', quantity: '', description: '',
    });
    const [loading, setLoading] = useState(false);
    const [loadingInventory, setLoadingInventory] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
      if (offer) {
        setForm({
          title: offer.title || '',
          description: offer.description || '',
          price: offer.price || '',
          image: offer.image || '',
          date_st: offer.date_st ? offer.date_st.split('T')[0] : '',
          date_ed: offer.date_ed ? offer.date_ed.split('T')[0] : '',
        });
        setInventories(offer.inventories || []);
      }
    }, [offer]);

    useEffect(() => {
      if (mode === 'inventory' && inventory) {
        setEditingInventory(inventory);
        setInventoryForm({
          name: inventory.name || '',
          price: inventory.price || '',
          image: inventory.image || '',
          icon: inventory.icon || '',
          other_details: inventory.other_details || '',
          quantity: inventory.quantity || '',
          description: inventory.description || '',
        });
      }
    }, [mode, inventory]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  if (mode === 'inventory') {
    const handleImageUploadedStandalone = (url) => {
      setInventoryForm(prev => ({ ...prev, image: url }));
    };

    const handleSubmitInventoryStandalone = async (e) => {
      e && e.preventDefault && e.preventDefault();
      if (!inventoryForm.name.trim()) { setError('El nombre es requerido'); return; }
      setLoadingInventory(true); setError(null);
      try {
        const payload = {
          name: inventoryForm.name,
          description: inventoryForm.description || inventoryForm.other_details,
          price: inventoryForm.price,
          image: inventoryForm.image,
          quantity: inventoryForm.quantity,
        };
        const inventoryId = (editingInventory && (editingInventory.id || editingInventory.Id)) || (inventory && (inventory.id || inventory.Id));
        const result = await updateInventory(inventoryId, payload);
        setSuccessMessage('Inventario actualizado');
        setTimeout(() => setSuccessMessage(null), 2000);
        onUpdated && onUpdated(result);
        onClose && onClose();
      } catch (err) {
        console.error(err);
        setError('No se pudo actualizar el inventario');
      } finally {
        setLoadingInventory(false);
      }
    };

    const modalInventoryContent = (
      <div className="fixed inset-0 z-[9999]" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />
        <div className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl my-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-amber-500 to-amber-600 rounded-t-xl">
              <h3 className="text-lg font-semibold text-white">✏️ Editar Inventario</h3>
              <button onClick={onClose} className="text-white/80 hover:text-white p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {error && <div className="mx-4 mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">⚠️ {error}</div>}
            {successMessage && <div className="mx-4 mt-4 bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded-lg text-sm">✅ {successMessage}</div>}

            <form onSubmit={handleSubmitInventoryStandalone} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                  <input name="name" value={inventoryForm.name} onChange={(e) => setInventoryForm(prev => ({ ...prev, [e.target.name]: e.target.value }))} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea name="description" value={inventoryForm.description || inventoryForm.other_details} onChange={(e) => setInventoryForm(prev => ({ ...prev, [e.target.name]: e.target.value }))} rows={3} className="w-full border rounded-lg px-3 py-2 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                    <input name="price" value={inventoryForm.price} onChange={(e) => setInventoryForm(prev => ({ ...prev, [e.target.name]: e.target.value }))} className="w-full border rounded-lg px-3 py-2" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                    <input name="quantity" value={inventoryForm.quantity} onChange={(e) => setInventoryForm(prev => ({ ...prev, [e.target.name]: e.target.value }))} className="w-full border rounded-lg px-3 py-2" placeholder="0" />
                  </div>
                </div>
                <div>
                  <UploadImageInput mode="inventory" targetId={inventory?.id || inventory?.Id} currentImage={inventoryForm.image} onUploaded={handleImageUploadedStandalone} label="Imagen del producto" />
                  {inventoryForm.image && <div className="mt-2"><img src={inventoryForm.image} alt="Preview" className="w-full h-40 object-cover rounded-lg border" /></div>}
                </div>

                {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancelar</button>
                <button type="submit" disabled={loadingInventory} className={`px-4 py-2 text-white rounded-lg ${loadingInventory ? 'bg-amber-400' : 'bg-amber-500 hover:bg-amber-600'}`}>
                  {loadingInventory ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );

    return ReactDOM.createPortal(modalInventoryContent, document.body);
  }

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      const imageUrl = await uploadOffertImage(offer.id, file);
      if (imageUrl) {
        setForm(prev => ({ ...prev, image: imageUrl }));
        setSuccessMessage('Imagen actualizada');
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) { setError('Error al subir la imagen'); }
    finally { setLoading(false); }
  };

  const handleSubmitOffer = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('El título es requerido'); return; }
    setLoading(true); setError(null);
    try {
      const payload = { title: form.title, description: form.description, price: form.price, image: form.image };
      if (form.date_st) payload.date_st = new Date(form.date_st).toISOString();
      if (form.date_ed) payload.date_ed = new Date(form.date_ed).toISOString();
      await updateOffert(offer.id, payload);
      setSuccessMessage('Oferta actualizada');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) { setError('No se pudo actualizar'); }
    finally { setLoading(false); }
  };

  const handleInventoryChange = (e) => setInventoryForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleInventoryImageUpload = async (e, inventoryId = null) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoadingInventory(true);
      if (inventoryId) {
        const imageUrl = await uploadInventoryImage(inventoryId, file);
        if (imageUrl) {
          setInventoryForm(prev => ({ ...prev, image: imageUrl }));
          setInventories(prev => prev.map(inv => inv.id === inventoryId ? { ...inv, image: imageUrl } : inv));
        }
      } else {
        setInventoryForm(prev => ({ ...prev, image: URL.createObjectURL(file), _file: file }));
      }
    } catch (err) { setError('Error al subir imagen'); }
    finally { setLoadingInventory(false); }
  };

  const openNewInventoryForm = () => {
    setEditingInventory(null);
    setInventoryForm({ name: '', price: '', image: '', icon: '', other_details: '' });
    setShowInventoryForm(true);
  };

  const openEditInventoryForm = (inventory) => {
    setEditingInventory(inventory);
    setInventoryForm({ name: inventory.name || '', price: inventory.price || '', image: inventory.image || '', icon: inventory.icon || '', other_details: inventory.other_details || '' });
    setShowInventoryForm(true);
  };

  const cancelInventoryForm = () => { setShowInventoryForm(false); setEditingInventory(null); };

  const handleSubmitInventory = async (e) => {
    e.preventDefault();
    if (!inventoryForm.name.trim()) { setError('El nombre es requerido'); return; }
    setLoadingInventory(true); setError(null);
    try {
      const payload = { name: inventoryForm.name, price: inventoryForm.price, image: inventoryForm.image, icon: inventoryForm.icon, other_details: inventoryForm.other_details };
      if (editingInventory) {
        const updated = await updateInventory(editingInventory.id, payload);
        if (mode === 'inventory') {
          setSuccessMessage('Inventario actualizado');
          setTimeout(() => setSuccessMessage(null), 3000);
          onUpdated && onUpdated(updated);
          onClose && onClose();
        } else {
          setInventories(prev => prev.map(inv => inv.id === editingInventory.id ? { ...inv, ...updated } : inv));
          setSuccessMessage('Inventario actualizado');
        }
      } else {
        payload.offertId = offer.id;
        const created = await createInventory(payload);
        if (inventoryForm._file && created.id) {
          const imageUrl = await uploadInventoryImage(created.id, inventoryForm._file);
          if (imageUrl) { await updateInventory(created.id, { image: imageUrl }); created.image = imageUrl; }
        }
        setInventories(prev => [...prev, created]);
        setSuccessMessage('Inventario creado');
      }
      setTimeout(() => setSuccessMessage(null), 3000);
      cancelInventoryForm();
    } catch (err) { setError('Error al guardar'); }
    finally { setLoadingInventory(false); }
  };

  const handleClose = () => { onUpdated && onUpdated({ ...offer, inventories }); onClose(); };

  const modalContent = (
    <div className="fixed inset-0 z-[9999]" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl my-8" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-amber-500 to-amber-600 rounded-t-xl">
            <h3 className="text-lg font-semibold text-white">✏️ Editar: {offer?.title}</h3>
            <button onClick={handleClose} className="text-white/80 hover:text-white p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && <div className="mx-4 mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">⚠️ {error}</div>}
          {successMessage && <div className="mx-4 mt-4 bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded-lg text-sm">✅ {successMessage}</div>}

          {/* Content */}
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* COLUMNA IZQUIERDA */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 border-b pb-2">📋 Datos de la Oferta</h4>
                <form onSubmit={handleSubmitOffer} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                    <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={2} className="w-full border rounded-lg px-3 py-2 outline-none resize-none" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                      <input name="price" value={form.price} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 outline-none" placeholder="0.00" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Inicio</label>
                      <input name="date_st" type="date" value={form.date_st} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
                      <input name="date_ed" type="date" value={form.date_ed} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                    <div className="flex items-center gap-3">
                      {form.image && <img src={form.image} alt="Oferta" className="w-16 h-16 object-cover rounded-lg border" />}
                      <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        📷 {form.image ? 'Cambiar' : 'Subir'}
                      </label>
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-lg font-medium disabled:bg-amber-300">
                    {loading ? '⏳ Guardando...' : '💾 Guardar Oferta'}
                  </button>
                </form>
              </div>

              {/* COLUMNA DERECHA */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h4 className="font-semibold text-gray-700">🎁 Inventarios</h4>
                  <button onClick={openNewInventoryForm} className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1.5 rounded-lg">+ Agregar</button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {inventories.length === 0 ? (
                    <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed"><span className="text-3xl">📦</span><p className="text-gray-400 text-sm mt-2">Sin inventarios</p></div>
                  ) : inventories.map((inv) => (
                    <div key={inv.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border hover:border-amber-300">
                      {inv.image ? <img src={inv.image} alt={inv.name} className="w-10 h-10 object-cover rounded" /> : <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">📦</div>}
                      <div className="flex-1 min-w-0"><p className="font-medium text-sm truncate">{inv.name}</p><p className="text-xs text-gray-500">${inv.price || '0.00'}</p></div>
                      <button onClick={() => openEditInventoryForm(inv)} className="text-amber-600 hover:text-amber-700 text-sm font-medium">Editar</button>
                    </div>
                  ))}
                </div>

                {showInventoryForm && (
                  <div className="border-2 border-amber-200 rounded-lg p-3 bg-amber-50">
                    <h5 className="font-medium text-gray-700 mb-3">{editingInventory ? '✏️ Editar' : '➕ Nuevo'} Inventario</h5>
                    <form onSubmit={handleSubmitInventory} className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nombre *</label>
                        <input name="name" value={inventoryForm.name} onChange={handleInventoryChange} className="w-full border rounded px-2 py-1.5 text-sm outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div><label className="block text-xs font-medium text-gray-600 mb-1">Precio</label><input name="price" value={inventoryForm.price} onChange={handleInventoryChange} className="w-full border rounded px-2 py-1.5 text-sm" placeholder="0.00" /></div>
                        <div><label className="block text-xs font-medium text-gray-600 mb-1">Icono URL</label><input name="icon" value={inventoryForm.icon} onChange={handleInventoryChange} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
                      </div>
                      <div><label className="block text-xs font-medium text-gray-600 mb-1">Detalles</label><textarea name="other_details" value={inventoryForm.other_details} onChange={handleInventoryChange} rows={2} className="w-full border rounded px-2 py-1.5 text-sm resize-none" /></div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Imagen</label>
                        <div className="flex items-center gap-2">
                          {inventoryForm.image && <img src={inventoryForm.image} alt="Preview" className="w-12 h-12 object-cover rounded border" />}
                          <label className="cursor-pointer bg-white hover:bg-gray-100 px-2 py-1 rounded border text-xs">
                            <input type="file" accept="image/*" onChange={(e) => handleInventoryImageUpload(e, editingInventory?.id)} className="hidden" />
                            📷 {inventoryForm.image ? 'Cambiar' : 'Subir'}
                          </label>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={cancelInventoryForm} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1.5 rounded text-sm">Cancelar</button>
                        <button type="submit" disabled={loadingInventory} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1.5 rounded text-sm disabled:bg-green-300">
                          {loadingInventory ? 'Guardando...' : (editingInventory ? 'Actualizar' : 'Crear')}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50 rounded-b-xl">
            <button onClick={handleClose} className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2.5 rounded-lg font-medium">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );

  // USAR PORTAL PARA RENDERIZAR EN EL BODY
  return ReactDOM.createPortal(modalContent, document.body);
};

export default EditOfferModal;