"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, Download, FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react"

const CSV_TEMPLATE_HEADERS = [
  "no_kk",
  "nik",
  "nama_lengkap",
  "alamat",
  "rt",
  "rw",
  "tempat_lahir",
  "tgl_lahir",
  "jenis_kelamin",
  "status_kawin",
  "tgl_perkawinan_perceraian",
  "pendidikan",
  "agama",
  "no_akte",
  "umur",
  "shdk",
  "kewarganegaraan",
  "ayah",
  "ibu",
  "jenis_pekerjaan",
  "kesejahteraan",
  "e_ktp",
  "tgl_update_kk",
  "alamat_lengkap",
]

const REQUIRED_FIELDS = ["no_kk", "nik", "nama_lengkap"]

export function CSVUploadModal({ isOpen, onClose, onUpload, loading = false }) {
  const [file, setFile] = useState(null)
  const [parsedData, setParsedData] = useState([])
  const [validationResults, setValidationResults] = useState([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [step, setStep] = useState("upload") // upload, preview, processing
  const fileInputRef = useRef(null)

  const downloadTemplate = () => {
    const csvContent = CSV_TEMPLATE_HEADERS.join(",") + "\n"
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "template_data_warga.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile)
      parseCSV(selectedFile)
    } else {
      alert("Please select a valid CSV file")
    }
  }

  const parseCSV = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const csv = e.target.result
      const lines = csv.split("\n")
      const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

      const data = []
      const validation = []

      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === "") continue

        const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))
        const row = {}
        const rowValidation = { row: i, errors: [], warnings: [] }

        // Map CSV columns to schema
        headers.forEach((header, index) => {
          if (CSV_TEMPLATE_HEADERS.includes(header)) {
            let value = values[index] || ""

            // Handle data type conversions
            if (header === "umur" || header === "rt" || header === "rw") {
              value = value ? Number.parseInt(value) : null
            } else if (header === "e_ktp") {
              value = value.toLowerCase() === "true" || value === "1"
            } else if (header.includes("tgl_")) {
              // Validate date format
              if (value && !isValidDate(value)) {
                rowValidation.errors.push(`${header}: Format tanggal tidak valid`)
              }
            }

            row[header] = value
          }
        })

        // Validate required fields
        REQUIRED_FIELDS.forEach((field) => {
          if (!row[field] || row[field].toString().trim() === "") {
            rowValidation.errors.push(`${field}: Field wajib tidak boleh kosong`)
          }
        })

        // Validate NIK (16 digits)
        if (row.nik && !/^\d{16}$/.test(row.nik)) {
          rowValidation.errors.push("nik: Harus 16 digit angka")
        }

        // Validate No KK (16 digits)
        if (row.no_kk && !/^\d{16}$/.test(row.no_kk)) {
          rowValidation.errors.push("no_kk: Harus 16 digit angka")
        }

        // Validate age
        if (row.umur && (row.umur < 0 || row.umur > 150)) {
          rowValidation.errors.push("umur: Harus antara 0-150 tahun")
        }

        data.push(row)
        validation.push(rowValidation)
      }

      setParsedData(data)
      setValidationResults(validation)
      setStep("preview")
    }
    reader.readAsText(file)
  }

  const isValidDate = (dateString) => {
    const date = new Date(dateString)
    return date instanceof Date && !isNaN(date)
  }

  const handleUpload = async () => {
    const validData = parsedData.filter((_, index) => validationResults[index].errors.length === 0)

    if (validData.length === 0) {
      alert("Tidak ada data valid untuk diupload")
      return
    }

    setStep("processing")

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    await onUpload(validData)
    handleClose()
  }

  const handleClose = () => {
    setFile(null)
    setParsedData([])
    setValidationResults([])
    setUploadProgress(0)
    setStep("upload")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onClose()
  }

  const validCount = validationResults.filter((v) => v.errors.length === 0).length
  const errorCount = validationResults.filter((v) => v.errors.length > 0).length

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />
            Import Data Warga dari CSV
          </DialogTitle>
          <DialogDescription>Upload file CSV untuk menambahkan data warga secara bulk</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {step === "upload" && (
            <>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Pastikan file CSV Anda menggunakan format template yang telah disediakan. Field wajib: no_kk, nik,
                  nama_lengkap
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 mb-4">
                <Button variant="outline" onClick={downloadTemplate} className="flex items-center gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download Template CSV
                </Button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Upload File CSV</p>
                <p className="text-gray-600 mb-4">Pilih file CSV yang berisi data warga</p>
                <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileSelect} className="hidden" />
                <Button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Pilih File CSV
                </Button>
              </div>
            </>
          )}

          {step === "preview" && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">{validCount} data valid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600">{errorCount} data error</span>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setStep("upload")}>
                  Pilih File Lain
                </Button>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Preview data yang akan diupload. Data dengan error tidak akan disimpan.
                </AlertDescription>
              </Alert>

              <ScrollArea className="h-[400px] border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-12">Status</TableHead>
                      <TableHead>Nama Lengkap</TableHead>
                      <TableHead>NIK</TableHead>
                      <TableHead>No KK</TableHead>
                      <TableHead>Alamat</TableHead>
                      <TableHead>Errors</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parsedData.map((row, index) => {
                      const validation = validationResults[index]
                      const hasErrors = validation.errors.length > 0

                      return (
                        <TableRow key={index} className={hasErrors ? "bg-red-50" : "bg-green-50"}>
                          <TableCell>
                            {hasErrors ? (
                              <XCircle className="h-4 w-4 text-red-600" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{row.nama_lengkap}</TableCell>
                          <TableCell className="font-mono text-sm">{row.nik}</TableCell>
                          <TableCell className="font-mono text-sm">{row.no_kk}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{row.alamat}</TableCell>
                          <TableCell>
                            {validation.errors.length > 0 && (
                              <div className="space-y-1">
                                {validation.errors.map((error, errorIndex) => (
                                  <div key={errorIndex} className="text-xs text-red-600">
                                    {error}
                                  </div>
                                ))}
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>
            </>
          )}

          {step === "processing" && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-lg font-medium">Mengupload data...</p>
                <p className="text-gray-600">Mohon tunggu, data sedang diproses</p>
              </div>
              <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
              <p className="text-sm text-gray-500">{uploadProgress}% selesai</p>
            </div>
          )}
        </div>

        <DialogFooter>
          {step === "upload" && (
            <Button type="button" variant="outline" onClick={handleClose}>
              Batal
            </Button>
          )}
          {step === "preview" && (
            <>
              <Button type="button" variant="outline" onClick={handleClose}>
                Batal
              </Button>
              <Button
                type="button"
                onClick={handleUpload}
                disabled={validCount === 0 || loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Mengupload..." : `Upload ${validCount} Data Valid`}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
