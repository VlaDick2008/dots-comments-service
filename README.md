
# dots‑comments‑service

Набор сервисов для работы с точками и комментариями к ним:  
– **API** на .NET 9.0 с In‑Memory базой данных и Swagger-ом;  
– **Client** на TypeScript с Bun, Esbuild и Konva для визуализации точек и их комментариев.

---

## Описание

Сервис позволяет:  
1. Создавать, читать, обновлять и удалять **точки** (с координатами, радиусом и цветом).  
2. Добавлять к любой точке **комментарии** с текстом и фоном, редактировать их.  
3. Перетаскивать точки мышью и сохранять изменения (координаты, цвет, радиус).  
4. Управлять комментариями через сочетания клавиш.

---

## Технологии

| Компонент | Стек |
|---|---|
| **API** | .NET 9.0, ASP.NET Core Web API, Entity Framework Core (InMemory), Swagger, CORS |
| **Client** | TypeScript, Bun, Esbuild, Konva.js, jQuery, Kendo UI |

---

## Требования

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download)  
- [Bun](https://bun.sh/)  
- Node.js 
- Git  

---

## Установка

### Клонировать репозиторий
```bash
git clone https://github.com/VlaDick2008/dots-comments-service.git
cd dots-comments-service
```
### Перейти в папку API и восстановить зависимости
```bash
cd api
dotnet restore
```

### Перейти в папку Client и установить зависимости
```bash
cd ../client
bun install
```

## Запуск

### Перейти в папку API
```bash
dotnet run
```

### Перейти в папку Client, собрать проект
```bash
bun run build
```

Затем, откройте index.html из папки public.
