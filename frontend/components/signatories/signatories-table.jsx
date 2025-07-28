"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Plus, Search, Eye } from "lucide-react"

export function SignatoriesTable({ signatories, onAdd, onEdit, onDelete, onView, loading }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSignatories = signatories.filter(
    (signatory) =>
      signatory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signatory.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signatory.nip.includes(searchTerm),
  )

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-xl font-bold">Pejabat Penandatangan Surat</CardTitle>
            <CardDescription>Kelola daftar pejabat yang berwenang menandatangani surat-surat desa</CardDescription>
          </div>
          <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Pejabat
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari berdasarkan nama, jabatan, atau NIP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Nama</TableHead>
                <TableHead className="font-semibold">NIP</TableHead>
                <TableHead className="font-semibold">Jabatan</TableHead>
                <TableHead className="font-semibold">Pangkat</TableHead>
                <TableHead className="font-semibold">Golongan</TableHead>

                <TableHead className="font-semibold text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSignatories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    {searchTerm ? "Tidak ada data yang sesuai dengan pencarian" : "Belum ada data pejabat"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSignatories.map((signatory) => (
                  <TableRow key={signatory.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{signatory.name}</TableCell>
                    <TableCell className="font-mono text-sm">{signatory.nip}</TableCell>
                    <TableCell>{signatory.position}</TableCell>
                    <TableCell>{signatory.rank || "-"}</TableCell>
                    <TableCell>{signatory.grade || "-"}</TableCell>

                    <TableCell>
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => onView(signatory)} className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(signatory)}
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(signatory)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
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
        <div className="flex justify-between items-center text-sm text-gray-600 pt-4 border-t">
          <span>
            Menampilkan {filteredSignatories.length} dari {signatories.length} pejabat
          </span>
          <span>Total: {signatories.length} pejabat terdaftar</span>
        </div>
      </CardContent>
    </Card>
  )
}
