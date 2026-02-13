import React from 'react';
import EditOfferModal from './EditOfferModal';

export default function EditInventoryModal(props) {
  // Mantener compatibilidad: reexportar el modal unificado en modo 'inventory'
  return <EditOfferModal {...props} mode="inventory" />;
}
