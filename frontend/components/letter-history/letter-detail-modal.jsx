"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  User,
  FileText,
  Calendar,
  MapPin,
  BadgeIcon as IdCard,
  Briefcase,
  Award,
  Star,
  Clock,
} from "lucide-react";
import { useRef } from "react";

export function LetterDetailModal({ isOpen, onClose, letter }) {
  if (!letter) return null;

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  };

  const getLetterTypeBadgeColor = (letterType) => {
    const colors = {
      "Surat Keterangan Domisili": "bg-blue-100 text-blue-800",
      "Surat Keterangan Usaha": "bg-green-100 text-green-800",
      "Surat Keterangan Tidak Mampu": "bg-orange-100 text-orange-800",
      "Surat Pengantar Nikah": "bg-purple-100 text-purple-800",
      "Surat Keterangan Kelahiran": "bg-pink-100 text-pink-800",
    };
    return colors[letterType] || "bg-gray-100 text-gray-800";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Detail Riwayat Surat
          </DialogTitle>
          <DialogDescription>
            Informasi lengkap surat yang telah dibuat
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Letter Type and Timestamp */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-2">
                  <Badge
                    variant="secondary"
                    className={`${getLetterTypeBadgeColor(
                      letter.letterType
                    )} text-sm px-3 py-1`}
                  >
                    {letter.letterType}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Dibuat: {formatTimestamp(letter.timestamp)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">ID Surat</div>
                  <div className="font-mono font-medium">
                    #{letter.id.toString().padStart(6, "0")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Person Information */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Informasi Pemohon
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Nama Lengkap</p>
                      <p className="font-semibold">{letter.nama}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IdCard className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">NIK</p>
                      <p className="font-mono">{letter.nik}</p>
                    </div>
                  </div>
                  {/* <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">
                        Tempat, Tanggal Lahir
                      </p>
                      <p>{letter.tempatTanggalLahir}</p>
                    </div>
                  </div> */}
                </div>
                {/* <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Pekerjaan</p>
                      <p>{letter.pekerjaan}</p>
                    </div>
                  </div> 
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Alamat</p>
                      <p>{letter.alamat}</p>
                    </div>
                  </div>
                  {letter.agama && (
                    <div className="flex items-start gap-3">
                      <Star className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Agama</p>
                        <p>{letter.agama}</p>
                      </div>
                    </div>
                  )}
                </div> */}
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Signatory Information */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                Pejabat Penandatangan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Nama Pejabat</p>
                      <p className="font-semibold">{letter.signatoryName}</p>
                    </div>
                  </div>
                  {/* <div className="flex items-start gap-3">
                    <Briefcase className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Jabatan</p>
                      <p>{letter.signatoryPosition}</p>
                    </div>
                  </div> */}
                </div>
                <div className="space-y-3">
                  {letter.signatoryRank && (
                    <div className="flex items-start gap-3">
                      <Award className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Pangkat</p>
                        <p>{letter.signatoryRank}</p>
                      </div>
                    </div>
                  )}
                  {letter.signatoryGrade && (
                    <div className="flex items-start gap-3">
                      <Star className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Golongan</p>
                        <p>{letter.signatoryGrade}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          {letter.notes && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">Catatan</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">
                  {letter.notes}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-3 text-gray-700">
                Metadata Sistem
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                <div>
                  <span className="font-medium">Status:</span> Selesai
                </div>
                <div>
                  <span className="font-medium">Format:</span> PDF
                </div>
                <div>
                  <span className="font-medium">Dibuat oleh:</span>{" "}
                  {letter.createdBy || "Sistem"}
                </div>
                <div>
                  <span className="font-medium">Versi:</span> 1.0
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Tutup
          </Button>
          {/* <Button type="button" className="bg-blue-600 hover:bg-blue-700">
            Download PDF
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
