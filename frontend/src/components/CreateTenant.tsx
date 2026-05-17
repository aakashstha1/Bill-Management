import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldGroup } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function CreateTenant() {
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="rounded-lg">
              Create Tenant <span className="text-2xl">+</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="font-bold text-lg">
                Fill Tenant Details's
              </DialogTitle>
            </DialogHeader>
            <FieldGroup className="gap-4">
              <Field>
                <Label htmlFor="name">
                  Name<span className="text-red-500">*</span>
                </Label>
                <Input id="name" name="name" />
              </Field>
              <Field>
                <Label htmlFor="email">Email</Label>
                <Input id="email-1" name="email" />
              </Field>
              <Field>
                <Label htmlFor="contact">
                  Contact<span className="text-red-500">*</span>
                </Label>
                <Input id="contact" name="contact" />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

export default CreateTenant;
