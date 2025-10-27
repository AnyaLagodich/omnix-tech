import image_4aab5605c26effc4a61d0e85ba8077ea1c982736 from '...asset/4aab5605c26effc4a61d0e85ba8077ea1c982736.png';
import mainImg from "../assets/main.jpg";
import ship from "../assets/ship.png";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
/**
 * OMNIX Landing Page
 * 
 * ИНСТРУКЦИЯ ПО НАСТРОЙКЕ ФОРМЫ:
 * 1. Зарегистрируйтесь на https://web3forms.com (бесплатно)
 * 2. Создайте новую форму и получите Access Key
 * 3. Замените "YOUR_WEB3FORMS_ACCESS_KEY" в функции handleSubmit (строка ~66) на ваш ключ
 * 4. Подтвердите email e9920630889@gmail.com в настройках Web3Forms
 * 
 * ВНЕШНИЕ ССЫЛКИ ДЛЯ ЗАМЕНЫ:
 * - Каталог товаров (строка ~394): https://example.com/catalog
 * - Политика конфиденциальности (строки ~780, 992): https://example.com/privacy-policy  
 * - Пользовательское соглашение (строки ~793, 999): https://example.com/terms
 */

"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logo from "../assets/a54ed086c5a30a244696f6045c42e4db0c2d82e8.png";
import {
  Mail,
  Phone,
  MapPin,
  Package,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Send,
  MessageCircle,
  FileText,
  ArrowDown,
} from "lucide-react";

// ============================================
// 🖼️ ЗАМЕНИТЕ ССЫЛКИ НА СВОИ ИЗОБРАЖЕНИЯ ЗДЕСЬ
// ============================================
const IMAGES = {
  // Hero секция (главный баннер)
  heroBackground: mainImg,
  
  // Секция "О компании" (фон)
  aboutBackground: "https://images.unsplash.com/photo-1716191300006-ea66bf47e2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwYXV0b21hdGlvbiUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjEyNzU3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  
  // Категории товаров
  categoryRobots: img1,
  categorySensors: img2,
  categoryCameras: img3,
  categoryControllers: img4,
  categoryTimers: img5,
  categoryInverters: img6,
  
  // Секция "Доставка и оплата" (фон)
  deliveryBackground: ship,
  
  // Форма заявки (фон)
  formBackground: ship,
};

