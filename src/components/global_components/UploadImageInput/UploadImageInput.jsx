import React, { useState, useRef } from 'react';
import { uploadImage, uploadOffertImage, uploadInventoryImage, uploadEstablishmentLogo } from '../../../core/vinoApiService';

/**
 * Componente para subir imágenes
 * 
 * @param {string} mode - Tipo de upload: 'generic' | 'offert' | 'inventory' | 'establishment'
 * @param {string} targetId - ID del recurso (requerido para offert, inventory, establishment)
 * @param {function} onUploaded - Callback con la URL de la imagen subida
 * @param {string} currentImage - URL de la imagen actual (opcional)
 */
const UploadImageInput = ({ 
  mode = 'generic', 
  targetId, 
  onUploaded, 
  currentImage = null,
  label = 'Subir imagen',
  accept = 'image/*'
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(currentImage);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar que sea imagen
    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona un archivo de imagen válido');
      return;
    }

    // Validar tamaño (máx 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('La imagen no debe superar los 5MB');
      return;
    }

    // Mostrar preview local inmediatamente
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setError(null);
    setUploading(true);

    try {
      let uploadedUrl = null;

      switch (mode) {
        case 'offert':
          if (!targetId) throw new Error('Se requiere targetId para subir imagen de oferta');
          uploadedUrl = await uploadOffertImage(targetId, file);
          break;
        
        case 'inventory':
          if (!targetId) throw new Error('Se requiere targetId para subir imagen de inventario');
          uploadedUrl = await uploadInventoryImage(targetId, file);
          break;
        
        case 'establishment':
          if (!targetId) throw new Error('Se requiere targetId para subir logo de establecimiento');
          uploadedUrl = await uploadEstablishmentLogo(targetId, file);
          break;
        
        case 'generic':
        default:
          uploadedUrl = await uploadImage(file);
          break;
      }

      if (uploadedUrl) {
        setPreview(uploadedUrl);
        onUploaded && onUploaded(uploadedUrl);
      } else {
        throw new Error('No se pudo obtener la URL de la imagen');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.message || 'Error al subir la imagen');
      setPreview(currentImage); // Restaurar imagen anterior
    } finally {
      setUploading(false);
      // Limpiar el input para permitir subir el mismo archivo de nuevo
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview(null);
    onUploaded && onUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <label className="text-xs text-gray-500 block mb-1">{label}</label>
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex items-center gap-3">
        {/* Preview de imagen */}
        {preview && (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
            >
              ×
            </button>
          </div>
        )}

        {/* Botón de subir */}
        <button
          type="button"
          onClick={handleClick}
          disabled={uploading}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed
            transition-colors duration-200
            ${uploading 
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
              : 'border-gray-300 hover:border-amber-500 hover:bg-amber-50 cursor-pointer'
            }
          `}
        >
          {uploading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-gray-500">Subiendo...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-600">
                {preview ? 'Cambiar imagen' : 'Seleccionar imagen'}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}

      {/* Info */}
      <p className="text-gray-400 text-xs mt-1">
        Formatos: JPG, PNG, GIF, WebP. Máx: 5MB
      </p>
    </div>
  );
};

export default UploadImageInput;