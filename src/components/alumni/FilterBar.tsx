import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface FilterState {
  graduationYear: string;
  branch: string;
  company: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const graduationYears = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];
const branches = [
  "Computer Science",
  "Electrical Engineering", 
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Information Technology",
  "Electronics & Communication",
  "Biotechnology"
];

export function FilterBar({ filters, onFilterChange, onClearFilters }: FilterBarProps) {
  const hasActiveFilters = filters.graduationYear || filters.branch || filters.company;

  return (
    <div className="bg-muted/30 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-sm font-medium text-foreground">Filters:</div>
          
          {/* Year Filter */}
          <div className="min-w-[140px]">
            <Select
              value={filters.graduationYear}
              onValueChange={(value) => 
                onFilterChange({ ...filters, graduationYear: value })
              }
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {graduationYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    Class of {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Branch Filter */}
          <div className="min-w-[200px]">
            <Select
              value={filters.branch}
              onValueChange={(value) => 
                onFilterChange({ ...filters, branch: value })
              }
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Branch/Department" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Company Filter */}
          <div className="min-w-[180px]">
            <Input
              type="text"
              placeholder="Current Company"
              value={filters.company}
              onChange={(e) => 
                onFilterChange({ ...filters, company: e.target.value })
              }
              className="bg-background"
            />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Clear</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}