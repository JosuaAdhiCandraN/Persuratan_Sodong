"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function LetterTypeSelector({ onSelectLetterType, selectedType }) {
  const [letterTypes, setLetterTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock API call untuk mendapatkan jenis-jenis surat
  useEffect(() => {
    const fetchLetterTypes = async () => {
      setLoading(true);

      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockLetterTypes = [
        {
          value: "surat_keterangan_domisili",
          label: "Surat Keterangan Domisili",
        },
        { value: "surat_keterangan_usaha", label: "Surat Keterangan Usaha" },
        { value: "surat_pengantar_desa", label: "Surat Pengantar" },
      ];

      setLetterTypes(mockLetterTypes);
      setLoading(false);
    };

    fetchLetterTypes();
  }, []);

  const handleSelectChange = (value) => {
    onSelectLetterType(value);
  };

  const handleCreateLetter = () => {
    if (selectedType) {
      // Trigger form to show
      onSelectLetterType(selectedType, true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Pilih jenis surat yang ingin anda buat. Kemudian klik Buat Surat dan
            isikan form yang muncul dibawahnya.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="letterType" className="text-sm font-medium">
            Jenis Surat
          </Label>
          <div className="flex gap-4">
            <Select
              value={selectedType || ""}
              onValueChange={handleSelectChange}
              disabled={loading}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={loading ? "Loading..." : "Value"} />
              </SelectTrigger>
              <SelectContent>
                {letterTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleCreateLetter}
              className="bg-blue-600 hover:bg-blue-700 px-8"
              disabled={!selectedType || loading}
            >
              Buat Surat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
