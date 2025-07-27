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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return [
      {
        id: 1,
        no_kk: "3201012345678901",
        nik: "3201011234567890",
        nama_lengkap: "Ahmad Suryanto",
        alamat: "Jl. Merdeka No. 123",
        rt: 1,
        rw: 2,
        tempat_lahir: "Jakarta",
        tgl_lahir: "1975-08-15",
        jenis_kelamin: "L",
        status_kawin: "KAWIN",
        tgl_perkawinan_perceraian: "2000-05-20",
        pendidikan: "STRATA I",
        agama: "Islam",
        no_akte: "AK001234567890",
        umur: 48,
        shdk: "KEPALA KELUARGA",
        kewarganegaraan: "WNI",
        ayah: "Suyanto",
        ibu: "Siti Aminah",
        jenis_pekerjaan: "Pegawai Negeri Sipil",
        kesejahteraan: "Menengah",
        e_ktp: true,
        tgl_update_kk: "2023-01-15",
        alamat_lengkap: "Jl. Merdeka No. 123, RT 01/RW 02, Desa Sodong Basari",
      },
      {
        id: 2,
        no_kk: "3201012345678901",
        nik: "3201011234567891",
        nama_lengkap: "Siti Nurhaliza",
        alamat: "Jl. Merdeka No. 123",
        rt: 1,
        rw: 2,
        tempat_lahir: "Bandung",
        tgl_lahir: "1982-03-12",
        jenis_kelamin: "P",
        status_kawin: "KAWIN",
        tgl_perkawinan_perceraian: "2000-05-20",
        pendidikan: "SLTA / SEDERAJAT",
        agama: "Islam",
        no_akte: "AK001234567891",
        umur: 41,
        shdk: "ISTRI",
        kewarganegaraan: "WNI",
        ayah: "Nurdin",
        ibu: "Haliza",
        jenis_pekerjaan: "Ibu Rumah Tangga",
        kesejahteraan: "Menengah",
        e_ktp: true,
        tgl_update_kk: "2023-01-15",
        alamat_lengkap: "Jl. Merdeka No. 123, RT 01/RW 02, Desa Sodong Basari",
      },
      {
        id: 3,
        no_kk: "3201012345678902",
        nik: "3201011234567892",
        nama_lengkap: "Budi Hartono",
        alamat: "Jl. Kebon Jeruk No. 45",
        rt: 3,
        rw: 1,
        tempat_lahir: "Surabaya",
        tgl_lahir: "1985-06-07",
        jenis_kelamin: "L",
        status_kawin: "BELUM KAWIN",
        tgl_perkawinan_perceraian: "",
        pendidikan: "SLTP/SEDERAJAT",
        agama: "Kristen",
        no_akte: "AK001234567892",
        umur: 38,
        shdk: "KEPALA KELUARGA",
        kewarganegaraan: "WNI",
        ayah: "Hartono",
        ibu: "Budiyati",
        jenis_pekerjaan: "Buruh Harian",
        kesejahteraan: "Kurang Mampu",
        e_ktp: false,
        tgl_update_kk: "2022-08-10",
        alamat_lengkap:
          "Jl. Kebon Jeruk No. 45, RT 03/RW 01, Desa Sodong Basari",
      },
      {
        id: 4,
        no_kk: "3201012345678903",
        nik: "3201011234567893",
        nama_lengkap: "Dewi Sartika",
        alamat: "Jl. Melati No. 78",
        rt: 4,
        rw: 2,
        tempat_lahir: "Yogyakarta",
        tgl_lahir: "1990-02-15",
        jenis_kelamin: "P",
        status_kawin: "KAWIN",
        tgl_perkawinan_perceraian: "2015-07-10",
        pendidikan: "STRATA I",
        agama: "Islam",
        no_akte: "AK001234567893",
        umur: 33,
        shdk: "KEPALA KELUARGA",
        kewarganegaraan: "WNI",
        ayah: "Sartono",
        ibu: "Dewi Kartika",
        jenis_pekerjaan: "Guru",
        kesejahteraan: "Menengah",
        e_ktp: true,
        tgl_update_kk: "2023-05-20",
        alamat_lengkap: "Jl. Melati No. 78, RT 04/RW 02, Desa Sodong Basari",
      },
      {
        id: 5,
        no_kk: "3201012345678904",
        nik: "3201011234567894",
        nama_lengkap: "Rini Susanti",
        alamat: "Jl. Dahlia No. 34",
        rt: 2,
        rw: 1,
        tempat_lahir: "Semarang",
        tgl_lahir: "1993-08-25",
        jenis_kelamin: "P",
        status_kawin: "CERAI HIDUP",
        tgl_perkawinan_perceraian: "2020-12-15",
        pendidikan: "DIPLOMA IV/ STRATA I",
        agama: "Katolik",
        no_akte: "AK001234567894",
        umur: 30,
        shdk: "KEPALA KELUARGA",
        kewarganegaraan: "WNI",
        ayah: "Susanto",
        ibu: "Rini Hartati",
        jenis_pekerjaan: "Karyawan Swasta",
        kesejahteraan: "Menengah",
        e_ktp: true,
        tgl_update_kk: "2021-01-10",
        alamat_lengkap: "Jl. Dahlia No. 34, RT 02/RW 01, Desa Sodong Basari",
      },
    ];
  },

  createCitizen: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      id: Date.now(),
      ...data,
    };
  },

  updateCitizen: async (id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      id,
      ...data,
    };
  },

  bulkCreateCitizens: async (dataArray) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return dataArray.map((data, index) => ({
      id: Date.now() + index,
      ...data,
    }));
  },
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
