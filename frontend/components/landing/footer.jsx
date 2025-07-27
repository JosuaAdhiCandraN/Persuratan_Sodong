import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                // src="/Kabupaten_Pemalang.png"
                src={"/logo-sodong.png"}
                alt="Logo UGM"
                className="w-24"
                width={720} // Lebar dasar untuk rasio aspek
                height={720} // Tinggi dasar untuk rasio aspek
              />{" "}
              {/* <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SP</span>
              </div> */}
              <div>
                <h3 className="text-lg font-bold">Sistem Persuratan</h3>
                <p className="text-sm text-gray-400">Desa Sodong Basari</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Sistem persuratan digital untuk memudahkan administrasi desa
              dengan teknologi modern.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#beranda"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#fitur"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Fitur
                </a>
              </li>
              <li>
                <a
                  href="#tentang"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tentang
                </a>
              </li>
              <li>
                <a
                  href="#kontak"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">
                  Desa Sodong Basari, Kecamatan Belik, Pemalang
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">+62 xxx-xxxx-xxxx</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">
                  admin@sodongbasari.desa.id
                </span>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Partner</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/Lambang UGM-putih.png"
                  alt="Logo UGM"
                  className="w-12"
                  width={720} // Lebar dasar untuk rasio aspek
                  height={720} // Tinggi dasar untuk rasio aspek
                />{" "}
                {/* <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-xs">UGM</span>
                </div> */}
                <span className="text-gray-400 text-sm">
                  Universitas Gadjah Mada
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Image
                  src="/logo-kkn-ugm.png"
                  alt="Logo KKN"
                  className="w-12"
                  width={720} // Lebar dasar untuk rasio aspek
                  height={720} // Tinggi dasar untuk rasio aspek
                />{" "}
                {/* <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-xs">KKN</span>
                </div> */}
                <span className="text-gray-400 text-sm">KKN PPM UGM</span>
              </div>
              <div className="flex items-center space-x-3">
                <Image
                  src="/Kabupaten_Pemalang.png"
                  alt="Logo Pemalang"
                  className="w-10"
                  width={720} // Lebar dasar untuk rasio aspek
                  height={720} // Tinggi dasar untuk rasio aspek
                />{" "}
                {/* <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-xs">DS</span>
                </div> */}
                <span className="text-gray-400 text-sm">
                  Desa Sodong Basari
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Sistem Persuratan Desa Sodong Basari. Dikembangkan oleh
              Mahasiswa KKN PPM UGM Gemercik Belik Periode 2 Tahun 2025.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {/* <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
