import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateTenant from "../components/CreateTenant";
import FilterTenant from "../components/FilterTenant";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/ui/button";
import { useFetchUsers } from "../hooks/users/useFetchUsers";
import { HashLoader } from "react-spinners";
import { useState } from "react";
import UpdateTenant from "../components/UpdateTenant";
import type { User } from "../types/user.types";
import { Switch } from "../components/ui/switch";
import { toast } from "sonner";
import { useUpdateUserStatus } from "../hooks/users/useUpdateUserStatus";

function Tenants() {
  const { data, isLoading } = useFetchUsers();
  const { mutate, isPending } = useUpdateUserStatus();
  const users = data?.users || [];

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenEdit(true);
  };

  const handleStatusChange = (user: User, value: boolean) => {
    mutate(
      { id: user._id, status: value },
      {
        onSuccess: (data) => {
          toast.success(
            data?.message
              ? `${data.message} (${data.userStatus ? "Active" : "Inactive"})`
              : "Status updated successfully",
          );
        },
      },
    );
  };

  return (
    <div>
      <h1 className="font-bold text-2xl relative inline-block">
        Tenants List
        <span className="absolute left-0 -bottom-1 w-10 h-1 bg-amber-300 rounded-full"></span>
      </h1>

      <div className="flex flex-1 items-center justify-between border-b border-gray-300 py-2 mt-4">
        <FilterTenant />
        <CreateTenant />
      </div>

      {isLoading ? (
        <div className="min-h-96 flex items-center justify-center">
          <HashLoader size="25px" color="#4f38f7" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-6">
          <Table>
            <TableCaption>A list of your tenants.</TableCaption>

            <TableHeader>
              <TableRow className="font-bold text-base bg-[#a89ff3] hover:bg-[#a89ff3] text-white">
                <TableHead className="w-25">SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>

                  <TableCell className="font-medium">{user.name}</TableCell>

                  <TableCell>{user.email || "N/A"}</TableCell>

                  <TableCell>{user.contact}</TableCell>

                  <TableCell className="text-center">
                    <Switch
                      checked={user.status}
                      onCheckedChange={(value) =>
                        handleStatusChange(user, value)
                      }
                      disabled={isPending}
                      className="
                        data-[state=checked]:bg-green-500
                        data-[state=unchecked]:bg-red-500
                      "
                    />
                  </TableCell>

                  <TableCell className="text-right ">
                    <Button variant="outline" onClick={() => handleEdit(user)}>
                      <FontAwesomeIcon
                        icon={faUserPen}
                        style={{
                          color: "rgba(63, 125, 255, 1.00)",
                        }}
                        size="lg"
                      />
                    </Button>

                    {/* <Button variant="destructive">
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <UpdateTenant
            key={selectedUser?._id}
            open={openEdit}
            onOpenChange={setOpenEdit}
            user={selectedUser}
          />
        </div>
      )}
    </div>
  );
}

export default Tenants;
