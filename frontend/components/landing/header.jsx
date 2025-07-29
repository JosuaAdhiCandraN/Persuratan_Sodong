"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LogoDesa from "@/components/logo-desa";

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <LogoDesa
              width={40} // Lebar dasar untuk rasio aspek
              height={40} // Tinggi dasar untuk rasio aspek
            />{" "}
            {/* <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SP</span>
            </div> */}
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Sistem Persuratan
              </h1>
              <p className="text-xs text-gray-600">Desa Sodong Basari</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#beranda"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Beranda
            </a>
            <a
              href="#tentang"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Tentang
            </a>
            <a
              href="#fitur"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Fitur
            </a>
            <a
              href="#kontak"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Kontak
            </a>
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700">Masuk</Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="#beranda"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Beranda
              </a>
              <a
                href="#fitur"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Fitur
              </a>
              <a
                href="#tentang"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Tentang
              </a>
              <a
                href="#kontak"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Kontak
              </a>
              <Link href="/login">
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                  Masuk Sistem
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
