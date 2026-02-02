import React, { useState, useEffect } from 'react';
import { 
  updateOffert, 
  createInventory, 
  updateInventory, 
  uploadOffertImage,
  uploadInventoryImage 
} from '../../../core/vinoApiService';

const EditOfferModal = ({ isOpen, onClose, offer, onUpdated }) => {
  // Estado del formulario de oferta
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    date_st: '',
    date_ed: '',
  });
  
  // Estado de inventarios
  const [inventories, setInventories] = useState([]);
  const [editingInventory, setEditingInventory] = useState(null);
  const [showInventoryForm, setShowInventoryForm] = useState(false);
  const [inventoryForm, setInventoryForm] = useState({
    name: '',
    price: '',
    image: '',
    icon: '',
    other_details: '',
  });

  const [loading, setLoading] = useState(false);
  const [loadingInventory, setLoadingInventory] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Cargar datos de la oferta
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

  if (!isOpen) return null;

  // Handlers de oferta
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const imageUrl = await uploadOffertImage(offer.id, file);
      if (imageUrl) {
        setForm(prev => ({ ...prev, image: imageUrl }));
        setSuccessMessage('Imagen de oferta actualizada');
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      setError('Error al subir la imagen');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOffer = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('El título es requerido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        title: form.title,
        description: form.description,
        price: form.price,
        image: form.image,
      };
      
      if (form.date_st) payload.date_st = new Date(form.date_st).toISOString();
      if (form.date_ed) payload.date_ed = new Date(form.date_ed).toISOString();

      await updateOffert(offer.id, payload);
      setSuccessMessage('Oferta actualizada correctamente');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setError('No se pudo actualizar la oferta');
    } finally {
      setLoading(false);
    }
  };

  // Handlers de inventario
  const handleInventoryChange = (e) => {
    const { name, value } = e.target;
    setInventoryForm(prev => ({ ...prev, [name]: value }));
  };

  const handleInventoryImageUpload = async (e, inventoryId = null) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoadingInventory(true);
      
      if (inventoryId) {
        const imageUrl = await uploadInventoryImage(inventoryId, file);
        if (imageUrl) {
          setInventoryForm(prev => ({ ...prev, image: imageUrl }));
          setInventories(prev => prev.map(inv => 
            inv.id === inventoryId ? { ...inv, image: imageUrl } : inv
          ));
        }
      } else {
        const localUrl = URL.createObjectURL(file);
        setInventoryForm(prev => ({ ...prev, image: localUrl, _file: file }));
      }
    } catch (err) {
      setError('Error al subir imagen del inventario');
    } finally {
      setLoadingInventory(false);
    }
  };

  const openNewInventoryForm = () => {
    setEditingInventory(null);
    setInventoryForm({
      name: '',
      price: '',
      image: '',
      icon: '',
      other_details: '',
    });
    setShowInventoryForm(true);
  };

  const openEditInventoryForm = (inventory) => {
    setEditingInventory(inventory);
    setInventoryForm({
      name: inventory.name || '',
      price: inventory.price || '',
      image: inventory.image || '',
      icon: inventory.icon || '',
      other_details: inventory.other_details || '',
    });
    setShowInventoryForm(true);
  };

  const cancelInventoryForm = () => {
    setShowInventoryForm(false);
    setEditingInventory(null);
    setInventoryForm({
      name: '',
      price: '',
      image: '',
      icon: '',
      other_details: '',
    });
  };

  const handleSubmitInventory = async (e) => {
    e.preventDefault();
    
    if (!inventoryForm.name.trim()) {
      setError('El nombre del inventario es requerido');
      return;
    }

    setLoadingInventory(true);
    setError(null);

    try {
      const payload = {
        name: inventoryForm.name,
        price: inventoryForm.price,
        image: inventoryForm.image,
        icon: inventoryForm.icon,
        other_details: inventoryForm.other_details,
      };

      if (editingInventory) {
        const updated = await updateInventory(editingInventory.id, payload);
        setInventories(prev => prev.map(inv => 
          inv.id === editingInventory.id ? { ...inv, ...updated } : inv
        ));
        setSuccessMessage('Inventario actualizado');
      } else {
        payload.offertId = offer.id;
        const created = await createInventory(payload);
        
        if (inventoryForm._file && created.id) {
          const imageUrl = await uploadInventoryImage(created.id, inventoryForm._file);
          if (imageUrl) {
            await updateInventory(created.id, { image: imageUrl });
            created.image = imageUrl;
          }
        }
        
        setInventories(prev => [...prev, created]);
        setSuccessMessage('Inventario creado');
      }

      setTimeout(() => setSuccessMessage(null), 3000);
      cancelInventoryForm();
    } catch (err) {
      console.error(err);
      setError(editingInventory ? 'No se pudo actualizar el inventario' : 'No se pudo crear el inventario');
    } finally {
      setLoadingInventory(false);
    }
  };

  const handleClose = () => {
    onUpdated && onUpdated({ ...offer, inventories });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-black/50" onClick={handleClose} />
      
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl z-10 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">
            Editar Oferta: {offer?.title}
          </h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mensajes */}
        {error && (
          <div className="mx-4 mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mx-4 mt-4 bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* COLUMNA IZQUIERDA: Datos de la Oferta */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 border-b pb-2">📋 Datos de la Oferta</h4>
              
              <form onSubmit={handleSubmitOffer} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="Título de la oferta"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                    <input
                      name="price"
                      type="text"
                      value={form.price}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Inicio</label>
                    <input
                      name="date_st"
                      type="date"
                      value={form.date_st}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
                    <input
                      name="date_ed"
                      type="date"
                      value={form.date_ed}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                  <div className="flex items-center gap-3">
                    {form.image && (
                      <img src={form.image} alt="Oferta" className="w-16 h-16 object-cover rounded-lg border" />
                    )}
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm transition-colors">
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      📷 {form.image ? 'Cambiar' : 'Subir'} imagen
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-medium transition-colors disabled:bg-amber-300"
                >
                  {loading ? 'Guardando...' : '💾 Guardar Oferta'}
                </button>
              </form>
            </div>

            {/* COLUMNA DERECHA: Inventarios */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h4 className="font-semibold text-gray-700">🎁 Inventarios / Regalos</h4>
                <button
                  onClick={openNewInventoryForm}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-lg transition-colors"
                >
                  + Agregar
                </button>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {inventories.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">No hay inventarios asociados</p>
                ) : (
                  inventories.map((inv) => (
                    <div key={inv.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border hover:border-amber-300 transition-colors">
                      {inv.image ? (
                        <img src={inv.image} alt={inv.name} className="w-10 h-10 object-cover rounded" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-400">📦</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{inv.name}</p>
                        <p className="text-xs text-gray-500">${inv.price || '0.00'}</p>
                      </div>
                      <button onClick={() => openEditInventoryForm(inv)} className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                        Editar
                      </button>
                    </div>
                  ))
                )}
              </div>

              {showInventoryForm && (
                <div className="border-2 border-amber-200 rounded-lg p-3 bg-amber-50">
                  <h5 className="font-medium text-gray-700 mb-3">
                    {editingInventory ? '✏️ Editar Inventario' : '➕ Nuevo Inventario'}
                  </h5>
                  
                  <form onSubmit={handleSubmitInventory} className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Nombre *</label>
                      <input
                        name="name"
                        value={inventoryForm.name}
                        onChange={handleInventoryChange}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                        placeholder="Nombre del producto"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Precio</label>
                        <input
                          name="price"
                          value={inventoryForm.price}
                          onChange={handleInventoryChange}
                          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Icono (URL)</label>
                        <input
                          name="icon"
                          value={inventoryForm.icon}
                          onChange={handleInventoryChange}
                          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                          placeholder="URL del icono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Detalles adicionales</label>
                      <textarea
                        name="other_details"
                        value={inventoryForm.other_details}
                        onChange={handleInventoryChange}
                        rows={2}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Imagen</label>
                      <div className="flex items-center gap-2">
                        {inventoryForm.image && (
                          <img src={inventoryForm.image} alt="Preview" className="w-12 h-12 object-cover rounded border" />
                        )}
                        <label className="cursor-pointer bg-white hover:bg-gray-100 px-2 py-1 rounded border text-xs transition-colors">
                          <input type="file" accept="image/*" onChange={(e) => handleInventoryImageUpload(e, editingInventory?.id)} className="hidden" />
                          📷 {inventoryForm.image ? 'Cambiar' : 'Subir'}
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button type="button" onClick={cancelInventoryForm} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1.5 rounded text-sm transition-colors">
                        Cancelar
                      </button>
                      <button type="submit" disabled={loadingInventory} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1.5 rounded text-sm transition-colors disabled:bg-green-300">
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
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button onClick={handleClose} className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition-colors">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOfferModal;