import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package } from "@/types";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EventPackageDetails } from "@/types/event-packages";

interface PackageOwnerActionsProps {
  pkg: EventPackageDetails;
  onDelete: (id: string) => void;
}

const PackageOwnerActions = ({ pkg, onDelete }: PackageOwnerActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEdit = () => {
    // In a real app, this would navigate to an edit form
    // For now, we'll just show a toast
    toast({
      title: "Edit Package",
      description: `You're now editing ${pkg.title}`,
    });

    // In a real scenario, we would navigate to an edit page
    // navigate(`/edit-package/${pkg.id}`);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onDelete(pkg.id);
    setShowDeleteDialog(false);
    toast({
      title: "Package Deleted",
      description: `${pkg.title} has been deleted successfully.`,
    });
    navigate("/");
  };

  return (
    <div className="flex space-x-2 mt-4">
      <Button
        onClick={handleEdit}
        className="flex items-center gap-2 bg-travel-500 hover:bg-travel-600"
      >
        <Edit className="h-4 w-4" />
        Edit
      </Button>
      <Button
        onClick={handleDelete}
        variant="destructive"
        className="flex items-center gap-2"
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the package "{pkg.title}". This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PackageOwnerActions;
