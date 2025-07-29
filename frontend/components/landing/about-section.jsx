import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Heart, Code } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="tentang" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Tentang Pengembangan Sistem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sistem Persuratan Desa Sodong Basari dikembangkan dengan dedikasi
            tinggi untuk memajukan pelayanan administrasi desa.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Dikembangkan oleh Mahasiswa KKN PPM UGM
                    </h3>
                    <p className="text-gray-600">
                      Sistem ini merupakan hasil karya mahasiswa KKN PPM UGM
                      Gemercik Belik Periode 2 Tahun 2025 yang berkomitmen untuk
                      memberikan solusi teknologi bagi Digitalisasi Desa Sodong
                      Basari.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Pengabdian untuk Masyarakat
                    </h3>
                    <p className="text-gray-600">
                      Melalui program KKN PPM, mahasiswa UGM berkomitmen untuk
                      memberikan kontribusi nyata bagi kemajuan dan
                      kesejahteraan masyarakat desa.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Teknologi Modern</h3>
                    <p className="text-gray-600">
                      Menggunakan teknologi web modern untuk menciptakan sistem yang responsif, aman, dan mudah
                      digunakan oleh seluruh lapisan masyarakat.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Partner Kolaborasi
              </h3>

              <div className="grid grid-cols-1 gap-6">
                {/* Logo Placeholder Areas */}
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center border-2 border-dashed border-gray-300 hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/logo-ugm.png"
                      alt="Logo UGM"
                      className="h-28 w-28"
                      width={28 * 4}
                      height={28 * 4}
                    />
                    {/* <span className="text-gray-400 text-xs">Logo UGM</span> */}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Universitas Gadjah Mada
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center border-2 border-dashed border-gray-300 hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/logo-kkn-ugm.png"
                      alt="Logo KKN"
                      className="h-28 w-28"
                      width={28 * 4}
                      height={28 * 4}
                    />
                    {/* <span className="text-gray-400 text-xs">Logo KKN</span> */}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    KKN-PPM UGM 2025
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center border-2 border-dashed border-gray-300 hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/Kabupaten_Pemalang.png"
                      alt="Logo UGM"
                      className="w-20"
                      width={28 * 4}
                      height={28 * 4}
                    />{" "}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Desa Sodong Basari
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
