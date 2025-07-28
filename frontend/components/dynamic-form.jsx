"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { DynamicFieldRenderer } from "./dynamic-field-renderer";

export function DynamicForm({ letterType, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(true);
  const fieldMap = require("../lib/field-map").default;

  // Mock API call untuk mendapatkan form fields berdasarkan jenis surat
  useEffect(() => {
    const fetchFormFields = async () => {
      setLoading(true);

      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data berdasarkan jenis surat
      const mockFields = fieldMap[letterType] || [];

      //   const mockFields = [
      //     {
      //       name: "nik",
      //       label: "NIK (Nomor Induk Kependudukan)",
      //       type: "search",
      //       required: true,
      //       placeholder: "Value",
      //     },
      //     {
      //       name: "nama",
      //       label: "Nama",
      //       type: "short_answer",
      //       required: true,
      //       placeholder: "Value",
      //     },
      //     {
      //       name: "tempat_tanggal_lahir",
      //       label: "Tempat, Tanggal Lahir",
      //       type: "short_answer",
      //       required: true,
      //       placeholder: "Value",
      //     },
      //     {
      //       name: "agama",
      //       label: "Agama",
      //       type: "short_answer",
      //       required: true,
      //       placeholder: "Value",
      //     },
      //     {
      //       name: "status_pernikahan",
      //       label: "Status Pernikahan",
      //       type: "short_answer",
      //       required: true,
      //       placeholder: "Value",
      //     },
      //     {
      //       name: "kewarganegaraan",
      //       label: "Kewarganegaraan",
      //       type: "short_answer",
      //       required: true,
      //       placeholder: "Value",
      //     },
      //     {
      //       name: "pekerjaan",
      //       label: "Pekerjaan",
      //       type: "select",
      //       required: true,
      //       placeholder: "Value",
      //       options: [
      //         { value: "pegawai_negeri", label: "Pegawai Negeri" },
      //         { value: "pegawai_swasta", label: "Pegawai Swasta" },
      //         { value: "wiraswasta", label: "Wiraswasta" },
      //         { value: "pelajar", label: "Pelajar/Mahasiswa" },
      //         { value: "ibu_rumah_tangga", label: "Ibu Rumah Tangga" },
      //       ],
      //     },
      //     {
      //       name: "alamat",
      //       label: "Alamat",
      //       type: "long_answer",
      //       required: true,
      //       placeholder: "Value",
      //     },
      //   ];

      setFormFields(mockFields);
      setLoading(false);
    };

    if (letterType) {
      fetchFormFields();
    }
  }, [letterType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async (searchValue) => {
    // Mock search functionality untuk NIK
    console.log("Searching for:", searchValue);
    // Simulasi pencarian data
    if (searchValue === "1234567890123456") {
      setFormData((prev) => ({
        ...prev,
        nama: "John Doe",
        tempat_tanggal_lahir: "Jakarta, 01 Januari 1990",
        agama: "Islam",
        status_pernikahan: "Belum Kawin",
        kewarganegaraan: "Indonesia",
        alamat: "Jl. Contoh No. 123, Jakarta",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert("Harap setujui syarat dan ketentuan");
      return;
    }
    onSubmit(formData);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading form...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Jika ada ketidaksesuaian data pada database dengan Data Existing,
          Dapat diubah melalui menu Database Penduduk.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit} className="space-y-6">
        {formFields.map((field) => (
          <DynamicFieldRenderer
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={handleInputChange}
            onSearch={field.type === "search" ? handleSearch : undefined}
          />
        ))}

        <div className="flex items-center space-x-2 pt-4">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={setAcceptTerms}
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I accept the terms{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Read our T&Cs
            </a>
          </label>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!acceptTerms}
          >
            Buat Surat
          </Button>
        </div>
      </form>
    </div>
  );
}
