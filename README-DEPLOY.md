# Discrety — статическое превью для сервера

Это статическая версия сайта «דיסקרטי / Discrety» (стиль Neon Glass, иврит, RTL). Бекенда здесь нет: формы и часть ссылок показывают подсказку «это превью». Пакет подходит для публикации на любом хостинге со статикой — Hostinger (shared или VPS), nginx, Apache.

## Что внутри

Корень: index.html (главная), search.html (поиск), profile.html (анкета), messages.html (сообщения), premium.html (тарифы), login.html (вход), register.html (регистрация), admin.html (админка, закрыта от индексации), robots.txt, sitemap.xml. Папка assets: styles.css, app.js, hero.jpg, logo.png, avatar-f.png, avatar-m.png, favicon.png. Шрифт Rubik подключается с Google Fonts, поэтому сайту нужен доступ в интернет у посетителя — остальное самодостаточно.

## Как загрузить

Вариант 1, Hostinger shared: в hPanel откройте «Файлы → Менеджер файлов», зайдите в public_html и загрузите туда всё содержимое этой папки (сами файлы, не папку-обёртку). Главная откроется по адресу домена.

Вариант 2, VPS с nginx: скопируйте папку на сервер, например `scp -r discrety root@ваш-сервер:/var/www/discrety`, и подключите такой server-блок:

```nginx
server {
    listen 80;
    server_name discrety.co.il www.discrety.co.il;
    root /var/www/discrety;
    index index.html;
    charset utf-8;
    location / { try_files $uri $uri/ =404; }
}
```

После этого `nginx -t && systemctl reload nginx`, а SSL добавьте через `certbot --nginx` (по спецификации проекта HTTPS обязателен).

## Перед публикацией замените

Домен: в sitemap.xml, robots.txt и в meta-тегах canonical/og:url каждой страницы указан плейсхолдер `https://discrety.co.il` — замените на ваш реальный домен (поиском по файлам). Демо-данные: цены на premium.html помечены как «להמחשה בלבד», статистика в admin.html и анкеты — вымышленные. SEO: в страницы добавлены ключевые слова (היכרויות, דיסקרטי и производные) в title, description, keywords, Open Graph и JSON-LD на главной; после публикации подключите домен в Google Search Console и отправьте sitemap.xml.

## Что дальше

Это витрина-превью. Рабочая версия по мастер-спецификации проекта — Next.js + NestJS + PostgreSQL + Redis в Docker за nginx; этот пакет можно держать на домене как заглушку до запуска, а затем заменить приложением.
