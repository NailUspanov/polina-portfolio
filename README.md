# Porfolio web


## Технологии

- **React 19** - основная библиотека
- **Vite** - инструмент сборки
- **Tailwind CSS** - стилизация
- **Radix UI** - компоненты UI
- **Framer Motion** - анимации
- **Lucide React** - иконки

## Локальная разработка

1. Установите зависимости:
```bash
pnpm install
```

2. Запустите сервер разработки:
```bash
pnpm run dev
```

3. Откройте [http://localhost:5173](http://localhost:5173) в браузере

## Деплой

Проект автоматически деплоится на GitHub Pages при пуше в ветку `main` или `master`.

### Ручной деплой

1. Соберите проект:
```bash
pnpm run build
```

2. Предварительный просмотр:
```bash
pnpm run preview
```

## Структура проекта

```
polina-website/
├── src/
│   ├── components/     # UI компоненты
│   ├── assets/         # Изображения и статические файлы
│   ├── App.jsx         # Главный компонент
│   └── main.jsx        # Точка входа
├── public/             # Публичные файлы
└── .github/workflows/  # GitHub Actions
```

## Настройка GitHub Pages

1. Создайте репозиторий на GitHub
2. Отправьте код в репозиторий
3. В настройках репозитория перейдите в раздел Pages
4. Выберите источник "GitHub Actions"
5. Сайт будет доступен по адресу: `https://username.github.io/polina-portfolio/`

## Лицензия

Этот проект создан для личного использования. 
