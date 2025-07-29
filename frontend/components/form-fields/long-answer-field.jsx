"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function LongAnswerField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Value"}
        required={required}
        className="w-full min-h-[100px] resize-none"
      />
    </div>
  );
}
