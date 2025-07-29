"use client"

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
import { AlertTriangle } from "lucide-react"

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, signatory, loading = false }) {
  if (!signatory) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Konfirmasi Hapus
          </DialogTitle>
          <DialogDescription>
            Tindakan ini tidak dapat dibatalkan. Data yang sudah dihapus tidak dapat dikembalikan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Anda akan menghapus pejabat penandatangan berikut:
            </AlertDescription>
          </Alert>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <span className="font-medium text-gray-600">Nama:</span>
              <span className="col-span-2 font-medium">{signatory.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <span className="font-medium text-gray-600">NIP:</span>
              <span className="col-span-2 font-mono">{signatory.nip}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <span className="font-medium text-gray-600">Jabatan:</span>
              <span className="col-span-2">{signatory.position}</span>
            </div>
            {signatory.rank && (
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="font-medium text-gray-600">Pangkat:</span>
                <span className="col-span-2">{signatory.rank}</span>
              </div>
            )}
            {signatory.grade && (
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="font-medium text-gray-600">Golongan:</span>
                <span className="col-span-2">{signatory.grade}</span>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600">
            Apakah Anda yakin ingin menghapus pejabat ini dari daftar penandatangan surat?
          </p>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Batal
          </Button>
          <Button type="button" variant="destructive" onClick={() => onConfirm(signatory.id)} disabled={loading}>
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
