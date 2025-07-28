"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { SignatoriesTable } from "@/components/signatories/signatories-table";
import { SignatoryFormModal } from "@/components/signatories/signatory-form-modal";
import { DeleteConfirmationModal } from "@/components/signatories/delete-confirmation-modal";
import { SignatoryDetailModal } from "@/components/signatories/signatory-detail-modal";
import { toast } from "@/hooks/use-toast";

// Mock API functions
const mockAPI = {
  getSignatories: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      {
        id: 1,
        name: "Dr. Ahmad Suryanto, S.Sos., M.Si.",
        nip: "19750815 199803 1 002",
        position: "Kepala Desa",
        rank: "Pembina",
        grade: "IV/a",
        notes: "Kepala Desa periode 2019-2025",
        createdAt: "2024-01-15T08:00:00Z",
        updatedAt: "2024-01-15T08:00:00Z",
      },
      {
        id: 2,
        name: "Siti Nurhaliza, S.AP.",
        nip: "19820312 200604 2 001",
        position: "Sekretaris Desa",
        rank: "Penata",
        grade: "III/c",
        notes: "Sekretaris Desa sejak 2006",
        createdAt: "2024-01-15T08:00:00Z",
        updatedAt: "2024-02-10T10:30:00Z",
      },
      {
        id: 3,
        name: "Budi Santoso",
        nip: "19850607 201001 1 003",
        position: "Kepala Urusan Pemerintahan",
        rank: "",
        grade: "",
        notes: "Tenaga honorer",
        createdAt: "2024-01-20T09:15:00Z",
        updatedAt: "2024-01-20T09:15:00Z",
      },
    ];
  },

  createSignatory: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  updateSignatory: async (id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      id,
      ...data,
      updatedAt: new Date().toISOString(),
    };
  },

  deleteSignatory: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  },
};

export default function SignatoriesPage() {
  const [signatories, setSignatories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedSignatory, setSelectedSignatory] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Load signatories on component mount
  useEffect(() => {
    loadSignatories();
  }, []);

  const loadSignatories = async () => {
    try {
      setLoading(true);
      const data = await mockAPI.getSignatories();
      setSignatories(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat data pejabat penandatangan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedSignatory(null);
    setFormModalOpen(true);
  };

  const handleEdit = (signatory) => {
    setSelectedSignatory(signatory);
    setFormModalOpen(true);
  };

  const handleView = (signatory) => {
    setSelectedSignatory(signatory);
    setDetailModalOpen(true);
  };

  const handleDelete = (signatory) => {
    setSelectedSignatory(signatory);
    setDeleteModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);

      if (selectedSignatory) {
        // Update existing signatory
        const updatedSignatory = await mockAPI.updateSignatory(
          selectedSignatory.id,
          formData
        );
        setSignatories((prev) =>
          prev.map((s) =>
            s.id === selectedSignatory.id ? updatedSignatory : s
          )
        );
        toast({
          title: "Berhasil",
          description: "Data pejabat berhasil diperbarui",
        });
      } else {
        // Create new signatory
        const newSignatory = await mockAPI.createSignatory(formData);
        setSignatories((prev) => [...prev, newSignatory]);
        toast({
          title: "Berhasil",
          description: "Pejabat baru berhasil ditambahkan",
        });
      }

      setFormModalOpen(false);
      setSelectedSignatory(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan data pejabat",
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteConfirm = async (id) => {
    try {
      setDeleteLoading(true);
      await mockAPI.deleteSignatory(id);
      setSignatories((prev) => prev.filter((s) => s.id !== id));
      setDeleteModalOpen(false);
      setSelectedSignatory(null);
      toast({
        title: "Berhasil",
        description: "Pejabat berhasil dihapus",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus pejabat",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const closeModals = () => {
    setFormModalOpen(false);
    setDeleteModalOpen(false);
    setDetailModalOpen(false);
    setSelectedSignatory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Pejabat Penandatangan Surat
            </h1>
            <p className="text-gray-600 mt-1">
              Kelola daftar pejabat yang berwenang menandatangani surat-surat
              desa
            </p>
          </div>

          <SignatoriesTable
            signatories={signatories}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            loading={loading}
          />

          {/* Form Modal */}
          <SignatoryFormModal
            isOpen={formModalOpen}
            onClose={closeModals}
            onSubmit={handleFormSubmit}
            signatory={selectedSignatory}
            loading={formLoading}
          />

          {/* Delete Confirmation Modal */}
          <DeleteConfirmationModal
            isOpen={deleteModalOpen}
            onClose={closeModals}
            onConfirm={handleDeleteConfirm}
            signatory={selectedSignatory}
            loading={deleteLoading}
          />

          {/* Detail Modal */}
          <SignatoryDetailModal
            isOpen={detailModalOpen}
            onClose={closeModals}
            signatory={selectedSignatory}
            onEdit={handleEdit}
          />
        </main>
      </div>
    </div>
  );
}
