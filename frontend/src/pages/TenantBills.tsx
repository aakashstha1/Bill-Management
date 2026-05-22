import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/ui/button";
import { HashLoader } from "react-spinners";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { toast } from "sonner";
import { useFetchTenantBills } from "../hooks/tenant-bills/useFetchTenantBills";
import CreateUserBill from "../components/CreateUserBill";
import type { TenantBill } from "../types/tenantBill.types";
import { useDeleteUserBill } from "../hooks/tenant-bills/useDeleteUserBill";
import UpdateUserBill from "../components/UpdateUserBill";
import { useUpdateTenantBillStatus } from "../hooks/tenant-bills/useUpdateTenantBillStatus";
function TenantBills() {
  const { data, isLoading } = useFetchTenantBills();
  // console.log(data);
  const { mutate: deleteBill, isPending } = useDeleteUserBill();
  const { mutate, isPending: updatePending } = useUpdateTenantBillStatus();
  const bills = data?.usersBills || [];
  // const [isLoading, setIsLoading] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedBill, setSelectedBill] = useState<TenantBill | null>(null);

  const handleBillEdit = (bill: TenantBill) => {
    setSelectedBill(bill);
    setOpenEdit(true);
  };

  const handleDelete = (bill: TenantBill) => {
    setSelectedBill(bill);
    setOpenDelete(true);
  };

  const handleFinalDelete = () => {
    if (!selectedBill) return;
    deleteBill(selectedBill._id, {
      onSuccess: (data) => {
        toast.success(data?.message || "Bill deleted successfully");
      },
    });
    setOpenDelete(false);
  };

  const handleStatusChange = (bill: TenantBill, value: boolean) => {
    mutate(
      { id: bill._id, paid: value },
      {
        onSuccess: (data) => {
          toast.success(
            data?.message
              ? `${data.message} (${data.paid ? "Paid" : "Pending"})`
              : "Status updated successfully",
          );
        },
      },
    );
  };

  return (
    <div>
      <h1 className="font-bold text-2xl relative inline-block">
        Tenant's Bills List
        <span className="absolute left-0 -bottom-1 w-10 h-1 bg-amber-300 rounded-full"></span>
      </h1>

      <div className="flex flex-1 items-center justify-between border-b border-gray-300 py-2 mt-4">
        {/* <FilterTenant /> */}
        <CreateUserBill />
      </div>

      {isLoading ? (
        <div className="min-h-96 flex items-center justify-center">
          <HashLoader size="25px" color="#4f38f7" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-6">
          <Table>
            <TableCaption>A list of Tenants Bills.</TableCaption>

            <TableHeader>
              <TableRow className="font-bold text-base bg-[#a89ff3] hover:bg-[#a89ff3] text-white">
                <TableHead className="w-10">SN</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-center">
                  <FontAwesomeIcon
                    icon={faBoltLightning}
                    style={{ color: "rgb(255, 212, 59)" }}
                  />{" "}
                  Units
                </TableHead>
                <TableHead className="text-center">
                  <FontAwesomeIcon
                    icon={faBoltLightning}
                    style={{ color: "rgb(255, 212, 59)" }}
                  />{" "}
                  Rate
                </TableHead>
                <TableHead className="text-right">Electricity Amount</TableHead>
                <TableHead className="text-right">Water Amount</TableHead>
                <TableHead className="text-right">Room Amount</TableHead>
                <TableHead className="text-right">Final Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bills.map((bill, index) => (
                <TableRow key={bill._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>

                  <TableCell>{bill?.user?.name}</TableCell>

                  <TableCell>
                    {bill?.month.charAt(0).toUpperCase() + bill?.month.slice(1)}
                    , {bill?.year}
                  </TableCell>

                  <TableCell className="text-center">
                    {bill?.ele_units}
                  </TableCell>

                  <TableCell className="text-center">
                    {bill?.ele_rate}
                  </TableCell>

                  <TableCell className="text-center">
                    {bill?.ele_amount}
                  </TableCell>

                  <TableCell className="text-center">
                    {bill?.water_amount}
                  </TableCell>

                  <TableCell className="text-center">
                    {bill?.room_amount}
                  </TableCell>

                  <TableCell className="text-center">
                    {bill?.final_amount}
                  </TableCell>

                  <TableCell className="text-right">
                    <span
                      className={`${bill?.paid ? "bg-green-500" : "bg-amber-500"} px-3 py-1 rounded-lg text-white font-semibold`}
                    >
                      {bill?.paid ? "Paid" : "Pending"}
                    </span>
                  </TableCell>

                  <TableCell className="text-right ">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size={"icon"}>
                          <EllipsisVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-24">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => handleBillEdit(bill)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(bill)}
                            disabled={isPending}
                          >
                            Remove
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(bill, !bill.paid)}
                            disabled={updatePending}
                          >
                            {bill?.paid ? "Mark as Unpaid" : "Mark as Paid"}
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* <Button variant="destructive">
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <UpdateUserBill
            key={selectedBill?._id}
            open={openEdit}
            onOpenChange={setOpenEdit}
            bill={selectedBill}
          />

          <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this bill.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  size={20}
                  variant={"secondary"}
                  className="px-4 py-2"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  size={20}
                  variant={"destructive"}
                  className="px-4 py-2"
                  onClick={handleFinalDelete}
                >
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}

export default TenantBills;
