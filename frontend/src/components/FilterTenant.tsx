import { Input } from "./ui/input";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./ui/combobox";
import { useState } from "react";

const options = ["All", "Active", "Inactive"];

function FilterTenant() {
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string | null>("All");
  return (
    <div className="max-w-3xl w-full flex  items-center gap-4">
      {/* Search  */}
      <div className="flex-1">
        <Input
          type="search"
          placeholder="Search by name..."
          className="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* Filter By Status  */}
      <div className="flex items-center justify-between gap-2 shrink-0">
        <h1 className=" whitespace-nowrap">Filter by:</h1>
        <Combobox
          items={options}
          value={status}
          onValueChange={(value) => setStatus(value ?? "All")}
        >
          <ComboboxInput placeholder="Status" className="w-24" />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  );
}

export default FilterTenant;
