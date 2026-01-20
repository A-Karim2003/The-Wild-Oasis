import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AddCabinModal() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create A New Cabin</DialogTitle>
      </DialogHeader>
      <div className="flex items-center gap-2"></div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
