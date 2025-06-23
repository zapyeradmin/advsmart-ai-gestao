
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useCrudOperations = () => {
  const { toast } = useToast();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleView = (item: any) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (item: any) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = (onDelete: (id: string) => void, itemName?: string) => {
    if (selectedItem) {
      onDelete(selectedItem.id);
      toast({
        title: `${itemName || 'Item'} excluído`,
        description: `${itemName || 'Item'} foi removido com sucesso.`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  return {
    selectedItem,
    isViewModalOpen,
    isEditModalOpen,
    isDeleteDialogOpen,
    handleView,
    handleEdit,
    handleDelete,
    confirmDelete,
    closeModals,
    setIsViewModalOpen,
    setIsEditModalOpen,
    setIsDeleteDialogOpen,
  };
};
