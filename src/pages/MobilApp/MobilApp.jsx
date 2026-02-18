import React from "react";
import "./mobilapp.css";

function MobilApp() {
  const sections = [
    {
      title: "Kirish",
      content: `Mehrobuz mobil ilovasi (bundan keyin "Ilova") foydalanuvchilarining shaxsiy ma'lumotlarini himoya qilishga sodiqdir. Ushbu maxfiylik siyosati Ilova tomonidan to‘plangan ma'lumotlar, ularning qanday ishlatilishi va himoyalanishi haqida ma'lumot beradi.`,
    },
    {
      title: "To‘plangan Ma'lumotlar",
      contentList: [
        "Qurilma ma'lumotlari (model, operatsion tizim versiyasi)",
        "Joylashuv ma'lumotlari (namoz vaqtlarini aniqlash uchun)",
        "Foydalanuvchi hisob ma'lumotlari (agar ro‘yxatdan o‘tish talab qilinsa)",
        "Foydalanish statistikasi va ilova sozlamalari",
      ],
    },
    {
      title: "Ma'lumotlarni Foydalanish",
      contentList: [
        "Namoz vaqtlarini aniqlash va bildirishnomalar yuborish",
        "Qibla yo‘nalishini aniqlash",
        "Qur'on bo‘limlari va duolarni taqdim etish",
        "Ilova foydalanuvchi tajribasini yaxshilash",
      ],
    },
    {
      title: "Ma'lumotlarning Himoyalanishi",
      content: `Biz foydalanuvchilarning shaxsiy ma'lumotlarini himoya qilish uchun zaruriy xavfsizlik choralarini ko‘ramiz va uchinchi shaxslarga ulashmaymiz, faqat quyidagi holatlarda bundan mustasno:`,
      contentList: [
        "Qonuniy talablar bo‘yicha davlat organlariga taqdim etish",
        "Ilovaga xizmat ko‘rsatuvchi ishonchli hamkorlar bilan cheklangan maqsadlarda ulashish",
      ],
    },
    {
      title: "Foydalanuvchi Huquqlari",
      content: `Foydalanuvchilar o‘z ma'lumotlariga kirish, ularni yangilash yoki o‘chirish huquqiga ega. Shuningdek, foydalanuvchi istalgan vaqtda ma'lumotlar yig‘ilishini cheklash yoki Ilovadan foydalanishni to‘xtatishi mumkin.`,
    },
    {
      title: "O‘zgarishlar va Yangilanishlar",
      content: `Biz ushbu Maxfiylik siyosatini istalgan vaqtda o‘zgartirish huquqiga egamiz. Yangilangan versiya Ilovada yoki rasmiy veb-saytda e’lon qilinadi.`,
    },
    {
      title: "Bog‘lanish",
      content: `Savollar yoki takliflar bo‘lsa, biz bilan quyidagi manzil orqali bog‘lanishingiz mumkin:`,
      email: "mehrob.uz@gmail.com",
    },
  ];

  return (
    <div className="policy-container">
      <h1>Mehrobuz Mobil Ilovasi Maxfiylik Siyosati</h1>
      {sections.map((section, index) => (
        <section key={index}>
          <h2>{index + 1}. {section.title}</h2>
          {section.content && <p>{section.content}</p>}
          {section.contentList && (
            <ul>
              {section.contentList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
          {section.email && (
            <a className="email" href={`mailto:${section.email}`}>{section.email}</a>
          )}
        </section>
      ))}
    </div>
  );
}

export default MobilApp;
