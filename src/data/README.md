# Управление изображениями портфолио

## Новая структура: отдельные папки для каждого проекта

### 🗂️ Организация по проектам (рекомендуется)

Каждый проект может иметь свою папку с изображениями:

```
src/assets/projects/
├── fashion-collection/     # Проект "Элегантная модная коллекция"
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── photo3.jpg
├── product-styling/        # Проект "Стайлинг и предметная съемка"
│   ├── styling1.jpg
│   ├── styling2.jpg
│   └── styling3.jpg
└── behind-scenes/          # Проект "За кадром"
    ├── bts1.jpg
    ├── bts2.jpg
    └── bts3.jpg
```

### 📁 Существующие папки (для обратной совместимости)

```
src/assets/
├── portfolio-1.jpg         # Основные изображения (fallback)
├── portfolio-2.jpg         # Используются если в папке проекта нет изображений
├── portfolio-3.jpg
└── images/                 # Дополнительные изображения
    ├── portfolio-ref1.jpg
    └── portfolio-ref2.jpg
```

## 🎯 Как добавить изображения

### Для конкретного проекта:
1. Перейдите в папку проекта: `src/assets/projects/[название-проекта]/`
2. Добавьте изображения в любом формате: `.jpg`, `.jpeg`, `.png`, `.webp`
3. Изображения автоматически загрузятся для этого проекта

### Создание нового проекта:
1. **Создайте папку** в `src/assets/projects/новый-проект/`
2. **Добавьте изображения** в папку
3. **Обновите `portfolioConfig.js`:**

```javascript
// Добавьте статический импорт для новой папки
const newProjectImages = import.meta.glob('../assets/projects/новый-проект/*.{jpg,jpeg,png,webp}', { eager: true })
const newProjectImageList = Object.keys(newProjectImages).sort().map(path => newProjectImages[path].default)

// Добавьте новый проект в массив portfolioData
export const portfolioData = [
  // ... существующие проекты
  {
    id: 4,
    title: "Название проекта",
    description: "Описание проекта",
    folder: "новый-проект",
    coverImage: getProjectImages(newProjectImageList, portfolioImageList)[0] || portfolioImageList[0],
    images: getProjectImages(newProjectImageList, portfolioImageList)
  }
]

// Обновите экспорт
export { 
  portfolioImageList, 
  additionalImageList, 
  fashionCollectionImageList,
  productStylingImageList,
  behindScenesImageList,
  newProjectImageList  // Добавьте новый массив
}
```

## 🔧 Гибкие настройки

### Смешивание изображений из разных источников:
```javascript
{
  id: 1,
  title: "Проект",
  folder: "fashion-collection",
  images: [
    ...fashionCollectionImageList,  // Изображения из папки проекта
    ...portfolioImageList,          // Основные изображения
    additionalImageList[0]          // Конкретное дополнительное изображение
  ]
}
```

### Использование только определенных изображений:
```javascript
{
  id: 1,
  title: "Проект",
  images: [
    fashionCollectionImageList[0],  // Первое изображение из папки
    fashionCollectionImageList[2]   // Третье изображение из папки
  ]
}
```

## 📋 Доступные папки проектов

- `fashion-collection` - Элегантная модная коллекция
- `product-styling` - Стайлинг и предметная съемка  
- `behind-scenes` - За кадром

## 🎨 Поддерживаемые форматы

- `.jpg` / `.jpeg`
- `.png`
- `.webp`

## 🔄 Система Fallback

Если в папке проекта нет изображений, автоматически используются:
1. Основные изображения портфолио (`portfolio-*.jpg`)
2. Дополнительные изображения из папки `images/`

Это обеспечивает работу сайта даже при отсутствии изображений в папках проектов.

## ⚠️ Важно

- Для каждой новой папки проекта нужно добавить статический импорт в `portfolioConfig.js`
- Vite требует статических путей для `import.meta.glob`, поэтому динамические пути не поддерживаются
- После добавления нового проекта не забудьте обновить экспорт в конце файла 