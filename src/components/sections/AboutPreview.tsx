'use client';

export default function AboutPreview() {
  const highlights = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'บริการลูกค้า\nแบบมืออาชีพ',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'คัดสรรคุณภาพ\nเกรดพรีเมียม',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'ควบคุมอุณหภูมิ\nได้มาตรฐาน',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'จัดหาสินค้า\nจากทั่วโลก',
    },
  ];

  return (
    /* ใช้เทคนิค w-screen และ negative margin ทะลุกรอบให้ออกมาเต็มจอ */
    <section id="about" className="relative w-screen min-h-[600px] flex items-center bg-white overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      
      {/* 1. ภาพพื้นหลังเต็มจอแบบ Parallax (bg-fixed) */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{ backgroundImage: "url('/images/about/about-us-1.png')" }}
      />

      {/* 2. Gradient ไล่สีขาวจากซ้าย (ทึบ) ไปขวา (โปร่งแสง) */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent md:w-[75%] z-10 pointer-events-none" />

      {/* 3. กล่องเนื้อหาฝั่งซ้าย (ดึงเนื้อหากลับมาให้อยู่ตรงกลางตาม Grid ปกติ) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-xl">
          
          <span className="inline-block text-sm font-bold tracking-widest text-[#f57e2a] uppercase mb-3">
            ABOUT US
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#072a58] tracking-tight mb-4">
            เกี่ยวกับเรา
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-[#0e76bc] mb-6">
            Origin Seafoods Co., Ltd.
          </h3>
          
          <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10">
            ผู้นำเข้าและจัดจำหน่ายอาหารทะเลแช่แข็ง จากแหล่งผลิตชั้นนำทั่วโลก คัดสรรสินค้าคุณภาพ ได้มาตรฐานสากล เพื่อส่งมอบความสดใหม่และความพึงพอใจสูงสุดให้กับลูกค้า
          </p>

          {/* Icon Grid (พื้นหลังไอคอนใสๆ โชว์สไตล์มินิมอล) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-4 mb-8">
            {highlights.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#0e76bc] mb-3 group-hover:bg-[#0e76bc] group-hover:text-white transition-colors duration-300 shadow-md border border-slate-100">
                  {item.icon}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#072a58] whitespace-pre-line leading-tight">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { AboutPreview };
