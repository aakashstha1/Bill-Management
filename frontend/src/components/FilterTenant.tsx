import { Input } from "./ui/input";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./ui/combobox";

const options = ["All", "Active", "Inactive"];

function FilterTenant() {
  return (
    <div className="max-w-150 flex flex-1 items-center gap-4">
      {/* Search  */}
      <Input type="search" placeholder="Search by name..." className="w-full" />
      {/* Filter By Status  */}
      <div>
        <Combobox items={options}>
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
