import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { Button } from "@/components/ui/button";

export default function DeleteConfirmationModal({ cabin }) {
  const deleteCabinMutation = useDeleteCabin();

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want to delete the {cabin?.name} cabin?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently the row
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          asChild
          onClick={() => deleteCabinMutation.mutate(cabin.id)}
          className="bg-red-600 hover:bg-red-700"
        >
          <Button>Continue</Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
