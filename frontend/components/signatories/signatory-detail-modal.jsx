"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  BadgeIcon as IdCard,
  Briefcase,
  Award,
  Star,
} from "lucide-react";

export function SignatoryDetailModal({ isOpen, onClose, signatory, onEdit }) {
  if (!signatory) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Detail Pejabat Penandatangan
          </DialogTitle>
          <DialogDescription>
            Informasi lengkap pejabat yang berwenang menandatangani surat
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              {/* Basic Info */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Nama Lengkap</p>
                    <p className="font-semibold text-lg">{signatory.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <IdCard className="h-4 w-4 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">NIP</p>
                    <p className="font-mono font-medium">{signatory.nip}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase className="h-4 w-4 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Jabatan</p>
                    <p className="font-medium">{signatory.position}</p>
                  </div>
                </div>

                {signatory.rank && (
                  <div className="flex items-start gap-3">
                    <Award className="h-4 w-4 text-gray-500 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Pangkat</p>
                      <p className="font-medium">{signatory.rank}</p>
                    </div>
                  </div>
                )}

                {signatory.grade && (
                  <div className="flex items-start gap-3">
                    <Star className="h-4 w-4 text-gray-500 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Golongan</p>
                      <p className="font-medium">{signatory.grade}</p>
                    </div>
                  </div>
                )}

                {signatory.notes && (
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-600 mb-1">Catatan</p>
                    <p className="text-sm bg-gray-50 p-2 rounded">
                      {signatory.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Metadata */}
              <div className="pt-3 border-t text-xs text-gray-500 space-y-1">
                <p>Dibuat: {formatDate(signatory.createdAt)}</p>
                {signatory.updatedAt &&
                  signatory.updatedAt !== signatory.createdAt && (
                    <p>Diperbarui: {formatDate(signatory.updatedAt)}</p>
                  )}
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Tutup
          </Button>
          <Button
            type="button"
            onClick={() => {
              onClose();
              onEdit(signatory);
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Edit Pejabat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
