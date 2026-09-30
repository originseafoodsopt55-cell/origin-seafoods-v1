'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] flex items-center justify-center overflow-hidden bg-[#072a58]">
      
      {/* 1. ภาพพื้นหลังเต็มจอ */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg-1.png')" }} 
      />

      {/* 3. เนื้อหาตรงกลาง (Centered Content) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center mt-10">
        
        {/* แสงสีขาวฟุ้งๆ ด้านหลัง (Glow Effect) ขยายให้ใหญ่และขาวทึบขึ้น */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[900px] h-[160%] bg-white/85 blur-[60px] md:blur-[100px] rounded-[100%] pointer-events-none -z-10" />

        {/* โลโก้แบรนด์ (ดึงไฟล์รูปภาพจริงมาใช้งาน) */}
        <div className="mb-4 flex justify-center relative w-[200px] sm:w-[250px] md:w-[300px] h-[80px] md:h-[120px]">
          <Image 
            src="/images/company/origin-logo.png"
            alt="Origin Seafoods Logo" 
            fill
            className="object-contain drop-shadow-md" 
            priority 
          />
        </div>

        {/* ชุดข้อความ: ชื่อบริษัท (สีกรมท่า) */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#072a58] mb-2 tracking-wide">
          ORIGIN SEAFOODS CO., LTD.
        </h1>
        
        {/* ชุดข้อความ: ซับไตเติ้ลภาษาไทย (สีกรมท่า) */}
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#072a58] mb-6">
          บริษัทนำเข้าและส่งออกอาหารทะเลแช่แข็งทั่วโลก
        </p>
        
        {/* ชุดข้อความ: ซับไตเติ้ลภาษาอังกฤษ (บังคับขึ้นบรรทัดใหม่เสมอ) */}
        <h3 className="text-lg sm:text-2xl md:text-3xl font-black tracking-wider mt-2">
          <span className="text-[#072a58]">INTERNATIONAL SEAFOODS</span>
          <br />
          <span className="text-[#f57e2a]">IMPORTER-EXPORTER</span>
        </h3>

        {/* ปุ่ม Call to Action (Force Text White) */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            style={{ color: '#ffffff' }}
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm md:text-base font-bold rounded-full !text-white text-white bg-[#f57e2a] hover:bg-[#e06917] transition-all shadow-md hover:shadow-lg hover:-translate-y-1" 
            href="/products"
          >
            ดูสินค้า <span style={{ color: '#ffffff' }} className="ml-2 font-normal !text-white text-white">&rarr;</span>
          </Link>
          <Link 
            style={{ color: '#ffffff' }}
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm md:text-base font-bold rounded-full !text-white text-white bg-[#0e659e] hover:bg-[#072a58] transition-all shadow-md hover:shadow-lg hover:-translate-y-1" 
            href="#contact"
          >
            ติดต่อเรา <span style={{ color: '#ffffff' }} className="ml-2 font-normal !text-white text-white">&rarr;</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Hero;
