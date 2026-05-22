import { useConfirmModal } from "../../stores/confirmModal.store.ts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../ui/alert-dialog";

function ConfirmModal() {
  const { open, options, hide } = useConfirmModal();

  if (!options) return null;

  return (
    <AlertDialog open={open} onOpenChange={hide}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options.title}</AlertDialogTitle>

          {options.description && (
            <AlertDialogDescription>
              {options.description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={hide}
            size={20}
            variant={"secondary"}
            className="px-4 py-2"
          >
            {options.cancelText || "Cancel"}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() => {
              options.onConfirm();
              hide();
            }}
            size={20}
            variant={"destructive"}
            className="px-4 py-2"
          >
            {options.confirmText || "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmModal;
