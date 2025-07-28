"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  User,
  Home,
  Calendar,
  Heart,
  GraduationCap,
  Briefcase,
  BadgeIcon as IdCard,
  MapPin,
  CheckCircle,
  XCircle,
} from "lucide-react"

export function CitizenDetailModal({ isOpen, onClose, citizen, onEdit }) {
  if (!citizen) return null

  const formatDate = (dateString) => {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getGenderLabel = (gender) => {
    return gender === "L" ? "Laki-laki" : "Perempuan"
  }

  const getGenderBadge = (gender) => {
    return gender === "L" ? (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        Laki-laki
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
        Perempuan
      </Badge>
    )
  }

  const getMaritalStatusBadge = (status) => {
    const statusMap = {
      "BELUM KAWIN": { color: "bg-gray-50 text-gray-700 border-gray-200", label: "Belum Kawin" },
      KAWIN: { color: "bg-green-50 text-green-700 border-green-200", label: "Kawin" },
      "CERAI HIDUP": { color: "bg-orange-50 text-orange-700 border-orange-200", label: "Cerai Hidup" },
      "CERAI MATI": { color: "bg-red-50 text-red-700 border-red-200", label: "Cerai Mati" },
    }
    const statusInfo = statusMap[status] || statusMap["BELUM KAWIN"]
    return (
      <Badge variant="outline" className={statusInfo.color}>
        {statusInfo.label}
      </Badge>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Detail Data Warga
          </DialogTitle>
          <DialogDescription>Informasi lengkap data kependudukan warga</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Header Info */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">{citizen.nama_lengkap}</h2>
                    <div className="flex flex-wrap gap-2">
                      {getGenderBadge(citizen.jenis_kelamin)}
                      {getMaritalStatusBadge(citizen.status_kawin)}
                      {citizen.e_ktp ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          e-KTP
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <XCircle className="h-3 w-3 mr-1" />
                          Belum e-KTP
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm text-gray-600">NIK</div>
                    <div className="font-mono font-bold text-lg">{citizen.nik}</div>
                    <div className="text-sm text-gray-600">No KK: {citizen.no_kk}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Informasi Pribadi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Tempat, Tanggal Lahir</p>
                        <p className="font-medium">
                          {citizen.tempat_lahir ? `${citizen.tempat_lahir}, ` : ""}
                          {formatDate(citizen.tgl_lahir)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Umur</p>
                        <p className="font-medium">{citizen.umur} tahun</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Heart className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Agama</p>
                        <p className="font-medium">{citizen.agama || "-"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <IdCard className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Kewarganegaraan</p>
                        <p className="font-medium">{citizen.kewarganegaraan}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">No Akte Kelahiran</p>
                        <p className="font-medium">{citizen.no_akte || "-"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Home className="h-5 w-5 text-green-600" />
                  Informasi Alamat
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Alamat</p>
                      <p className="font-medium">{citizen.alamat}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Home className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">RT/RW</p>
                        <p className="font-medium">
                          {citizen.rt}/{citizen.rw}
                        </p>
                      </div>
                    </div>
                  </div>
                  {citizen.alamat_lengkap && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Alamat Lengkap</p>
                        <p className="font-medium">{citizen.alamat_lengkap}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Family Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Informasi Keluarga
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Heart className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Status Hubungan Dalam Keluarga</p>
                        <p className="font-medium">{citizen.shdk || "-"}</p>
                      </div>
                    </div>
                    {citizen.tgl_perkawinan_perceraian && (
                      <div className="flex items-start gap-3">
                        <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Tanggal Perkawinan/Perceraian</p>
                          <p className="font-medium">{formatDate(citizen.tgl_perkawinan_perceraian)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Nama Ayah</p>
                        <p className="font-medium">{citizen.ayah || "-"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Nama Ibu</p>
                        <p className="font-medium">{citizen.ibu || "-"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education and Work */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                  Pendidikan & Pekerjaan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Pendidikan Terakhir</p>
                        <p className="font-medium">{citizen.pendidikan || "-"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Briefcase className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Jenis Pekerjaan</p>
                        <p className="font-medium">{citizen.jenis_pekerjaan || "-"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {citizen.kesejahteraan && (
                  <div className="mt-4">
                    <div className="flex items-start gap-3">
                      <Heart className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Tingkat Kesejahteraan</p>
                        <p className="font-medium">{citizen.kesejahteraan}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Information */}
            {citizen.tgl_update_kk && (
              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    Informasi Tambahan
                  </h3>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Tanggal Update KK</p>
                      <p className="font-medium">{formatDate(citizen.tgl_update_kk)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Tutup
          </Button>
          <Button
            type="button"
            onClick={() => {
              onClose()
              onEdit(citizen)
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Edit Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
