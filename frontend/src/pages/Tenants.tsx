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
import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/ui/button";
import { useFetchUsers } from "../hooks/users/useFetchUsers";
import { HashLoader } from "react-spinners";

// const users = [
//   {
//     name: "Aarav Shrestha",
//     email: "aarav.shrestha@example.com",
//     contact: "+977-9812345678",
//     status: true,
//   },
//   {
//     name: "Sita Gurung",
//     email: "sita.gurung@example.com",
//     contact: "+977-9801122334",
//     status: false,
//   },
//   {
//     name: "Bikram Thapa",
//     email: "bikram.thapa@example.com",
//     contact: "+977-9845566778",
//     status: true,
//   }
// ];
function Tenants() {
  const { data, isLoading } = useFetchUsers();
  const users = data?.users || [];
  // console.log(users);
  return (
    <div>
      <h1 className="font-bold text-2xl relative inline-block">
        Tenants List
        <span className="absolute left-0 -bottom-1 w-10 h-1 bg-amber-300 rounded-full"></span>
      </h1>
      <div className="flex flex-1 items-center justify-between border-b border-gray-300 py-2 mt-4 ">
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
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email || "N/A"}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`relative inline-block h-2.5 w-2.5 rounded-full ${
                        user.status ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      <span
                        className={`absolute inset-0 rounded-full blur-sm opacity-70 ${
                          user.status ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                    </span>
                  </TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <Button variant="outline">
                      <FontAwesomeIcon
                        icon={faUserPen}
                        style={{ color: "rgba(63, 125, 255, 1.00)" }}
                        size="lg"
                      />
                    </Button>
                    <Button variant="destructive">
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default Tenants;
