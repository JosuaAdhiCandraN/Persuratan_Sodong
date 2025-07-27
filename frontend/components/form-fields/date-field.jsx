"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DateField({ label, name, value, onChange, required = false }) {
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
      />
    </div>
  );
}
