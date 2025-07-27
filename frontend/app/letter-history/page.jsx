"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { LetterHistoryTable } from "@/components/letter-history/letter-history-table";
import { LetterDetailModal } from "@/components/letter-history/letter-detail-modal";
import { toast } from "@/hooks/use-toast";

// Mock API function
const mockAPI = {
  getLetterHistory: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return [
      {
        id: 1,
        nama: "Ahmad Suryanto",
        nik: "19750815 199803 1 002",
        letterType: "Surat Keterangan Domisili",
        signatoryName: "Dr. Budi Santoso, S.Sos., M.Si.",
        timestamp: "2024-12-15T10:30:00Z",
      },
      {
        id: 2,
        nama: "Siti Nurhaliza",
        nik: "19820312 200604 2 001",
        letterType: "Surat Keterangan Usaha",
        signatoryName: "Dr. Budi Santoso, S.Sos., M.Si.",
        timestamp: "2024-12-14T14:15:30Z",
      },
      {
        id: 3,
        nama: "Budi Hartono",
        nik: "19850607 201001 1 003",
        letterType: "Surat Keterangan Tidak Mampu",
        signatoryName: "Dra. Siti Aminah, M.AP.",
        timestamp: "2024-12-13T09:45:15Z",
      },
      {
        id: 4,
        nama: "Dewi Sartika",
        nik: "19900215 201203 2 004",
        letterType: "Surat Pengantar Nikah",
        signatoryName: "Dr. Budi Santoso, S.Sos., M.Si.",
        timestamp: "2024-12-12T16:20:45Z",
      },
      {
        id: 5,
        nama: "Andi Wijaya",
        nik: "19880920 201105 1 005",
        letterType: "Surat Pengantar Nikah",
        signatoryName: "Dr. Budi Santoso, S.Sos., M.Si.",
        timestamp: "2024-12-12T16:25:30Z",
      },
      {
        id: 6,
        nama: "Rini Susanti",
        nik: "19930825 201408 2 006",
        letterType: "Surat Keterangan Kelahiran",
        signatoryName: "Dra. Siti Aminah, M.AP.",
        timestamp: "2024-12-11T11:10:20Z",
      },
      {
        id: 7,
        nama: "Joko Widodo",
        nik: "19780410 200009 1 007",
        letterType: "Surat Keterangan Domisili",
        signatoryName: "H. Rahman Hakim, S.IP.",
        timestamp: "2024-12-10T13:30:00Z",
      },
      {
        id: 8,
        nama: "Maya Sari",
        nik: "19860518 201012 2 008",
        letterType: "Surat Keterangan Usaha",
        signatoryName: "Dr. Budi Santoso, S.Sos., M.Si.",
        timestamp: "2024-12-09T08:45:30Z",
      },
    ];
  },
};

export default function LetterHistoryPage() {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  // Load letter history on component mount
  useEffect(() => {
    loadLetterHistory();
  }, []);

  const loadLetterHistory = async () => {
    try {
      setLoading(true);
      const data = await mockAPI.getLetterHistory();
      setLetters(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat riwayat surat",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (letter) => {
    setSelectedLetter(letter);
    setDetailModalOpen(true);
  };

  const closeModal = () => {
    setDetailModalOpen(false);
    setSelectedLetter(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Riwayat Surat</h1>
            <p className="text-gray-600 mt-1">
              Data historis surat-surat yang telah dibuat di sistem persuratan
              desa
            </p>
          </div>

          <LetterHistoryTable
            letters={letters}
            onViewDetail={handleViewDetail}
            loading={loading}
          />

          {/* Detail Modal */}
          <LetterDetailModal
            isOpen={detailModalOpen}
            onClose={closeModal}
            letter={selectedLetter}
          />
        </main>
      </div>
    </div>
  );
}
