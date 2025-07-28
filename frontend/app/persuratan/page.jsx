"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { LetterTypeSelector } from "@/components/letter-type-selector";
import { DynamicForm } from "@/components/dynamic-form";

export default function PersuratanPage() {
  const [selectedLetterType, setSelectedLetterType] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSelectLetterType = (letterType, shouldShowForm = false) => {
    setSelectedLetterType(letterType);
    if (shouldShowForm) {
      setShowForm(true);
    }
  };

  const handleFormSubmit = (formData) => {
    console.log("Form submitted:", formData);
    console.log("Letter type:", selectedLetterType);

    // Di sini Anda bisa mengirim data ke API
    alert("Surat berhasil dibuat!");

    // Reset form tapi tetap pertahankan dropdown
    setShowForm(false);
    // Optionally reset selected type jika ingin
    // setSelectedLetterType(null)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Persuratan</h1>
          </div>

          <div className="max-w-4xl mx-auto">
            <LetterTypeSelector
              onSelectLetterType={handleSelectLetterType}
              selectedType={selectedLetterType}
            />

            {showForm && selectedLetterType && (
              <DynamicForm
                letterType={selectedLetterType}
                onSubmit={handleFormSubmit}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
