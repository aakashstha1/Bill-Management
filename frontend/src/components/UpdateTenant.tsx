// import { useState } from "react";
// import { Button } from "./ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "./ui/dialog";
// import { FieldGroup } from "./ui/field";

// import { toast } from "sonner";
// import type { AxiosError } from "axios";
// import FormInput from "./shared/FormInput";
// import { useUpdateUser } from "../hooks/users/useUpdateUser";
// import type { User } from "../types/user.types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserPen } from "@fortawesome/free-solid-svg-icons";

// type Props = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   user: User | null;
//   onEdit: (user: User) => void;
// };

// //Main Function
// function UpdateTenant({ open, onOpenChange, user }: Props) {
//   const { mutate, isPending } = useUpdateUser();

//   const [formData, setFormData] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     contact: user?.contact || "",
//   });

//   // useEffect(() => {
//   //   if (user) {
//   //     setFormData({
//   //       name: user.name || "",
//   //       email: user.email || "",
//   //       contact: user.contact || "",
//   //     });
//   //   }
//   // }, [user]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const payload = {
//       ...formData,
//       email: formData.email || undefined,
//     };

//     mutate(
//       {
//         id: user!._id,
//         ...payload,
//       },
//       {
//         onSuccess: (data) => {
//           toast.success(data?.message || "Tenant updated successfully");
//           onOpenChange(false);
//         },
//         onError: (err: unknown) => {
//           const error = err as AxiosError<{ message: string }>;

//           toast.error(error?.response?.data?.message || "Update failed");
//         },
//       },
//     );
//   };

//   return (
//     <div>
//       <Dialog open={open} onOpenChange={onOpenChange}>
//         <DialogTrigger asChild>
//           <Button variant="outline">
//             <FontAwesomeIcon
//               icon={faUserPen}
//               style={{ color: "rgba(63, 125, 255, 1.00)" }}
//               size="lg"
//               // onClick={() => handleEdit(user)}
//             />
//           </Button>
//         </DialogTrigger>

//         <DialogContent className="sm:max-w-sm">
//           <form onSubmit={handleSubmit}>
//             <DialogHeader>
//               <DialogTitle className="font-bold text-lg">
//                 Edit Tenant Details's
//               </DialogTitle>
//             </DialogHeader>
//             <FieldGroup className="gap-4">
//               <FormInput
//                 id="name"
//                 name="name"
//                 label="Name"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//               />

//               <FormInput
//                 id="email"
//                 name="email"
//                 label="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />

//               <FormInput
//                 id="contact"
//                 name="contact"
//                 label="Contact"
//                 required
//                 value={formData.contact}
//                 onChange={handleChange}
//               />
//             </FieldGroup>
//             <DialogFooter className="mt-4">
//               <DialogClose asChild>
//                 <Button type="button" variant="outline">
//                   Cancel
//                 </Button>
//               </DialogClose>
//               <Button type="submit" disabled={isPending}>
//                 {isPending ? "Saving..." : "Save"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default UpdateTenant;
