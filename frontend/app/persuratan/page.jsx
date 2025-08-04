"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { LetterTypeSelector } from "@/components/letter-type-selector";
import { DynamicForm } from "@/components/dynamic-form";

export default function DashboardPage() {
  const [selectedLetterType, setSelectedLetterType] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSelectLetterType = (letterType, shouldShowForm = false) => {
    setSelectedLetterType(letterType);
    if (shouldShowForm) {
      setShowForm(true);
    }
  };

  const handleFormSubmit = (submissionData) => {
    console.log("Form submitted with data:", submissionData);
    console.log("Jenis Surat:", submissionData.jenisSurat);
    console.log("Form Inputs:", submissionData.formInputs);
    console.log("Penandatangan:", submissionData.penandatangan);
    console.log("Atas Nama:", submissionData.atasNama);
    console.log("Metadata:", submissionData.metadata);

    // Here you would send the data to your backend API
    fetch("/api/letters/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Letter generated:", data);
        // Handle success (e.g., show download link, redirect, etc.)
      })
      .catch((error) => {
        console.error("Error generating letter:", error);
        // Handle error
      });

    // Reset form
    setShowForm(false);
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
