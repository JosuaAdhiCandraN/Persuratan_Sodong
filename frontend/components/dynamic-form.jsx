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

const handleSearch = async (nik) => {
    try {  
    const res = await fetch(`http://localhost:5000/surat/${letterType.trim()}/${nik}`);
    if (!res.ok) {
      alert("Data tidak ditemukan");
      console.log("Fetching from:", `http://localhost:5000/surat/${letterType}/${nik}`);
      return;
    }
    const result = await res.json();
    setFormData((prev) => ({
      ...prev,
      ...result.data,
    }));
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Terjadi kesalahan saat mengambil data");
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!acceptTerms) {
    alert("Harap setujui syarat dan ketentuan");
    return;
  }

  const payload = {
    jenisSurat: letterType,
    data: formData,
  };

  try {
    const response = await fetch("http://localhost:5000/surat/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("❌ Server response error:", errorResponse);
      console.log("📦 Body dikirim:", payload);
      alert(errorResponse.message || "Gagal membuat surat");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${letterType}-${Date.now()}.docx`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("🔥 Network or parsing error:", error);
    console.log("📦 Body dikirim:", payload);
    alert("Gagal memproses surat");
  }
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
