"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  AlertCircle,
  User,
  Home,
  Calendar,
  Heart,
  GraduationCap,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const AGAMA_OPTIONS = [
  "Islam",
  "Kristen",
  "Katolik",
  "Hindu",
  "Buddha",
  "Konghucu",
  "Lainnya",
];
const PENDIDIKAN_OPTIONS = [
  "TIDAK / BELUM SEKOLAH",
  "BELUM TAMAT SD/SEDERAJAT",
  "TAMAT SD / SEDERAJAT",
  "SLTP/SEDERAJAT",
  "SLTA / SEDERAJAT",
  "DIPLOMA IV/ STRATA I",
  "STRATA II",
  "STRATA III",
];
const STATUS_KAWIN_OPTIONS = [
  "BELUM KAWIN",
  "KAWIN",
  "CERAI HIDUP",
  "CERAI MATI",
];
const JENIS_KELAMIN_OPTIONS = [
  { value: "L", label: "Laki-laki" },
  { value: "P", label: "Perempuan" },
];
const SHDK_OPTIONS = [
  "KEPALA KELUARGA",
  "SUAMI",
  "ISTRI",
  "ANAK",
  "MENANTU",
  "CUCU",
  "ORANGTUA",
  "MERTUA",
  "FAMILI LAIN",
  "PEMBANTU",
  "LAINNYA",
];
const KEWARGANEGARAAN_OPTIONS = ["WNI", "WNA"];

