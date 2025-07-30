"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { CitizensTable } from "@/components/citizens/citizens-table";
import { CitizenFormModal } from "@/components/citizens/citizen-form-modal";
import { CitizenDetailModal } from "@/components/citizens/citizen-detail-modal";
import { CSVUploadModal } from "@/components/citizens/csv-upload-modal";
import { toast } from "@/hooks/use-toast";

// Mock API functions
const mockAPI = {
  getCitizens: async () => {
    const res = await fetch('http://localhost:5000/warga');
    if (!res.ok) {
      throw new Error('Gagal mengambil data warga');
    }
    return await res.json();
  }
};

export default function CitizensPage() {
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [csvUploadModalOpen, setCSVUploadModalOpen] = useState(false);
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Load citizens on component mount
  useEffect(() => {
    loadCitizens();
  }, []);

  const loadCitizens = async () => {
    try {
      setLoading(true);
      const data = await mockAPI.getCitizens();
      setCitizens(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat data warga",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedCitizen(null);
    setFormModalOpen(true);
  };

  const handleEdit = (citizen) => {
    setSelectedCitizen(citizen);
    setFormModalOpen(true);
  };

  const handleView = (citizen) => {
    setSelectedCitizen(citizen);
    setDetailModalOpen(true);
  };

  const handleUploadCSV = () => {
    setCSVUploadModalOpen(true);
  };

  const handleDownloadTemplate = () => {
    // This will be handled by the CSV upload modal
  };

  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);

      if (selectedCitizen) {
        // Update existing citizen
        const updatedCitizen = await mockAPI.updateCitizen(
          selectedCitizen.id,
          formData
        );
        setCitizens((prev) =>
          prev.map((c) => (c.id === selectedCitizen.id ? updatedCitizen : c))
        );
        toast({
          title: "Berhasil",
          description: "Data warga berhasil diperbarui",
        });
      } else {
        // Create new citizen
        const newCitizen = await mockAPI.createCitizen(formData);
        setCitizens((prev) => [...prev, newCitizen]);
        toast({
          title: "Berhasil",
          description: "Data warga baru berhasil ditambahkan",
        });
      }

      setFormModalOpen(false);
      setSelectedCitizen(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan data warga",
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleCSVUpload = async (dataArray) => {
    try {
      const newCitizens = await mockAPI.bulkCreateCitizens(dataArray);
      setCitizens((prev) => [...prev, ...newCitizens]);
      toast({
        title: "Berhasil",
        description: `${newCitizens.length} data warga berhasil diimport`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengimport data warga",
        variant: "destructive",
      });
    }
  };

  const closeModals = () => {
    setFormModalOpen(false);
    setDetailModalOpen(false);
    setCSVUploadModalOpen(false);
    setSelectedCitizen(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Data Warga</h1>
            <p className="text-gray-600 mt-1">
              Kelola data kependudukan warga desa
            </p>
          </div>

          <CitizensTable
            citizens={citizens}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onView={handleView}
            onUploadCSV={handleUploadCSV}
            onDownloadTemplate={handleDownloadTemplate}
            loading={loading}
          />

          {/* Form Modal */}
          <CitizenFormModal
            isOpen={formModalOpen}
            onClose={closeModals}
            onSubmit={handleFormSubmit}
            citizen={selectedCitizen}
            loading={formLoading}
          />

          {/* Detail Modal */}
          <CitizenDetailModal
            isOpen={detailModalOpen}
            onClose={closeModals}
            citizen={selectedCitizen}
            onEdit={handleEdit}
          />

          {/* CSV Upload Modal */}
          <CSVUploadModal
            isOpen={csvUploadModalOpen}
            onClose={closeModals}
            onUpload={handleCSVUpload}
          />
        </main>
      </div>
    </div>
  );
}
