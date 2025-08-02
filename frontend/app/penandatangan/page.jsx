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
    const res = await fetch('http://localhost:5000/desa/call/pejabat');
    if (!res.ok) throw new Error('Gagal memuat data pejabat');
    return await res.json();
  },

  createSignatory: async (data) => {
    const res = await fetch('http://localhost:5000/desa/create/pejabat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Gagal menambahkan pejabat');
    return await res.json();
  },

 updateSignatory: async (id, data) => {
  const res = await fetch(`http://localhost:5000/desa/update/pejabat/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Gagal memperbarui pejabat');
  return await res.json();
},

deleteSignatory: async (id) => {
  const res = await fetch(`http://localhost:5000/desa/delete/pejabat/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Gagal menghapus pejabat');
  return await res.json();
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
          selectedSignatory._id,
          formData
        );
        setSignatories((prev) =>
          prev.map((s) =>
            s._id === selectedSignatory._id ? updatedSignatory : s
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
    await mockAPI.deleteSignatory(selectedSignatory._id);
    setSignatories((prev) => prev.filter((s) => s._id !== id)); // MongoDB _id
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