export function Landing1() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [checkboxes, setCheckboxes] = useState({
    consent: false,
    privacy: false,
    terms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const allCheckboxesChecked =
    checkboxes.consent && checkboxes.privacy && checkboxes.terms;

  /**
   * Автоматическое форматирование номера телефона
   * Пример: пользователь вводит "9151318461" → отображается "+7 (915) 131-84-61"
   */
  const formatPhoneNumber = (value: string) => {
    // Удаляем все, кроме цифр
    let cleaned = value.replace(/\D/g, "");

    // Если начинается не с 7, добавляем 7
    if (cleaned.length > 0 && cleaned[0] !== "7") {
      cleaned = "7" + cleaned;
    }

    // Если пусто или только 7, возвращаем +7
    if (!cleaned || cleaned === "7") return cleaned ? "+7" : "";

    // Начинаем с +7
    let formatted = "+7";

    // Добавляем код в скобках: (XXX)
    if (cleaned.length > 1) {
      formatted += " (" + cleaned.substring(1, 4);
    }
    if (cleaned.length >= 4) {
      formatted += ")";
    }

    // Добавляем первую часть: XXX
    if (cleaned.length >= 5) {
      formatted += " " + cleaned.substring(4, 7);
    }

    // Добавляем вторую часть: XX
    if (cleaned.length >= 8) {
      formatted += "-" + cleaned.substring(7, 9);
    }

    // Добавляем последнюю часть: XX
    if (cleaned.length >= 10) {
      formatted += "-" + cleaned.substring(9, 11);
    }

    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Если пользователь удаляет всё, разрешаем пустое поле
    if (!input || input === "+") {
      setFormData({ ...formData, phone: "" });
      return;
    }

    const cleaned = input.replace(/\D/g, "");

    // Ограничиваем до 11 цифр (7 + 10 цифр номера)
    if (cleaned.length <= 11) {
      const formatted = formatPhoneNumber(input);
      setFormData({ ...formData, phone: formatted });
    }
  };

  const handlePhoneFocus = () => {
    // При фокусе на пустое поле автоматически добавляем +7
    if (!formData.phone) {
      setFormData({ ...formData, phone: "+7" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allCheckboxesChecked) return;

    setIsSubmitting(true);

    try {
      // Web3Forms отправка
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "aadc4de7-93f3-4c79-930f-3b5f400cf474", // Замените на ваш ключ от web3forms.com
          subject: "Новая заявка!",
          from_name: "Omnix",
        //  to_email: "anya.lagodich@gmail.com",
          message: `${formData.comment}

Имя: ${formData.name}
Почта: ${formData.email}
Номер: ${formData.phone}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        setFormData({ name: "", phone: "", email: "", comment: "" });
        setCheckboxes({ consent: false, privacy: false, terms: false });
      } else {
        alert(
          "Произошла ошибка при отправке заявки. Пожалуйста, свяжитесь с нами по телефону или email."
        );
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      alert(
        "Произошла ошибка при отправке заявки. Пожалуйста, проверьте подключение к интернету или свяжитесь с нами напрямую."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <nav className="flex items-center justify-between">
            <div className="h-6">
              <img src={logo} alt="OMNIX" className="h-full w-auto" />
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm">
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-zinc-300 transition-colors"
              >
                О компании
              </button>
              <button
                onClick={() => scrollToSection("categories")}
                className="hover:text-zinc-300 transition-colors"
              >
                Категории
              </button>
              <button
                onClick={() => scrollToSection("process")}
                className="hover:text-zinc-300 transition-colors"
              >
                Процесс заказа
              </button>
              <button
                onClick={() => scrollToSection("delivery")}
                className="hover:text-zinc-300 transition-colors"
              >
                Доставка и оплата
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="hover:text-zinc-300 transition-colors"
              >
                Контакты
              </button>
              <div className="flex items-center gap-3">
                <a
                  href="tel:89151318461"
                  className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                  title="8 915 131 84 61"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href="mailto:e9920630889@gmail.com"
                  className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                  title="e9920630889@gmail.com"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              <Button
                onClick={() => scrollToSection("form")}
                className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-full"
              >
                Оставить заявку
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section - Tesla-style minimalist */}
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={IMAGES.heroBackground}
            alt="Промышленный склад"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/40 to-zinc-950"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-20 relative text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl lg:text-7xl mb-8 tracking-tight">
              Компоненты для упаковочных
              <br />и конвейерных линий{" "}
              <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Omron
              </span>
            </h1>
            <p className="text-xl text-zinc-300 mb-12 max-w-2xl mx-auto">
              Более 1200 наименований и 95 000 единиц продукции
              на собственном складе. Помогаем предприятиям
              экономить время и бюджет на поставках Omron.
            </p>
            <Button
              size="lg"
              onClick={() => scrollToSection("form")}
              className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-full px-8"
            >
              Оставить заявку
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10">
              <div className="text-4xl mb-2">1200+</div>
              <div className="text-zinc-400 text-sm">
                Наименований продукции
              </div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10">
              <div className="text-4xl mb-2">95 000+</div>
              <div className="text-zinc-400 text-sm">
                Единиц на складе
              </div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10">
              <div className="text-4xl mb-2">1-2 дня</div>
              <div className="text-zinc-400 text-sm">
                Срок отгрузки
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - with background and glassmorphism */}
      <section
        id="about"
        className="py-32 relative overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 opacity-5">
          <ImageWithFallback
            src={IMAGES.aboutBackground}
            alt="Автоматизация производства"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-6">О компании</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Мы поставляем компоненты для упаковочных и
              конвейерных линий производителя OMNIX. Работаем
              напрямую, без посредников, со своего склада.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="group relative backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-white/10">
                  <Package className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl mb-3">
                    Один крупный склад
                  </h3>
                  <p className="text-zinc-400">
                    C более чем 1200 наименованиями и 95 000
                    единицами продукции
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-white/10">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl mb-3">
                    Оригинальные комплектующие
                  </h3>
                  <p className="text-zinc-400">
                    Omron и проверенное качество
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-white/10">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl mb-3">
                    Оперативная отгрузка
                  </h3>
                  <p className="text-zinc-400">
                    В течение 1–2 дней после оплаты
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-white/10">
                  <DollarSign className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl mb-3">
                    Выгодные цены
                  </h3>
                  <p className="text-zinc-400">
                    Оптовая стоимость без лишних наценок
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - glassmorphism cards */}
      <section id="categories" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-6">Категории товаров</h2>
            <p className="text-zinc-400 text-xl">
              И многое другое — на складе более тысячи
              наименований
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Коллаборативные роботы",
                img: IMAGES.categoryRobots,
              },
              {
                title: "Датчики индуктивные",
                img: IMAGES.categorySensors,
              },
              {
                title: "Камеры технического зрения",
                img: IMAGES.categoryCameras,
              },
              {
                title: "Контроллеры",
                img: IMAGES.categoryControllers,
              },
              {
                title: "Твердотельные таймеры",
                img: IMAGES.categoryTimers,
              },
              {
                title: "Инверторы и ИБП",
                img: IMAGES.categoryInverters,
              },
            ].map((category, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl cursor-pointer"
              >
                {/* Image Background */}
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/20 group-hover:from-zinc-950 group-hover:via-zinc-950/80 transition-all duration-500"></div>
                </div>

                {/* Content */}
                <div className="relative aspect-[4/3] p-8 flex flex-col justify-end">
                  <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300">
                    <h3 className="text-2xl">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-full px-8"
            >
              <a
                href="https://example.com/catalog"
                target="_blank"
                rel="noopener noreferrer"
              >
                Посмотреть каталог
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section - enhanced infographic */}
      <section
        id="process"
        className="py-32 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl mb-6">
              Как проходит заказ
            </h2>
            <p className="text-zinc-400 text-xl">
              Простой и понятный процесс от заявки до получения
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Step 1 */}
              <div className="relative">
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  {/* Number Circle */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-white to-zinc-300 flex items-center justify-center text-zinc-900 border-4 border-zinc-950">
                    01
                  </div>

                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 mb-6 border border-white/10">
                      <Send className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl mb-4">
                      Оставьте заявку
                    </h3>
                    <p className="text-zinc-400 mb-6">
                      Заполните форму или свяжитесь с нами
                      напрямую, чтобы уточнить нужные позиции
                    </p>

                    {/* Details */}
                    <div className="space-y-2 text-sm text-zinc-500">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                        <span>
                          По телефону, почте или форме
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                        <span>Бесплатная консультация</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                        <span>Быстрый ответ менеджера</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center border border-white/20">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="md:hidden flex justify-center mt-6">
                    <ArrowDown className="w-6 h-6 text-white/40" />
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-white to-zinc-300 flex items-center justify-center text-zinc-900 border-4 border-zinc-950">
                    02
                  </div>

                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 mb-6 border border-white/10">
                      <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl mb-4">
                      Согласуйте заказ
                    </h3>
                    <p className="text-zinc-400 mb-6">
                      Мы подготовим счёт на 100% предоплату с
                      НДС 5%. После оплаты заказ переходит в
                      обработку
                    </p>

                    {/* Details */}
                    <div className="space-y-2 text-sm text-zinc-500">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                        <span>Расчёт стоимости</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                        <span>НДС 5% включён</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                        <span>Безналичный расчёт</span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center border border-white/20">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="md:hidden flex justify-center mt-6">
                    <ArrowDown className="w-6 h-6 text-white/40" />
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-white to-zinc-300 flex items-center justify-center text-zinc-900 border-4 border-zinc-950">
                    03
                  </div>

                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 mb-6 border border-white/10">
                      <Package className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl mb-4">
                      Получите продукцию
                    </h3>
                    <p className="text-zinc-400 mb-6">
                      Отгрузка в течение 1–2 дней. Самовывоз по
                      адресу Коломна, Свердлова 23
                    </p>

                    {/* Details */}
                    <div className="space-y-2 text-sm text-zinc-500">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                        <span>Отгрузка за 1-2 дня</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                        <span>Проверка комплектации</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                        <span>Готовая документация</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline visualization */}
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10">
              <div className="text-center mb-6">
                <h4 className="text-xl mb-2">
                  Средняя длительность процесса
                </h4>
                <p className="text-zinc-400 text-sm">
                  От заявки до получения товара
                </p>
              </div>

              <div className="relative">
                {/* Progress bar */}
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-zinc-700 via-zinc-600 to-white rounded-full"></div>
                </div>

                {/* Time markers */}
                <div className="mt-4 flex justify-between text-sm text-zinc-400">
                  <div className="text-center">
                    <div className="mb-1">День 1</div>
                    <div className="text-xs text-zinc-500">
                      Заявка
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1">День 1</div>
                    <div className="text-xs text-zinc-500">
                      Счёт
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1">День 2-3</div>
                    <div className="text-xs text-zinc-500">
                      Отгрузка
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("form")}
              className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-full px-8"
            >
              Оставить заявку
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Delivery Section - glassmorphism */}
      <section id="delivery" className="py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src={IMAGES.deliveryBackground}
            alt="Промышленный склад"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-6">Доставка и оплата</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-xl">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-white/10">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl mb-3">
                    Доставка: самостоятельная
                  </h3>
                  <p className="text-zinc-400">
                    Заказ можно забрать со склада по адресу
                    Коломна, Свердлова 23
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-xl">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-white/10">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl mb-3">
                    Сроки: 1–2 дня после оплаты
                  </h3>
                  <p className="text-zinc-400">
                    Оперативная обработка и отгрузка заказов
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 md:col-span-2 shadow-xl">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-white/10">
                  <DollarSign className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl mb-3">Оплата</h3>
                  <p className="text-zinc-400">
                    100% предоплата, безналичный расчёт, НДС 5%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        id="form"
        className="py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <ImageWithFallback
            src={IMAGES.formBackground}
            alt="Abstract background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-2xl mx-auto px-6 relative">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-12 border border-white/10">
            <div className="text-center mb-10">
              <h2 className="text-4xl mb-4">Форма заявки</h2>
              <p className="text-zinc-400">
                Оставьте заявку, и мы свяжемся с вами для
                уточнения деталей
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white">
                  Имя
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-2 bg-white/5 border-white/10 rounded-2xl backdrop-blur-xl text-white placeholder:text-zinc-500"
                  placeholder="Введите ваше имя"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-white">
                  Телефон
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onFocus={handlePhoneFocus}
                  className="mt-2 bg-white/5 border-white/10 rounded-2xl backdrop-blur-xl text-white placeholder:text-zinc-500"
                  placeholder="+7 (___) ___-__-__"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">
                  Почта
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-2 bg-white/5 border-white/10 rounded-2xl backdrop-blur-xl text-white placeholder:text-zinc-500"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="comment" className="text-white">
                  Комментарий
                </Label>
                <Textarea
                  id="comment"
                  rows={4}
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  className="mt-2 bg-white/5 border-white/10 rounded-2xl backdrop-blur-xl text-white placeholder:text-zinc-500"
                  placeholder="Опишите ваши требования..."
                />
              </div>
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={checkboxes.consent}
                    onCheckedChange={(checked: boolean) =>
                      setCheckboxes({
                        ...checkboxes,
                        consent: checked as boolean,
                      })
                    }
                    className="mt-1 border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-zinc-900"
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm text-zinc-400"
                  >
                    Я ознакомлен и согласен на обработку персональных
                    данных
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="privacy"
                    checked={checkboxes.privacy}
                    onCheckedChange={(checked: boolean) =>
                      setCheckboxes({
                        ...checkboxes,
                        privacy: checked as boolean,
                      })
                    }
                    className="mt-1 border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-zinc-900"
                  />
                  <label
                    htmlFor="privacy"
                    className="text-sm text-zinc-400"
                  >
                    Я ознакомлен с{" "}
                    <a
                      href="https://example.com/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-zinc-200"
                    >
                      Политикой конфиденциальности
                    </a>
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={checkboxes.terms}
                    onCheckedChange={(checked: boolean) =>
                      setCheckboxes({
                        ...checkboxes,
                        terms: checked as boolean,
                      })
                    }
                    className="mt-1 border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-zinc-900"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-zinc-400"
                  >
                    Я ознакомлен с{" "}
                    <a
                      href="https://example.com/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-zinc-200"
                    >
                      Пользовательским соглашением
                    </a>
                  </label>
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={!allCheckboxesChecked || isSubmitting}
                className="w-full bg-white text-zinc-900 hover:bg-zinc-100 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-6">Контакты</h2>
            <p className="text-zinc-400 text-xl">
              Свяжитесь с нами удобным способом
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 mb-6 border border-white/10">
                  <Phone className="w-7 h-7" />
                </div>
                <div className="text-zinc-400 text-sm mb-2">
                  Телефон
                </div>
                <a
                  href="tel:89151318461"
                  className="text-xl hover:text-zinc-300 transition-colors"
                >
                  8 915 131 84 61
                </a>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 mb-6 border border-white/10">
                  <Mail className="w-7 h-7" />
                </div>
                <div className="text-zinc-400 text-sm mb-2">
                  Почта
                </div>
                <a
                  href="mailto:e9920630889@gmail.com"
                  className="text-xl hover:text-zinc-300 transition-colors break-all"
                >
                  e9920630889@gmail.com
                </a>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 mb-6 border border-white/10">
                  <MapPin className="w-7 h-7" />
                </div>
                <div className="text-zinc-400 text-sm mb-2">
                  Адрес склада
                </div>
                <button
                  onClick={() => scrollToSection("map")}
                  className="text-xl hover:text-zinc-300 transition-colors"
                >
                  Коломна, Свердлова 23
                </button>
              </div>
            </div>
          </div>

          {/* Messengers */}
          <div className="mb-12">
            <h3 className="text-center text-2xl mb-8">
              Мессенджеры
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/79151318461"
                target="_blank"
                rel="noopener noreferrer"
                className="group backdrop-blur-xl bg-white/5 hover:bg-white/10 rounded-2xl px-6 py-4 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-zinc-400">
                    WhatsApp
                  </div>
                  <div className="group-hover:text-zinc-300 transition-colors">
                    8 915 131 84 61
                  </div>
                </div>
              </a>

              <a
                href="https://t.me/+79151318461"
                target="_blank"
                rel="noopener noreferrer"
                className="group backdrop-blur-xl bg-white/5 hover:bg-white/10 rounded-2xl px-6 py-4 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-zinc-400">
                    Telegram
                  </div>
                  <div className="group-hover:text-zinc-300 transition-colors">
                    Написать в Telegram
                  </div>
                </div>
              </a>

              <a
                href="viber://chat?number=79151318461"
                target="_blank"
                rel="noopener noreferrer"
                className="group backdrop-blur-xl bg-white/5 hover:bg-white/10 rounded-2xl px-6 py-4 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-zinc-400">
                    Viber
                  </div>
                  <div className="group-hover:text-zinc-300 transition-colors">
                    Написать в Viber
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div
            id="map"
            className="aspect-[21/9] backdrop-blur-xl bg-white/5 rounded-3xl overflow-hidden border border-white/10"
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A5fe069064afabae3f164b00b2b4c2c14bdece56dd930118109f6890563cd7256&amp;source=constructor"
              width="100%"
              height="100%"
              frameBorder="0"
              className="opacity-60 hover:opacity-80 transition-opacity"
              title="Карта склада - улица Свердлова, 23, Коломна"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="h-8 mb-4">
                <img src={logo} alt="OMNIX" className="h-full w-auto" />
              </div>
              <p className="text-zinc-400 text-sm">
                Поставка компонентов для упаковочных и
                конвейерных линий OMNIX
              </p>
            </div>
            <div className="text-sm text-zinc-400">
              <div className="mb-2">
                Телефон: 8 915 131 84 61
              </div>
              <div className="mb-2">
                Почта: e9920630889@gmail.com
              </div>
              <div className="mb-2">ИНН: 773474323401</div>
              <div>ОГРНИП: 307770000058756</div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <div>© OMNIX, 2025</div>
            <div className="flex gap-6">
              <a
                href="https://example.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors"
              >
                Политика конфиденциальности
              </a>
              <a
                href="https://example.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors"
              >
                Пользовательское соглашение
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Success Dialog */}
      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="bg-zinc-900 border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-2xl">
              Заявка отправлена
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее
              время.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Button
            onClick={() => setShowSuccess(false)}
            className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-full mt-4"
          >
            Закрыть
          </Button>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}