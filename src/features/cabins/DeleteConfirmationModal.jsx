import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function DeleteConfirmationModal({ data, mutate, type }) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        {type === "cabins" && (
          <AlertDialogTitle>
            Are you sure you want to delete the {data?.name} cabin?
          </AlertDialogTitle>
        )}
        {type === "bookings" && (
          // data in this case is an id from the booking
          <AlertDialogTitle>
            Are you sure you want to delete booking #{data}
          </AlertDialogTitle>
        )}

        <AlertDialogDescription>
          This action cannot be undone. This will permanently the row
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          asChild
          onClick={() => mutate(data)}
          className="bg-red-600 hover:bg-red-700"
        >
          <Button>Continue</Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
