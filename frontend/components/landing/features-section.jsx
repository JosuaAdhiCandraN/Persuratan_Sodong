import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Clock,
  Shield,
  Smartphone,
  Database,
  Download,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: "Berbagai Jenis Surat",
      description:
        "Surat keterangan domisili, usaha, tidak mampu, pengantar nikah, dan banyak lagi.",
      color: "blue",
    },
    {
      icon: Clock,
      title: "Proses Cepat",
      description:
        "Pembuatan surat dalam hitungan menit dengan sistem otomatis yang efisien.",
      color: "green",
    },
    {
      icon: Shield,
      title: "Data Aman",
      description:
        "Keamanan data terjamin dengan enkripsi dan backup otomatis.",
      color: "purple",
    },
    {
      icon: Smartphone,
      title: "Akses Mobile",
      description:
        "Dapat diakses dari smartphone, tablet, atau komputer kapan saja.",
      color: "orange",
    },
    {
      icon: Database,
      title: "Database Terintegrasi",
      description:
        "Data penduduk terintegrasi untuk mempercepat pengisian formulir.",
      color: "red",
    },
    {
      icon: Download,
      title: "Download Langsung",
      description:
        "Unduh surat dalam format PDF siap cetak setelah selesai dibuat.",
      color: "indigo",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
    indigo: "bg-indigo-100 text-indigo-600",
  };

  return (
    <section id="fitur" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Fitur Unggulan Sistem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sistem persuratan digital yang dirancang khusus untuk memudahkan
            administrasi desa dengan teknologi modern dan user-friendly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    colorClasses[feature.color]
                  }`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
