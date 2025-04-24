import { useState } from "react";
import { format } from "date-fns";
import { Search, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const SearchBar = ({
  search,
  setSearch,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: {
  search: string;
  setSearch: (val: string) => void;
  fromDate: Date | undefined;
  setFromDate: (val: Date | undefined) => void;
  toDate: Date | undefined;
  setToDate: (val: Date | undefined) => void;
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Where do you want to go?"
          className="pl-10 w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      </div>

      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[150px] justify-start text-left font-normal"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {fromDate ? format(fromDate, "MMM dd, yyyy") : "Start date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={fromDate}
              onSelect={setFromDate}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[150px] justify-start text-left font-normal"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {toDate ? format(toDate, "MMM dd, yyyy") : "End date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={toDate}
              onSelect={setToDate}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        {/* <Button className="bg-travel-500 hover:bg-travel-600">Search</Button> */}
      </div>
    </div>
  );
};
