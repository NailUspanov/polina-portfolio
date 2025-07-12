// Статические импорты для каждой папки проекта
const fashionCollectionImages = import.meta.glob('../assets/projects/fashion-collection/*.{jpg,jpeg,png,webp}', { eager: true })
const productStylingImages = import.meta.glob('../assets/projects/product-styling/*.{jpg,jpeg,png,webp}', { eager: true })
const behindScenesImages = import.meta.glob('../assets/projects/behind-scenes/*.{jpg,jpeg,png,webp}', { eager: true })

// Основные изображения портфолио (для обратной совместимости)
const portfolioImages = import.meta.glob('../assets/portfolio-*.jpg', { eager: true })
const portfolioImageList = Object.keys(portfolioImages)
  .sort()
  .map(path => portfolioImages[path].default)

// Дополнительные изображения из папки images
const additionalImages = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true })
const additionalImageList = Object.keys(additionalImages)
  .sort()
  .map(path => additionalImages[path].default)

// Преобразуем импорты в массивы изображений
const fashionCollectionImageList = Object.keys(fashionCollectionImages)
  .sort()
  .map(path => fashionCollectionImages[path].default)

const productStylingImageList = Object.keys(productStylingImages)
  .sort()
  .map(path => productStylingImages[path].default)

const behindScenesImageList = Object.keys(behindScenesImages)
  .sort()
  .map(path => behindScenesImages[path].default)

// Fallback: если в папке проекта нет изображений, используем основные
const getProjectImages = (projectImages, fallbackImages) => {
  return projectImages.length > 0 ? projectImages : fallbackImages
}

// Portfolio data with images from specific folders
export const portfolioData = [
  {
    id: 1,
    title: "Элегантная модная коллекция",
    description: "Студийная фотосъемка для люксового модного бренда с элегантной вечерней одеждой и профессиональным стайлингом.",
    folder: "fashion-collection",
    coverImage: getProjectImages(fashionCollectionImageList, portfolioImageList)[0] || portfolioImageList[0],
    images: getProjectImages(fashionCollectionImageList, portfolioImageList)
  },
  {
    id: 2,
    title: "Стайлинг и предметная съемка",
    description: "Чистая, минималистичная предметная фотосъемка одежды с профессиональным стайлингом и освещением.",
    folder: "product-styling",
    coverImage: getProjectImages(productStylingImageList, portfolioImageList)[0] || portfolioImageList[1],
    images: getProjectImages(productStylingImageList, portfolioImageList)
  },
  {
    id: 3,
    title: "За кадром",
    description: "Профессиональная студийная обстановка и процесс производства контента для модных брендов и фотосъемки.",
    folder: "behind-scenes",
    coverImage: getProjectImages(behindScenesImageList, [...portfolioImageList, ...additionalImageList])[0] || portfolioImageList[2],
    images: getProjectImages(behindScenesImageList, [...portfolioImageList, ...additionalImageList])
  }
]

// Для добавления нового проекта нужно:
// 1. Создать папку в src/assets/projects/новая-папка/
// 2. Добавить статический импорт выше
// 3. Добавить проект в массив portfolioData
// 
// Пример для нового проекта:
// const newProjectImages = import.meta.glob('../assets/projects/новая-папка/*.{jpg,jpeg,png,webp}', { eager: true })
// const newProjectImageList = Object.keys(newProjectImages).sort().map(path => newProjectImages[path].default)

// Экспортируем массивы для использования в других компонентах
export { 
  portfolioImageList, 
  additionalImageList, 
  fashionCollectionImageList,
  productStylingImageList,
  behindScenesImageList
} 