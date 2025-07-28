import Image from "next/image";
//  Buat props untuk tinggi dan lebar
export default function LogoDesa({ height = 720, width = 720 }) {
  return (
    <Image
      src="/Kabupaten_Pemalang.png"
      alt="Logo Pemalang"
      className={`w-[${(width / 72) * 4}px]`}
      width={width}
      height={height}
    />
  );
}
