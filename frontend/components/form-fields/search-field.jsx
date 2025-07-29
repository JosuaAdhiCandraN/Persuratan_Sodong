"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

export function SearchField({
  label,
  name,
  value,
  onChange,
  onSearch,
  placeholder,
  required = false,
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="flex gap-2">
        <Input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Value"}
          required={required}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={() => onSearch && onSearch(value)}
          className="px-3"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
