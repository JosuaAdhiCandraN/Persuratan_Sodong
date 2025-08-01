"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Eye,
  Plus,
  Search,
  Upload,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

export function CitizensTable({
  citizens,
  onAdd,
  onEdit,
  onView,
  onUploadCSV,
  onDownloadTemplate,
  loading,
  totalCount = 0,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("nama_lengkap");
  const [sortDirection, setSortDirection] = useState("asc");

  // Filter citizens based on search term
  const filteredCitizens = citizens.filter(
    (citizen) =>
      citizen.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      citizen.nik.includes(searchTerm) ||
      citizen.no_kk.includes(searchTerm) ||
      citizen.alamat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort citizens
  const sortedCitizens = [...filteredCitizens].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle different data types
    if (
      sortField === "tgl_lahir" ||
      sortField === "tgl_perkawinan_perceraian" ||
      sortField === "tgl_update_kk"
    ) {
      aValue = new Date(aValue || 0);
      bValue = new Date(bValue || 0);
    } else if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Paginate citizens
  const totalPages = Math.ceil(sortedCitizens.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCitizens = sortedCitizens.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID");
  };

  const getGenderBadge = (gender) => {
    return gender === "LK" ? (
      <Badge
        variant="outline"
        className="bg-blue-50 text-blue-700 border-blue-200"
      >
        Laki-laki
      </Badge>
    ) : (
      <Badge
        variant="outline"
        className="bg-pink-50 text-pink-700 border-pink-200"
      >
        Perempuan
      </Badge>
    );
  };

  const getMaritalStatusBadge = (status) => {
    const statusMap = {
      "BELUM KAWIN": {
        color: "bg-gray-50 text-gray-700 border-gray-200",
        label: "Belum Kawin",
      },
      KAWIN: {
        color: "bg-green-50 text-green-700 border-green-200",
        label: "Kawin",
      },
      "CERAI HIDUP": {
        color: "bg-orange-50 text-orange-700 border-orange-200",
        label: "Cerai Hidup",
      },
      "CERAI MATI": {
        color: "bg-red-50 text-red-700 border-red-200",
        label: "Cerai Mati",
      },
    };
    const statusInfo = statusMap[status] || statusMap["BELUM KAWIN"];
    return (
      <Badge variant="outline" className={statusInfo.color}>
        {statusInfo.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading data warga...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-xl font-bold">Data Warga</CardTitle>
            <CardDescription>
              Kelola data kependudukan warga desa
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onDownloadTemplate}
              className="flex items-center gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              Template CSV
            </Button>
            <Button
              variant="outline"
              onClick={onUploadCSV}
              className="flex items-center gap-2 bg-transparent"
            >
              <Upload className="h-4 w-4" />
              Import CSV
            </Button>
            <Button
              onClick={onAdd}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Tambah Warga
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari berdasarkan nama, NIK, No KK, atau alamat..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="max-w-md"
          />
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold min-w-[150px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("nama_lengkap")}
                      className="h-auto p-0 font-semibold"
                    >
                      Nama Lengkap
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold min-w-[120px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("nik")}
                      className="h-auto p-0 font-semibold"
                    >
                      NIK
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold min-w-[120px]">
                    No KK
                  </TableHead>
                  <TableHead className="font-semibold min-w-[200px]">
                    Alamat
                  </TableHead>
                  <TableHead className="font-semibold min-w-[80px]">
                    RT/RW
                  </TableHead>
                  <TableHead className="font-semibold min-w-[100px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("tgl_lahir")}
                      className="h-auto p-0 font-semibold"
                    >
                      Tgl Lahir
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold min-w-[100px]">
                    Jenis Kelamin
                  </TableHead>
                  <TableHead className="font-semibold min-w-[120px]">
                    Status Kawin
                  </TableHead>
                  <TableHead className="font-semibold min-w-[80px]">
                    Umur
                  </TableHead>
                  <TableHead className="font-semibold text-center min-w-[120px]">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCitizens.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="text-center py-8 text-gray-500"
                    >
                      {searchTerm
                        ? "Tidak ada data yang sesuai dengan pencarian"
                        : "Belum ada data warga"}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCitizens.map((citizen) => (
                    <TableRow key={citizen.nik} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {citizen.nama_lengkap}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {citizen.nik}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {citizen.no_kk}
                      </TableCell>
                      <TableCell
                        className="max-w-[200px] truncate"
                        title={citizen.alamat}
                      >
                        {citizen.alamat}
                      </TableCell>
                      <TableCell>
                        {citizen.rt}/{citizen.rw}
                      </TableCell>
                      <TableCell>{formatDate(citizen.tgl_lahir)}</TableCell>
                      <TableCell>
                        {getGenderBadge(citizen.jenis_kelamin)}
                      </TableCell>
                      <TableCell>
                        {getMaritalStatusBadge(citizen.status_kawin)}
                      </TableCell>
                      <TableCell>{citizen.umur} tahun</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView(citizen)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(citizen)}
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Menampilkan {startIndex + 1}-
              {Math.min(startIndex + ITEMS_PER_PAGE, sortedCitizens.length)}{" "}
              dari {sortedCitizens.length} warga
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Sebelumnya
              </Button>
              <span className="text-sm">
                Halaman {currentPage} dari {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Selanjutnya
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="flex justify-between items-center text-sm text-gray-600 pt-4 border-t">
          <span>Total: {citizens.length} warga terdaftar</span>
          <span>
            {searchTerm && `Hasil pencarian: ${filteredCitizens.length} warga`}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
