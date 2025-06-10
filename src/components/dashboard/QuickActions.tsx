
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onAddClient: () => void;
}

const QuickActions = ({ onAddClient }: QuickActionsProps) => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
      <Button
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary-hover text-white shadow-lg"
        onClick={onAddClient}
      >
        <Plus size={24} />
      </Button>
    </div>
  );
};

export default QuickActions;
