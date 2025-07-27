"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FileText,
  Calendar,
  User,
  Eye,
} from "lucide-react";

export function LetterHistoryTable({ letters, onViewDetail, loading }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterType, setFilterType] = useState("all");

  // Get unique letter types for filter
  const letterTypes = [
    ...new Set(letters.map((letter) => letter.letterType)),
  ].sort();

  // Filter letters based on search term and filter type
  const filteredLetters = letters.filter((letter) => {
    const matchesSearch =
      letter.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.letterType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.signatoryName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" || letter.letterType === filterType;

    return matchesSearch && matchesFilter;
  });

  // Sort letters
  const sortedLetters = [...filteredLetters].sort((a, b) => {
    let aValue, bValue;

    switch (sortField) {
      case "nama":
        aValue = a.nama.toLowerCase();
        bValue = b.nama.toLowerCase();
        break;
      case "letterType":
        aValue = a.letterType.toLowerCase();
        bValue = b.letterType.toLowerCase();
        break;
      case "signatoryName":
        aValue = a.signatoryName.toLowerCase();
        bValue = b.signatoryName.toLowerCase();
        break;
      case "timestamp":
      default:
        aValue = new Date(a.timestamp);
        bValue = new Date(b.timestamp);
        break;
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field)
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 text-blue-600" />
    ) : (
      <ArrowDown className="h-4 w-4 text-blue-600" />
    );
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
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

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading riwayat surat...</div>
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
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Riwayat Surat
            </CardTitle>
            <CardDescription>
              Data historis surat-surat yang telah dibuat
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Total: {letters.length} surat
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari berdasarkan nama, jenis surat, atau pejabat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Filter jenis surat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Jenis Surat</SelectItem>
              {letterTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {sortedLetters.length}
            </div>
            <div className="text-xs text-gray-600">Ditampilkan</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {letters.length}
            </div>
            <div className="text-xs text-gray-600">Total Surat</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {letterTypes.length}
            </div>
            <div className="text-xs text-gray-600">Jenis Surat</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {[...new Set(letters.map((l) => l.signatoryName))].length}
            </div>
            <div className="text-xs text-gray-600">Pejabat</div>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("nama")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    <User className="h-4 w-4 mr-2" />
                    ID Surat
                    {getSortIcon("nama")}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("nama")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Nama
                    {getSortIcon("nama")}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("letterType")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Surat Yang Dibuat
                    {getSortIcon("letterType")}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("signatoryName")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Pejabat Penandatangan
                    {getSortIcon("signatoryName")}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("timestamp")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Timestamp Pembuatan
                    {getSortIcon("timestamp")}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLetters.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    {searchTerm || filterType !== "all"
                      ? "Tidak ada data yang sesuai dengan pencarian/filter"
                      : "Belum ada riwayat surat"}
                  </TableCell>
                </TableRow>
              ) : (
                sortedLetters.map((letter) => (
                  <TableRow key={letter.id} className="hover:bg-gray-50">
                    <TableCell className="font-mono ">
                      {/* Centerkan ID */}
                      <div className="text-center">
                        #{letter.id.toString().padStart(6, "0")}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{letter.nama}</div>
                          <div className="text-xs text-gray-500">
                            NIK: {letter.nik}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getLetterTypeBadgeColor(letter.letterType)}
                      >
                        {letter.letterType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">
                          {letter.signatoryName}
                        </div>
                        {/* <div className="text-sm text-gray-600">
                          ({letter.signatoryPosition})
                        </div> */}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">
                          {formatTimestamp(letter.timestamp)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(letter.timestamp).toLocaleDateString(
                            "id-ID",
                            {
                              weekday: "long",
                            }
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewDetail(letter)}
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 pt-4 border-t gap-2">
          <span>
            Menampilkan {sortedLetters.length} dari {letters.length} surat
            {searchTerm && ` untuk "${searchTerm}"`}
            {filterType !== "all" && ` dengan filter "${filterType}"`}
          </span>
          <div className="flex items-center gap-4">
            <span>
              Diurutkan berdasarkan:{" "}
              {sortField === "timestamp" ? "Waktu" : sortField}
            </span>
            <span>({sortDirection === "asc" ? "A-Z" : "Z-A"})</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
