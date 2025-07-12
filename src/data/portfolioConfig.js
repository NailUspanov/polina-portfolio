// Функция для загрузки изображений из конкретной папки
const loadProjectImages = (projectFolder) => {
  const images = import.meta.glob(`../assets/projects/${projectFolder}/*.{jpg,jpeg,png,webp}`, { eager: true })
  return Object.keys(images)
    .sort()
    .map(path => images[path].default)
}

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

// Изображения для каждого проекта
const fashionCollectionImages = loadProjectImages('fashion-collection')
const productStylingImages = loadProjectImages('product-styling')
const behindScenesImages = loadProjectImages('behind-scenes')

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
    coverImage: getProjectImages(fashionCollectionImages, portfolioImageList)[0] || portfolioImageList[0],
    images: getProjectImages(fashionCollectionImages, portfolioImageList)
  },
  {
    id: 2,
    title: "Стайлинг и предметная съемка",
    description: "Чистая, минималистичная предметная фотосъемка одежды с профессиональным стайлингом и освещением.",
    folder: "product-styling",
    coverImage: getProjectImages(productStylingImages, portfolioImageList)[0] || portfolioImageList[1],
    images: getProjectImages(productStylingImages, portfolioImageList)
  },
  {
    id: 3,
    title: "За кадром",
    description: "Профессиональная студийная обстановка и процесс производства контента для модных брендов и фотосъемки.",
    folder: "behind-scenes",
    coverImage: getProjectImages(behindScenesImages, [...portfolioImageList, ...additionalImageList])[0] || portfolioImageList[2],
    images: getProjectImages(behindScenesImages, [...portfolioImageList, ...additionalImageList])
  }
]

// Экспортируем функцию для добавления новых проектов
export const createProject = (id, title, description, folder) => {
  const projectImages = loadProjectImages(folder)
  return {
    id,
    title,
    description,
    folder,
    coverImage: projectImages[0] || portfolioImageList[0],
    images: getProjectImages(projectImages, portfolioImageList)
  }
}

// Экспортируем также отдельные массивы для гибкости
export { 
  portfolioImageList, 
  additionalImageList, 
  fashionCollectionImages,
  productStylingImages,
  behindScenesImages,
  loadProjectImages
} 