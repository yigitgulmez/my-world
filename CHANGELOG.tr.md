# 📦 CHANGELOG - [𝙏𝙍](https://github.com/yigitgulmez/my-world/blob/master/CHANGELOG.tr.md) / [𝙀𝙉](https://github.com/yigitgulmez/my-world/blob/master/CHANGELOG.md)

## 📈 V2

### Veri Yönetimi
- Proje verileri artık sadece GitHub commit'leriyle tetiklenen webhook üzerinden 3. taraf veritabanına senkronize ediliyor.
- Veriler `sessionStorage` içinde tutuluyor, böylece gereksiz istekler engelleniyor.

### Performans ve Animasyonlar
- Animasyonlar artık daha optimize ve akıcı çalışıyor.

### Güvenlik ve Formlar
- İletişim formuna kullanıcıların fingerprint bilgileri eklendi.
- Turnstile doğrulaması entegre edildi.

### Uluslararasılaştırma ve İçerik
- Proje içerikleri uluslararasılaştırma uygun hale getirildi ve ekstra içerik ekleme desteği eklendi.
- GitHub bağlantısı proje verilerine otomatik olarak ekleniyor ve özel bağlantılara izin veriliyor.

### Kod Kalitesi ve Yapısı
- Dosya ve klasör yapısı iyileştirildi.
- Gereksiz kodlar temizlendi.

### Arayüz ve Tasarım
- Sayfa altına footer eklendi.
- Yetkisiz erişimler için özel 403 sayfası eklendi.