export function CitizenFormModal({
  isOpen,
  onClose,
  onSubmit,
  citizen = null,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    no_kk: "",
    nik: "",
    nama_lengkap: "",
    alamat: "",
    rt: "",
    rw: "",
    tempat_lahir: "",
    tgl_lahir: "",
    jenis_kelamin: "",
    status_kawin: "",
    tgl_perkawinan_perceraian: "",
    pendidikan: "",
    agama: "",
    no_akte: "",
    umur: "",
    shdk: "",
    kewarganegaraan: "WNI",
    ayah: "",
    ibu: "",
    jenis_pekerjaan: "",
    kesejahteraan: "",
    e_ktp: false,
    tgl_update_kk: "",
    alamat_lengkap: "",
  });
  const [errors, setErrors] = useState({});

  const isEdit = !!citizen;

  useEffect(() => {
    if (citizen) {
      setFormData({
        no_kk: citizen.no_kk || "",
        nik: citizen.nik || "",
        nama_lengkap: citizen.nama_lengkap || "",
        alamat: citizen.alamat || "",
        rt: citizen.rt || "",
        rw: citizen.rw || "",
        tempat_lahir: citizen.tempat_lahir || "",
        tgl_lahir: citizen.tgl_lahir || "",
        jenis_kelamin: citizen.jenis_kelamin || "",
        status_kawin: citizen.status_kawin || "",
        tgl_perkawinan_perceraian: citizen.tgl_perkawinan_perceraian || "",
        pendidikan: citizen.pendidikan || "",
        agama: citizen.agama || "",
        no_akte: citizen.no_akte || "",
        umur: citizen.umur?.toString() || "",
        shdk: citizen.shdk || "",
        kewarganegaraan: citizen.kewarganegaraan || "WNI",
        ayah: citizen.ayah || "",
        ibu: citizen.ibu || "",
        jenis_pekerjaan: citizen.jenis_pekerjaan || "",
        kesejahteraan: citizen.kesejahteraan || "",
        e_ktp: citizen.e_ktp || false,
        tgl_update_kk: citizen.tgl_update_kk || "",
        alamat_lengkap: citizen.alamat_lengkap || "",
      });
    } else {
      setFormData({
        no_kk: "",
        nik: "",
        nama_lengkap: "",
        alamat: "",
        rt: "",
        rw: "",
        tempat_lahir: "",
        tgl_lahir: "",
        jenis_kelamin: "",
        status_kawin: "",
        tgl_perkawinan_perceraian: "",
        pendidikan: "",
        agama: "",
        no_akte: "",
        umur: "",
        shdk: "",
        kewarganegaraan: "WNI",
        ayah: "",
        ibu: "",
        jenis_pekerjaan: "",
        kesejahteraan: "",
        e_ktp: false,
        tgl_update_kk: "",
        alamat_lengkap: "",
      });
    }
    setErrors({});
  }, [citizen, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.no_kk.trim()) newErrors.no_kk = "No KK wajib diisi";
    if (!formData.nik.trim()) newErrors.nik = "NIK wajib diisi";
    if (!formData.nama_lengkap.trim())
      newErrors.nama_lengkap = "Nama lengkap wajib diisi";

    // NIK validation (16 digits)
    if (formData.nik && !/^\d{16}$/.test(formData.nik)) {
      newErrors.nik = "NIK harus 16 digit angka";
    }

    // No KK validation (16 digits)
    if (formData.no_kk && !/^\d{16}$/.test(formData.no_kk)) {
      newErrors.no_kk = "No KK harus 16 digit angka";
    }

    // Age validation
    if (
      formData.umur &&
      (isNaN(formData.umur) ||
        Number.parseInt(formData.umur) < 0 ||
        Number.parseInt(formData.umur) > 150)
    ) {
      newErrors.umur = "Umur harus berupa angka antara 0-150";
    }

    // RT/RW validation
    if (
      formData.rt &&
      (isNaN(formData.rt) || Number.parseInt(formData.rt) < 1)
    ) {
      newErrors.rt = "RT harus berupa angka positif";
    }
    if (
      formData.rw &&
      (isNaN(formData.rw) || Number.parseInt(formData.rw) < 1)
    ) {
      newErrors.rw = "RW harus berupa angka positif";
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
      umur: formData.umur ? Number.parseInt(formData.umur) : null,
      rt: formData.rt ? Number.parseInt(formData.rt) : null,
      rw: formData.rw ? Number.parseInt(formData.rw) : null,
    };

    onSubmit(submitData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Data Warga" : "Tambah Data Warga"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Ubah informasi data warga"
              : "Tambahkan data warga baru ke sistem"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Informasi Pribadi</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="no_kk">
                    No KK <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="no_kk"
                    name="no_kk"
                    value={formData.no_kk}
                    onChange={handleInputChange}
                    placeholder="16 digit nomor KK"
                    maxLength={16}
                    className={errors.no_kk ? "border-red-500" : ""}
                  />
                  {errors.no_kk && (
                    <p className="text-sm text-red-500">{errors.no_kk}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nik">
                    NIK <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nik"
                    name="nik"
                    value={formData.nik}
                    onChange={handleInputChange}
                    placeholder="16 digit NIK"
                    maxLength={16}
                    className={errors.nik ? "border-red-500" : ""}
                  />
                  {errors.nik && (
                    <p className="text-sm text-red-500">{errors.nik}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="nama_lengkap">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nama_lengkap"
                    name="nama_lengkap"
                    value={formData.nama_lengkap}
                    onChange={handleInputChange}
                    placeholder="Nama lengkap sesuai KTP"
                    className={errors.nama_lengkap ? "border-red-500" : ""}
                  />
                  {errors.nama_lengkap && (
                    <p className="text-sm text-red-500">
                      {errors.nama_lengkap}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                  <Input
                    id="tempat_lahir"
                    name="tempat_lahir"
                    value={formData.tempat_lahir}
                    onChange={handleInputChange}
                    placeholder="Kota/Kabupaten lahir"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tgl_lahir">Tanggal Lahir</Label>
                  <Input
                    id="tgl_lahir"
                    name="tgl_lahir"
                    type="date"
                    value={formData.tgl_lahir}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                  <Select
                    value={formData.jenis_kelamin}
                    onValueChange={(value) =>
                      handleSelectChange("jenis_kelamin", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      {JENIS_KELAMIN_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="umur">Umur</Label>
                  <Input
                    id="umur"
                    name="umur"
                    type="number"
                    value={formData.umur}
                    onChange={handleInputChange}
                    placeholder="Umur dalam tahun"
                    min="0"
                    max="150"
                    className={errors.umur ? "border-red-500" : ""}
                  />
                  {errors.umur && (
                    <p className="text-sm text-red-500">{errors.umur}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agama">Agama</Label>
                  <Select
                    value={formData.agama}
                    onValueChange={(value) =>
                      handleSelectChange("agama", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih agama" />
                    </SelectTrigger>
                    <SelectContent>
                      {AGAMA_OPTIONS.map((agama) => (
                        <SelectItem key={agama} value={agama}>
                          {agama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kewarganegaraan">Kewarganegaraan</Label>
                  <Select
                    value={formData.kewarganegaraan}
                    onValueChange={(value) =>
                      handleSelectChange("kewarganegaraan", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kewarganegaraan" />
                    </SelectTrigger>
                    <SelectContent>
                      {KEWARGANEGARAAN_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Address Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold">Informasi Alamat</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="alamat">Alamat</Label>
                  <Textarea
                    id="alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                    placeholder="Alamat sesuai KTP"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rt">RT</Label>
                  <Input
                    id="rt"
                    name="rt"
                    type="number"
                    value={formData.rt}
                    onChange={handleInputChange}
                    placeholder="Nomor RT"
                    min="1"
                    className={errors.rt ? "border-red-500" : ""}
                  />
                  {errors.rt && (
                    <p className="text-sm text-red-500">{errors.rt}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rw">RW</Label>
                  <Input
                    id="rw"
                    name="rw"
                    type="number"
                    value={formData.rw}
                    onChange={handleInputChange}
                    placeholder="Nomor RW"
                    min="1"
                    className={errors.rw ? "border-red-500" : ""}
                  />
                  {errors.rw && (
                    <p className="text-sm text-red-500">{errors.rw}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="alamat_lengkap">Alamat Lengkap</Label>
                  <Textarea
                    id="alamat_lengkap"
                    name="alamat_lengkap"
                    value={formData.alamat_lengkap}
                    onChange={handleInputChange}
                    placeholder="Alamat lengkap dengan detail"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Family Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold">Informasi Keluarga</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status_kawin">Status Perkawinan</Label>
                  <Select
                    value={formData.status_kawin}
                    onValueChange={(value) =>
                      handleSelectChange("status_kawin", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status perkawinan" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_KAWIN_OPTIONS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tgl_perkawinan_perceraian">
                    Tanggal Perkawinan/Perceraian
                  </Label>
                  <Input
                    id="tgl_perkawinan_perceraian"
                    name="tgl_perkawinan_perceraian"
                    type="date"
                    value={formData.tgl_perkawinan_perceraian}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shdk">Status Hubungan Dalam Keluarga</Label>
                  <Select
                    value={formData.shdk}
                    onValueChange={(value) => handleSelectChange("shdk", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih SHDK" />
                    </SelectTrigger>
                    <SelectContent>
                      {SHDK_OPTIONS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="no_akte">No Akte Kelahiran</Label>
                  <Input
                    id="no_akte"
                    name="no_akte"
                    value={formData.no_akte}
                    onChange={handleInputChange}
                    placeholder="Nomor akte kelahiran"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ayah">Nama Ayah</Label>
                  <Input
                    id="ayah"
                    name="ayah"
                    value={formData.ayah}
                    onChange={handleInputChange}
                    placeholder="Nama lengkap ayah"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ibu">Nama Ibu</Label>
                  <Input
                    id="ibu"
                    name="ibu"
                    value={formData.ibu}
                    onChange={handleInputChange}
                    placeholder="Nama lengkap ibu"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Education and Work */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold">
                  Pendidikan & Pekerjaan
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pendidikan">Pendidikan</Label>
                  <Select
                    value={formData.pendidikan}
                    onValueChange={(value) =>
                      handleSelectChange("pendidikan", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih pendidikan terakhir" />
                    </SelectTrigger>
                    <SelectContent>
                      {PENDIDIKAN_OPTIONS.map((pendidikan) => (
                        <SelectItem key={pendidikan} value={pendidikan}>
                          {pendidikan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jenis_pekerjaan">Jenis Pekerjaan</Label>
                  <Input
                    id="jenis_pekerjaan"
                    name="jenis_pekerjaan"
                    value={formData.jenis_pekerjaan}
                    onChange={handleInputChange}
                    placeholder="Jenis pekerjaan/profesi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kesejahteraan">Tingkat Kesejahteraan</Label>
                  <Input
                    id="kesejahteraan"
                    name="kesejahteraan"
                    value={formData.kesejahteraan}
                    onChange={handleInputChange}
                    placeholder="Tingkat kesejahteraan"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Additional Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold">Informasi Tambahan</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tgl_update_kk">Tanggal Update KK</Label>
                  <Input
                    id="tgl_update_kk"
                    name="tgl_update_kk"
                    type="date"
                    value={formData.tgl_update_kk}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="e_ktp"
                    checked={formData.e_ktp}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, e_ktp: checked }))
                    }
                  />
                  <Label htmlFor="e_ktp">Sudah memiliki e-KTP</Label>
                </div>
              </div>
            </div>

            {/* Info Alert */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Field yang bertanda (*) wajib diisi. Pastikan data yang
                dimasukkan sesuai dengan dokumen resmi.
              </AlertDescription>
            </Alert>
          </form>
        </ScrollArea>

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
              : "Tambah Warga"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
