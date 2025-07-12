import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Camera, Mail, MapPin, Instagram, Star, ArrowRight, Check, MessageCircle, FileText, X, ChevronLeft, ChevronRight } from 'lucide-react'
import './App.css'

// Import images
import heroBackground from './assets/hero-bg.jpg'
import polinaHeadshot from './assets/polina-headshot.jpg'

// Импортируем конфигурацию портфолио из отдельного файла
import { portfolioData } from './data/portfolioConfig.js'

// Gallery Modal Component
function GalleryModal({ isOpen, onClose, project, currentImageIndex, setCurrentImageIndex }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrevImage()
      if (e.key === 'ArrowRight') handleNextImage()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, currentImageIndex])

  const handlePrevImage = () => {
    if (project && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const handleNextImage = () => {
    if (project && currentImageIndex < project.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
      >
        <X className="h-8 w-8" />
      </button>

      {/* Navigation buttons */}
      {currentImageIndex > 0 && (
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
        >
          <ChevronLeft className="h-12 w-12" />
        </button>
      )}

      {currentImageIndex < project.images.length - 1 && (
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
        >
          <ChevronRight className="h-12 w-12" />
        </button>
      )}

      {/* Main image */}
      <div className="max-w-4xl max-h-full flex flex-col items-center">
        <img
          src={project.images[currentImageIndex]}
          alt={`${project.title} - ${currentImageIndex + 1}`}
          className="max-w-full max-h-[80vh] object-contain"
        />
        
        {/* Image counter and title */}
        <div className="text-white text-center mt-4">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-300">
            {currentImageIndex + 1} из {project.images.length}
          </p>
        </div>

        {/* Thumbnail navigation */}
        <div className="flex space-x-2 mt-4 max-w-full overflow-x-auto">
          {project.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentImageIndex ? 'border-white' : 'border-transparent'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Click outside to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
      />
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [galleryModal, setGalleryModal] = useState({
    isOpen: false,
    project: null,
    currentImageIndex: 0
  })

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  const openGallery = (project, imageIndex = 0) => {
    setGalleryModal({
      isOpen: true,
      project,
      currentImageIndex: imageIndex
    })
  }

  const closeGallery = () => {
    setGalleryModal({
      isOpen: false,
      project: null,
      currentImageIndex: 0
    })
  }

  const setCurrentImageIndex = (index) => {
    setGalleryModal(prev => ({
      ...prev,
      currentImageIndex: index
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-900">
              Полина Яворская
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-gray-900 transition-colors">Главная</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-gray-900 transition-colors">Обо мне</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-gray-700 hover:text-gray-900 transition-colors">Портфолио</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-gray-900 transition-colors">Услуги</button>
              <button onClick={() => scrollToSection('rules')} className="text-gray-700 hover:text-gray-900 transition-colors">Правила</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-gray-900 transition-colors">Контакты</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Креативный продюсер &<br />Фотограф
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Специализируюсь на фотосъемке для модных брендов и создании контента в Саратове
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToSection('portfolio')} 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              Посмотреть портфолио <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')} 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Связаться со мной
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Обо мне</h2>
              <p className="text-lg text-gray-700 mb-6">
                Я креативный продюсер и фотограф из Саратова, специализируюсь на фотосъемке для модных брендов и создании контента. С острым глазом на детали и страстью к визуальному повествованию, я помогаю брендам одежды создавать убедительные изображения, которые находят отклик у их аудитории.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Мой подход сочетает техническую экспертизу с креативным видением, обеспечивая высококачественные результаты каждой съемки, которые соответствуют эстетике вашего бренда и маркетинговым целям.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  Саратов, Россия
                </div>
                <div className="flex items-center text-gray-600">
                  <Camera className="h-5 w-5 mr-2" />
                  Фотосъемка для модных брендов
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={polinaHeadshot} 
                alt="Полина Яворская" 
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Портфолио</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Примеры недавних работ по фотосъемке для модных брендов и созданию контента
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.map((project) => (
              <Card 
                key={project.id}
                className="group overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => openGallery(project)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                      <Camera className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Посмотреть галерею</p>
                      <p className="text-xs">{project.images.length} фото</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Pricing Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Услуги и цены</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Профессиональные услуги фотосъемки и продакшена для модных брендов
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <Card className="relative border-2 border-gray-200 hover:border-gray-300 transition-colors">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Базовый</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-4">₽15,000</div>
                  <p className="text-gray-600 mb-6">Идеально для небольших коллекций</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>До 10 фотографий товаров</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>2-часовая студийная сессия</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Базовая ретушь</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Файлы высокого разрешения</span>
                  </li>
                </ul>
                <Button className="w-full">Выбрать базовый</Button>
              </CardContent>
            </Card>

            {/* Standard Package */}
            <Card className="relative border-2 border-blue-500 hover:border-blue-600 transition-colors">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Самый популярный
                </div>
              </div>
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Стандартный</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-4">₽25,000</div>
                  <p className="text-gray-600 mb-6">Идеально для брендовых кампаний</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>До 25 фотографий</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>4-часовая студийная сессия</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Профессиональная ретушь</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Координация с моделями</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Консультация по стайлингу</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Выбрать стандартный</Button>
              </CardContent>
            </Card>

            {/* Premium Package */}
            <Card className="relative border-2 border-gray-200 hover:border-gray-300 transition-colors">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Премиум</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-4">₽45,000</div>
                  <p className="text-gray-600 mb-6">Полное производство для бренда</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>До 50 фотографий</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Полный день съемки</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Продвинутая ретушь</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Несколько моделей</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Креативное направление</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Контент для соцсетей</span>
                  </li>
                </ul>
                <Button className="w-full">Выбрать премиум</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Правила работы</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Важная информация о условиях сотрудничества, возврате средств и переносе съемок
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center mb-4">
                      <FileText className="h-6 w-6 text-blue-500 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">Отмена и возврат средств</h3>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                      <li>• Отмена за 48 часов до съемки - возврат 100%</li>
                      <li>• Отмена за 24 часа до съемки - возврат 50%</li>
                      <li>• Отмена менее чем за 24 часа - возврат не предусмотрен</li>
                      <li>• При форс-мажорных обстоятельствах рассматривается индивидуально</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-4">
                      <Camera className="h-6 w-6 text-green-500 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">Перенос съемки</h3>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                      <li>• Первый перенос бесплатно (за 24 часа до съемки)</li>
                      <li>• Повторный перенос - доплата 20% от стоимости</li>
                      <li>• Перенос по погодным условиям - бесплатно</li>
                      <li>• Перенос по болезни (при справке) - бесплатно</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center mb-4">
                    <Star className="h-6 w-6 text-yellow-500 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Дополнительные условия</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                    <div>
                      <h4 className="font-semibold mb-2">Предоплата:</h4>
                      <p>Для бронирования даты требуется предоплата 50% от стоимости услуг</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Готовность материалов:</h4>
                      <p>Обработанные фотографии предоставляются в течение 7-14 рабочих дней</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Авторские права:</h4>
                      <p>Все права на использование фотографий передаются заказчику</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Дополнительное время:</h4>
                      <p>Превышение времени съемки оплачивается дополнительно - 2000₽/час</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Свяжитесь со мной</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Готовы создать потрясающий контент для вашего модного бренда? Давайте обсудим ваш проект.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Контактная информация</h3>
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <MapPin className="h-6 w-6 text-gray-600 mr-4" />
                        <span className="text-gray-700">Саратов, Россия</span>
                      </div>
                      <div className="flex items-center">
                        <Instagram className="h-6 w-6 text-gray-600 mr-4" />
                        <a href="https://instagram.com/zotovapln" className="text-gray-700 hover:text-gray-900">@zotovapln</a>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-6 w-6 text-gray-600 mr-4" />
                        <a href="https://t.me/zotovapl" className="text-blue-600 hover:text-blue-800 font-medium">@zotovapl в Telegram</a>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Что я предлагаю:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Фотосъемка для модных брендов</li>
                        <li>• Предметная фотосъемка</li>
                        <li>• Производство контента</li>
                        <li>• Креативное направление</li>
                        <li>• Контент для социальных сетей</li>
                      </ul>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8">
                      <MessageCircle className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Напишите мне в Telegram</h3>
                      <p className="text-gray-600 mb-6">
                        Самый быстрый способ связаться со мной и обсудить детали вашего проекта
                      </p>
                      <a 
                        href="https://t.me/zotovapl" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      >
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Написать в Telegram
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Полина Яворская. Креативный продюсер и фотограф из Саратова.
          </p>
          <div className="mt-4">
            <a href="https://instagram.com/zotovapln" className="text-gray-400 hover:text-white transition-colors mr-6">
              Подписывайтесь @zotovapln в Instagram
            </a>
            <a href="https://t.me/zotovapl" className="text-gray-400 hover:text-white transition-colors">
              Telegram: @zotovapl
            </a>
          </div>
        </div>
      </footer>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={galleryModal.isOpen}
        onClose={closeGallery}
        project={galleryModal.project}
        currentImageIndex={galleryModal.currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />
    </div>
  )
}

export default App

