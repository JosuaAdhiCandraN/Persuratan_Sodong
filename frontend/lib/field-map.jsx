const fieldMap = {
  surat_keterangan_domisili: [
    {
      name: "nik",
      label: "NIK (Nomor Induk Kependudukan)",
      type: "search",
      required: true,
      placeholder: "Value",
    },
    {
      name: "nama",
      label: "Nama",
      type: "short_answer",
      required: true,
      placeholder: "Value",
    },
    {
      name: "tempat_tanggal_lahir",
      label: "Tempat, Tanggal Lahir",
      type: "short_answer",
      required: true,
      placeholder: "Value",
    },
    {
      name: "agama",
      label: "Agama",
      type: "short_answer",
      required: true,
      placeholder: "Value",
    },
    {
      name: "status_pernikahan",
      label: "Status Pernikahan",
      type: "short_answer",
      required: true,
      placeholder: "Value",
    },
    {
      name: "kewarganegaraan",
      label: "Kewarganegaraan",
      type: "short_answer",
      required: true,
      placeholder: "Value",
    },
    {
      name: "pekerjaan",
      label: "Pekerjaan",
      type: "select",
      required: true,
      placeholder: "Value",
      options: [
        { value: "pegawai_negeri", label: "Pegawai Negeri" },
        { value: "pegawai_swasta", label: "Pegawai Swasta" },
        { value: "wiraswasta", label: "Wiraswasta" },
        { value: "pelajar", label: "Pelajar/Mahasiswa" },
        { value: "ibu_rumah_tangga", label: "Ibu Rumah Tangga" },
      ],
    },
    {
      name: "alamat",
      label: "Alamat",
      type: "long_answer",
      required: true,
      placeholder: "Value",
    },
  ],

  surat_pengantar: [
    {
      name: "nama",
      label: "Nama Lengkap",
      type: "text",
      required: true,
    },
    {
      name: "keperluan",
      label: "Keperluan",
      type: "textarea",
      placeholder: "Jelaskan keperluan surat",
      required: true,
    },
    {
      name: "alamat",
      label: "Alamat",
      type: "text",
    },
  ],

  surat_keterangan_usaha: [
    {
      name: "nama_usaha",
      label: "Nama Usaha",
      type: "text",
      required: true,
    },
    {
      name: "pemilik",
      label: "Nama Pemilik",
      type: "text",
    },
    {
      name: "alamat_usaha",
      label: "Alamat Usaha",
      type: "text",
    },
    {
      name: "jenis_usaha",
      label: "Jenis Usaha",
      type: "select",
      options: [
        { value: "Warung", label: "Warung" },
        { value: "Jasa", label: "Jasa" },
        { value: "Online", label: "Online" },
        { value: "Lainnya", label: "Lainnya" },
      ],
    },
  ],
};

export default fieldMap;
