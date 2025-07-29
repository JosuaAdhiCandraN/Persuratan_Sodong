"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const POSITIONS = [
  "Kepala Desa",
  "Sekretaris Desa",
  "Kepala Urusan Pemerintahan",
  "Kepala Urusan Pembangunan",
  "Kepala Urusan Kesejahteraan Rakyat",
  "Kepala Urusan Keuangan",
  "Kepala Urusan Umum",
  "Kepala Dusun",
  "Lainnya", // Tambahkan ini
];

const RANKS = [
  "Pengatur Muda",
  "Pengatur Muda Tingkat I",
  "Pengatur",
  "Pengatur Tingkat I",
  "Penata Muda",
  "Penata Muda Tingkat I",
  "Penata",
  "Penata Tingkat I",
  "Pembina",
  "Pembina Tingkat I",
  "Pembina Utama Muda",
];

const GRADES = [
  "IV/c",
  "IV/b",
  "IV/a",
  "III/d",
  "III/c",
  "III/b",
  "III/a",
  "II/d",
  "II/c",
  "II/b",
  "II/a",
  "I/d",
  "I/c",
  "I/b",
  "I/a",
];

export function SignatoryFormModal({
  isOpen,
  onClose,
  onSubmit,
  signatory = null,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    nip: "",
    position: "",
    rank: "",
    grade: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [customPositions, setCustomPositions] = useState([]);
  const [isAddPositionModalOpen, setAddPositionModalOpen] = useState(false);
  const [newPosition, setNewPosition] = useState("");

  const isEdit = !!signatory;

  useEffect(() => {
    if (signatory) {
      setFormData({
        name: signatory.name || "",
        nip: signatory.nip || "",
        position: signatory.position || "",
        rank: signatory.rank || "",
        grade: signatory.grade || "",
        notes: signatory.notes || "",
      });
    } else {
      setFormData({
        name: "",
        nip: "",
        position: "",
        rank: "",
        grade: "",
        notes: "",
      });
    }
    setErrors({});
  }, [signatory, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    }

    if (!formData.nip.trim()) {
      newErrors.nip = "NIP wajib diisi";
    } else if (!/^\d{18}$/.test(formData.nip.replace(/\s/g, ""))) {
      newErrors.nip = "NIP harus terdiri dari 18 digit angka";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Jabatan wajib diisi";
    }

    // Rank and grade are optional for non-civil servants
    if (formData.rank && !formData.grade) {
      newErrors.grade = "Golongan wajib diisi jika pangkat diisi";
    }

    if (formData.grade && !formData.rank) {
      newErrors.rank = "Pangkat wajib diisi jika golongan diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      nip: formData.nip.replace(/\s/g, ""), // Remove spaces from NIP
    };

    onSubmit(submitData);
  };

  const formatNIP = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Format as XX XXX XXX X XXX XXX
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    if (digits.length <= 8)
      return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
    if (digits.length <= 9)
      return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
        5,
        8
      )} ${digits.slice(8)}`;
    if (digits.length <= 12)
      return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
        5,
        8
      )} ${digits.slice(8, 9)} ${digits.slice(9)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
      5,
      8
    )} ${digits.slice(8, 9)} ${digits.slice(9, 12)} ${digits.slice(12, 15)}`;
  };

  const handleNIPChange = (e) => {
    const formatted = formatNIP(e.target.value);
    setFormData((prev) => ({
      ...prev,
      nip: formatted,
    }));

    if (errors.nip) {
      setErrors((prev) => ({
        ...prev,
        nip: "",
      }));
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEdit
                ? "Edit Pejabat Penandatangan"
                : "Tambah Pejabat Penandatangan"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Ubah informasi pejabat yang berwenang menandatangani surat"
                : "Tambahkan pejabat baru yang berwenang menandatangani surat"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Nama Lengkap <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* NIP */}
            <div className="space-y-2">
              <Label htmlFor="nip">
                NIP (Nomor Induk Pegawai){" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nip"
                name="nip"
                value={formData.nip}
                onChange={handleNIPChange}
                placeholder="XX XXX XXX X XXX XXX"
                maxLength={21} // Including spaces
                className={errors.nip ? "border-red-500" : ""}
              />
              {errors.nip && (
                <p className="text-sm text-red-500">{errors.nip}</p>
              )}
              <p className="text-xs text-gray-500">Format: 18 digit angka</p>
            </div>

            {/* Position */}
            <div className="space-y-2">
              <Label htmlFor="position">
                Jabatan <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.position}
                onValueChange={(value) => {
                  if (value === "Lainnya") {
                    setAddPositionModalOpen(true);
                  } else {
                    handleSelectChange("position", value);
                  }
                }}
              >
                <SelectTrigger
                  className={errors.position ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Pilih jabatan" />
                </SelectTrigger>
                <SelectContent>
                  {[...POSITIONS, ...customPositions].map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.position && (
                <p className="text-sm text-red-500">{errors.position}</p>
              )}
            </div>

            {/* Rank and Grade */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rank">Pangkat</Label>
                <Select
                  value={formData.rank}
                  onValueChange={(value) => handleSelectChange("rank", value)}
                >
                  <SelectTrigger
                    className={errors.rank ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Pilih pangkat" />
                  </SelectTrigger>
                  <SelectContent>
                    {RANKS.map((rank) => (
                      <SelectItem key={rank} value={rank}>
                        {rank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.rank && (
                  <p className="text-sm text-red-500">{errors.rank}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Golongan</Label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) => handleSelectChange("grade", value)}
                >
                  <SelectTrigger
                    className={errors.grade ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Pilih golongan" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADES.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.grade && (
                  <p className="text-sm text-red-500">{errors.grade}</p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Catatan</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Catatan tambahan (opsional)"
                rows={3}
              />
            </div>

            {/* Info Alert */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Pangkat dan Golongan bersifat opsional untuk pejabat non-PNS.
                Jika diisi salah satu, maka keduanya harus diisi.
              </AlertDescription>
            </Alert>
          </form>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading
                ? "Menyimpan..."
                : isEdit
                ? "Simpan Perubahan"
                : "Tambah Pejabat"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isAddPositionModalOpen}
        onOpenChange={setAddPositionModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Jabatan Baru</DialogTitle>
            <DialogDescription>
              Masukkan jabatan yang belum tersedia di daftar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="new-position">Nama Jabatan</Label>
            <Input
              id="new-position"
              value={newPosition}
              onChange={(e) => setNewPosition(e.target.value)}
              placeholder="Contoh: Staf Khusus Desa"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setNewPosition("");
                setAddPositionModalOpen(false);
              }}
            >
              Batal
            </Button>
            <Button
              onClick={() => {
                if (newPosition.trim() !== "") {
                  setCustomPositions((prev) => [...prev, newPosition.trim()]);
                  setFormData((prev) => ({
                    ...prev,
                    position: newPosition.trim(),
                  }));
                  setNewPosition("");
                  setAddPositionModalOpen(false);
                }
              }}
            >
              Tambah
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
