"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  RefreshCw,
  ExternalLink,
  Clock,
  FileType,
  HardDrive,
} from "lucide-react";

export default function DownloadPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [downloadState, setDownloadState] = useState("ready"); // ready, downloading, success, error
  const [error, setError] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Extract parameters from URL
  const fileUrl = searchParams.get("url");
  const fileName = searchParams.get("fileName");
  const fileType = searchParams.get("fileType");
  const fileSize = searchParams.get("fileSize");
  const letterId = searchParams.get("letterId");

  // Validate required parameters
  const isValidUrl = fileUrl && fileName;

  useEffect(() => {
    if (!isValidUrl) {
      setError("Parameter URL atau nama file tidak valid");
      setDownloadState("error");
    }
  }, [isValidUrl]);

  const handleDownload = async () => {
    if (!fileUrl) {
      setError("URL file tidak tersedia");
      setDownloadState("error");
      return;
    }

    setDownloadState("downloading");
    setDownloadProgress(0);
    setError(null);

    try {
      // Simulate download progress
      const progressInterval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Mock API call to validate and download file
      const response = await fetch(fileUrl, {
        method: "GET",
        headers: {
          Accept:
            "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      });

      clearInterval(progressInterval);
      setDownloadProgress(100);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // For demo purposes, we'll simulate a successful download
      // In a real app, you would handle the actual file download here
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a mock blob and trigger download
      const blob = new Blob(["Mock file content"], { type: "application/pdf" });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName || "document.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);

      setDownloadState("success");
    } catch (err) {
      console.error("Download error:", err);
      setError(err.message || "Gagal mengunduh file. Silakan coba lagi.");
      setDownloadState("error");
      setDownloadProgress(0);
    }
  };

  const handleRetry = () => {
    setError(null);
    setDownloadState("ready");
    setDownloadProgress(0);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleOpenInNewTab = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-600" />;
      case "docx":
      case "doc":
        return <FileType className="h-8 w-8 text-blue-600" />;
      default:
        return <FileText className="h-8 w-8 text-gray-600" />;
    }
  };

  const formatFileSize = (size) => {
    if (!size) return "Unknown";
    return size;
  };

  if (!isValidUrl) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-xl text-red-600">
              URL Tidak Valid
            </CardTitle>
            <CardDescription>
              Parameter yang diperlukan untuk mengunduh file tidak tersedia atau
              tidak valid.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleGoBack}
              className="w-full bg-transparent"
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button onClick={handleGoBack} variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Download Surat</h1>
          <p className="text-gray-600 mt-1">
            Unduh dokumen surat yang telah dibuat
          </p>
        </div>

        {/* File Information Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">{getFileIcon(fileType)}</div>
              <div className="flex-1">
                <CardTitle className="text-lg">{fileName}</CardTitle>
                <CardDescription className="mt-1">
                  {letterId && `ID Surat: ${letterId}`}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <FileType className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Format:</span>
                <span className="font-medium">{fileType || "PDF"}</span>
              </div>
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Ukuran:</span>
                <span className="font-medium">{formatFileSize(fileSize)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600">Siap diunduh</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Unduh Dokumen
            </CardTitle>
            <CardDescription>
              Pilih cara untuk mengunduh atau membuka dokumen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Error Alert */}
            {downloadState === "error" && error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Success Alert */}
            {downloadState === "success" && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  File berhasil diunduh! Periksa folder download Anda.
                </AlertDescription>
              </Alert>
            )}

            {/* Download Progress */}
            {downloadState === "downloading" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mengunduh...</span>
                  <span>{downloadProgress}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${downloadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleDownload}
                disabled={downloadState === "downloading"}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {downloadState === "downloading" ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Mengunduh...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Unduh File
                  </>
                )}
              </Button>

              <Button
                onClick={handleOpenInNewTab}
                variant="outline"
                disabled={downloadState === "downloading"}
                className="flex-1 bg-transparent"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Buka di Tab Baru
              </Button>
            </div>

            {/* Retry Button */}
            {downloadState === "error" && (
              <Button
                onClick={handleRetry}
                variant="outline"
                className="w-full bg-transparent"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Coba Lagi
              </Button>
            )}

            {/* Additional Info */}
            <div className="text-xs text-gray-500 space-y-1">
              <p>• File akan diunduh ke folder download default browser Anda</p>
              <p>• Pastikan browser mengizinkan download dari situs ini</p>
              <p>• Jika download gagal, coba gunakan opsi "Buka di Tab Baru"</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
