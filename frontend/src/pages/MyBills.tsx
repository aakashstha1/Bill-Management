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
import { faBoltLightning, faDroplet } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/ui/button";
import { HashLoader } from "react-spinners";
import { useState } from "react";
import { useFetchBills } from "../hooks/bills/useFetchBills";
import CreateMyBill from "../components/CreateMyBill";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import type { Bill } from "../types/bill.types";
import UpdateMyBill from "../components/UpdateMyBill";
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
import { useDeleteBill } from "../hooks/bills/useDeleteBill";
import { toast } from "sonner";
import { usePagination } from "../hooks/usePagination";
import TablePagination from "../components/shared/TablePagination";

function MyBills() {
  const { data, isLoading } = useFetchBills();
  const { mutate: deleteBill, isPending } = useDeleteBill();
  const bills = data?.bills || [];
  const {
    page,
    setPage,
    totalPages,
    paginatedItems,
    totalItems,
    getRowNumber,
  } = usePagination(bills);
  // const [isLoading, setIsLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const handleBillEdit = (bill: Bill) => {
    setSelectedBill(bill);
    setOpenEdit(true);
  };

  const handleDelete = (bill: Bill) => {
    setSelectedBill(bill);
    setOpenAlert(true);
  };

  const handleFinalDelete = () => {
    if (!selectedBill) return;
    deleteBill(selectedBill._id, {
      onSuccess: (data) => {
        toast.success(data?.message || "Bill deleted successfully");
      },
    });
    setOpenAlert(false);
  };
  return (
    <div>
      <h1 className="font-bold text-2xl relative inline-block">
        My Bill's List
        <span className="absolute left-0 -bottom-1 w-10 h-1 bg-amber-300 rounded-full"></span>
      </h1>

      <div className="flex flex-1 items-center justify-between border-b border-gray-300 py-2 mt-4">
        {/* <FilterTenant /> */}
        <CreateMyBill />
      </div>

      {isLoading ? (
        <div className="min-h-96 flex items-center justify-center">
          <HashLoader size="25px" color="#4f38f7" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-6">
          <Table>
            <TableCaption>A list of your Bills.</TableCaption>

            <TableHeader>
              <TableRow className="font-bold text-base bg-[#a89ff3] hover:bg-[#a89ff3] text-white">
                <TableHead className="w-20">SN</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Units</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead className="text-right">Service Charge</TableHead>
                <TableHead className="text-right">Final Amount</TableHead>
                <TableHead className="text-right">Paid Amount</TableHead>
                <TableHead className="text-right">Discount</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedItems.map((bill, index) => (
                <TableRow key={bill._id}>
                  <TableCell className="font-medium">
                    {getRowNumber(index)}
                  </TableCell>

                  <TableCell className="font-medium">
                    <span
                      className={`${bill?.bill_type === "electricity" ? "border-[#FFD43B]" : "border-[#74C0FC]"} border px-2 py-1 rounded-lg`}
                    >
                      {bill?.bill_type === "electricity" ? (
                        <FontAwesomeIcon
                          icon={faBoltLightning}
                          style={{ color: "rgb(255, 212, 59)" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faDroplet}
                          style={{ color: "rgb(116, 192, 252)" }}
                        />
                      )}{" "}
                      {bill?.bill_type.charAt(0).toUpperCase() +
                        bill?.bill_type.slice(1)}
                    </span>
                  </TableCell>

                  <TableCell>
                    {bill?.month.charAt(0).toUpperCase() + bill?.month.slice(1)}
                    , {bill?.year}
                  </TableCell>

                  <TableCell className="text-center">{bill?.units}</TableCell>

                  <TableCell className="text-center">
                    {bill?.total_amount}
                  </TableCell>

                  <TableCell className="text-center">
                    {bill?.service_charge}
                  </TableCell>

                  <TableCell className="text-center">
                    {bill?.final_amount}
                  </TableCell>

                  <TableCell className="text-center">
                    {bill?.paid_amount}
                  </TableCell>

                  <TableCell className="text-center">
                    {bill?.discount}
                  </TableCell>

                  <TableCell className="text-center">
                    {bill?.paid_date
                      ? format(new Date(bill.paid_date), "PPP")
                      : "N/A"}
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

          <TablePagination
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={setPage}
          />

          <UpdateMyBill
            key={selectedBill?._id}
            open={openEdit}
            onOpenChange={setOpenEdit}
            bill={selectedBill}
          />

          <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
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

export default MyBills;
