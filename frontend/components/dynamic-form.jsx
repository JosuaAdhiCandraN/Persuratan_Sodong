"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Info,
  Loader2,
  CheckCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { DynamicFieldRenderer } from "./dynamic-field-renderer";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const ATAS_NAMA_POSITIONS = [
  "Kepala Desa",
  "Sekretaris Desa",
  "Kepala Urusan Pemerintahan",
  "Kepala Urusan Pembangunan",
  "Kepala Urusan Kesejahteraan Rakyat",
  "Kepala Urusan Keuangan",
  "Kepala Urusan Umum",
  "Kepala Dusun I",
  "Kepala Dusun II",
  "Kepala Dusun III",
];
export function DynamicForm({ letterType, onSubmit }) {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSignatory, setSelectedSignatory] = useState(null);
  const [atasNama, setAtasNama] = useState("");
  const [signatories, setSignatories] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
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

  // Fetch signatories
  useEffect(() => {
    const fetchSignatories = async () => {
      try {
        const res = await fetch("${process.env.NEXT_PUBLIC_API_URL}/desa/call/pejabat");
        if (!res.ok) throw new Error("Gagal memuat data pejabat");
        const data = await res.json();
        setSignatories(data);
      } catch (error) {
        console.error("Gagal mengambil data pejabat:", error);
      }
    };

    if (letterType) {
      fetchSignatories();
    }
  }, [letterType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePejabatSelect = async (e) => {
    const nip = e.target.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/desa/call/pejabat/${nip}`);
    const data = await res.json();
    setFormData((prev) => ({
      ...prev,
      name: data.name,
      position: data.position,
      rank: data.rank,
      grade: data.grade,
    }));
  };

  const handleSearch = async (nik) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/surat/${letterType.trim()}/${nik}`
      );
      if (!res.ok) {
        alert("Data tidak ditemukan");
        console.log(
          "Fetching from:",
          `${process.env.NEXT_PUBLIC_API_URL}/surat/${letterType}/${nik}`
        );
        return;
      }
      const result = await res.json();
      let data = result.data;
      if (data.tgl_lahir) {
        const dateObj = new Date(data.tgl_lahir);
        data.tgl_lahir = dateObj.toISOString().split("T")[0];
      }

      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
      console.log("Response:", result);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Terjadi kesalahan saat mengambil data");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!acceptTerms) {
      alert("Harap setujui syarat dan ketentuan");
      return;
    }

    if (!selectedSignatory) {
      alert("Harap pilih pejabat penandatangan");
      return;
    }

    // No additional validation needed for atasNama since it's now optional

    setShowConfirmation(true);
  };

  const handleConfirmGeneration = async () => {
    const submissionData = {
      jenisSurat: letterType,
      data: {
        ...formData,
        nip: selectedSignatory.nip,
        name: selectedSignatory.name,
        position: selectedSignatory.position,
        rank: selectedSignatory.rank,
        grade: selectedSignatory.grade,
        atas_nama: atasNama || null,
        created_by: "Admin Desa",
        timestamp: new Date().toISOString(),
      },
    };

    setShowConfirmation(false);
    setIsGenerating(true);

    try {
      const response = await fetch("${process.env.NEXT_PUBLIC_API_URL}/surat/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Gagal membuat surat");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      const fileName = `${letterType}_${formData.nama}.docx`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      // Simpan hasil ke state (opsional)
      setGenerationResult({
        success: true,
        message: "Surat berhasil dibuat",
      });

      if (onSubmit) {
        onSubmit(submissionData);
      }
    } catch (error) {
      console.error("Error generating letter:", error);
      setGenerationResult({
        success: false,
        error: error.message || "Terjadi kesalahan saat membuat surat",
        message: "Pembuatan surat gagal",
      });
    } finally {
      setIsGenerating(false);
      setShowResult(true);
    }
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setGenerationResult(null);

    // Reset form if generation was successful
    if (generationResult?.success) {
      setFormData({});
      setSelectedSignatory(null);
      setAtasNama("");
      setAcceptTerms(false);
    }
  };

  const handleGoToDownload = () => {
    if (generationResult?.data?.downloadUrl) {
      const downloadParams = new URLSearchParams({
        url: generationResult.data.downloadUrl,
        fileName: generationResult.data.fileName,
        fileType: generationResult.data.fileType,
        fileSize: generationResult.data.fileSize,
        letterId: generationResult.data.letterId,
      });

      router.push(`/download?${downloadParams.toString()}`);
    }
  };

  const handleRetry = () => {
    setShowResult(false);
    setGenerationResult(null);
    setShowConfirmation(true);
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

        {/* Signatory Selection */}
        <div className="space-y-4 pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900">
            Pejabat Penandatangan
          </h3>

          <div className="space-y-2">
            <Label htmlFor="signatory" className="text-sm font-medium">
              Pilih Pejabat Penandatangan{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Select
              value={selectedSignatory?.nip?.toString() || ""}
              onValueChange={(value) => {
                const signatory = signatories.find(
                  (s) => s?.nip?.toString() === value
                );
                setSelectedSignatory(signatory);
                setAtasNama("");

                if (signatory) {
                  setFormData((prev) => ({
                    ...prev,
                    nip: signatory.nip,
                    name: signatory.name,
                    position: signatory.position,
                    rank: signatory.rank,
                    grade: signatory.grade,
                  }));
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih pejabat penandatangan" />
              </SelectTrigger>
              <SelectContent>
                {signatories?.map((signatory) => (
                  <SelectItem
                    key={signatory.nip}
                    value={signatory?.nip?.toString()}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{signatory.name}</span>
                      <span className="text-sm text-gray-500">
                        {signatory.position}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Checkbox for "Atas Nama" */}
          {selectedSignatory && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isAtasNama"
                  checked={!!atasNama}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      // When checked, set a default value to make the dropdown appear
                      setAtasNama(ATAS_NAMA_POSITIONS[0] || ""); // Set to first option or empty if none
                    } else {
                      // When unchecked, clear the atasNama value
                      setAtasNama("");
                    }
                  }}
                />
                <Label htmlFor="isAtasNama" className="text-sm font-medium">
                  Penandatanganan atas nama pejabat lain
                </Label>
              </div>

              {/* Show "Atas Nama" dropdown if checkbox is checked */}
              {atasNama !== "" && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="atasNama" className="text-sm font-medium">
                    Atas Nama <span className="text-red-500">*</span>
                  </Label>
                  <Select value={atasNama} onValueChange={setAtasNama}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih jabatan atas nama" />
                    </SelectTrigger>
                    <SelectContent>
                      {ATAS_NAMA_POSITIONS.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Detail Pejabat Terpilih:
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Nama:</span>{" "}
                    {selectedSignatory.name}
                  </p>
                  <p>
                    <span className="font-medium">Jabatan:</span>{" "}
                    {selectedSignatory.position}
                  </p>
                  {selectedSignatory.rank && (
                    <p>
                      <span className="font-medium">Pangkat:</span>{" "}
                      {selectedSignatory.rank}
                    </p>
                  )}
                  {selectedSignatory.grade && (
                    <p>
                      <span className="font-medium">Golongan:</span>{" "}
                      {selectedSignatory.grade}
                    </p>
                  )}
                  {atasNama && (
                    <p>
                      <span className="font-medium">Atas Nama:</span> {atasNama}
                    </p>
                  )}
                </div>
              </div> */}
            </div>
          )}
        </div>

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
            disabled={!acceptTerms || !selectedSignatory}
          >
            Buat Surat
          </Button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Konfirmasi Pembuatan Surat
            </h3>

            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p>
                  <span className="font-medium">Jenis Surat:</span> {letterType}
                </p>
                <p>
                  <span className="font-medium">Nama Pemohon:</span>{" "}
                  {formData.nama}
                </p>
                <p>
                  <span className="font-medium">Pejabat Penandatangan:</span>{" "}
                  {selectedSignatory.name}
                </p>
                <p>
                  <span className="font-medium">Jabatan:</span>{" "}
                  {selectedSignatory.position}
                </p>
                {atasNama && (
                  <p>
                    <span className="font-medium">Atas Nama:</span> {atasNama}
                  </p>
                )}
              </div>

              <p className="text-sm text-gray-600">
                Apakah Anda yakin ingin membuat surat dengan informasi di atas?
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                onClick={handleConfirmGeneration}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Ya, Buat Surat
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Modal */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 text-center">
            <div className="mb-4">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Membuat Surat
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Mohon tunggu, surat sedang diproses...
            </p>
            <div className="space-y-2">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full animate-pulse"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">
                Memproses data dan membuat dokumen
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {showResult && generationResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              {!generationResult.success ? (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Surat Berhasil Dibuat!
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {/* {generationResult.message} */}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Pembuatan Surat Gagal
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {generationResult.error}
                  </p>
                </div>
              )}
            </div>

            {generationResult.success && generationResult.data && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  Detail Surat:
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">ID Surat:</span>{" "}
                    {generationResult.data.letterId}
                  </p>
                  <p>
                    <span className="font-medium">Nama File:</span>{" "}
                    {generationResult.data.fileName}
                  </p>
                  <p>
                    <span className="font-medium">Ukuran:</span>{" "}
                    {generationResult.data.fileSize}
                  </p>
                  <p>
                    <span className="font-medium">Format:</span>{" "}
                    {generationResult.data.fileType}
                  </p>
                  <p>
                    <span className="font-medium">Dibuat:</span>{" "}
                    {new Date(generationResult.data.generatedAt).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {generationResult.success ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCloseResult}
                    className="flex-1 bg-transparent"
                  >
                    Tutup
                  </Button>
                  <Button
                    onClick={handleGoToDownload}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {/* Buka Halaman Download */}
                    Buat Surat Baru
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCloseResult}
                    className="flex-1 bg-transparent"
                  >
                    Tutup
                  </Button>
                  <Button
                    onClick={handleRetry}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {/* Coba Lagi */}
                    Buat Surat Baru
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
