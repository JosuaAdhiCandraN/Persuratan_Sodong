"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

export function DateNowField({
  label,
  name,
  value,
  onChange,
  required = false,
}) {
  useEffect(() => {
    // Set current date when component mounts
    const currentDate = new Date().toISOString().split("T")[0];
    if (!value) {
      onChange({ target: { name, value: currentDate } });
    }
  }, [name, value, onChange]);

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type="date"
        value={value}
        onChange={onChange}
        required={required}
        className="w-full"
        readOnly
      />
    </div>
  );
}
