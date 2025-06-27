
import React from 'react';
import ProcessModal from '@/components/modals/ProcessModal';
import ProcessViewModal from '@/components/modals/ProcessViewModal';
import DeleteConfirmationDialog from '@/components/ui/delete-confirmation-dialog';

interface ProcessModalsProps {
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  isViewModalOpen: boolean;
  isDeleteDialogOpen: boolean;
  selectedItem: any;
  onCloseAdd: () => void;
  onCloseModals: () => void;
  onSaveProcess: (processData: any) => void;
  onConfirmDelete: () => void;
}

const ProcessModals = ({
  isAddModalOpen,
  isEditModalOpen,
  isViewModalOpen,
  isDeleteDialogOpen,
  selectedItem,
  onCloseAdd,
  onCloseModals,
  onSaveProcess,
  onConfirmDelete
}: ProcessModalsProps) => {
  return (
    <>
      <ProcessModal
        isOpen={isAddModalOpen}
        onClose={onCloseAdd}
        onSave={onSaveProcess}
      />

      <ProcessModal
        isOpen={isEditModalOpen}
        onClose={onCloseModals}
        onSave={onSaveProcess}
      />

      <ProcessViewModal
        isOpen={isViewModalOpen}
        onClose={onCloseModals}
        process={selectedItem}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={onCloseModals}
        onConfirm={onConfirmDelete}
        itemName="processo"
        description="Tem certeza que deseja excluir este processo? Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos."
      />
    </>
  );
};

export default ProcessModals;
