# Домашнее задание курса Node.js (3 и 4)
![Скриншот проекта](https://loftschool.com/uploads/course_logos/nodejs.svg?v=1513152963369)

>Для запуска:

0. git clone https://krabaton@bitbucket.org/krabaton/nodejs-hw34.git
1. npm i (yarn)
2. npm start


>Для сборки проекта под Express(Koa.js) (папка server):

    npm run build

Он создаст папку со статикой public. Шаблоны Pug лежат в папке source/template

### Проект состоит из трех страниц
* index.html
* login.html
* admin.html

> Итоговый url при обращении к странице должен быть без расширения html (пример: localhost/login)
> В сборке используется шаблонизатор PUG, но можно использовать любой другой на стороне сервера.
> npm run build создаст в папке public файлы html, которые можно использовать под шаблонизаторы hbs или ejs

#### На странице login.html - POST запрос url = '/login'
Отправляет на сервер поля
```
    {
      email,
      password
    }
```
***
#### На странице index.html - POST запрос url = '/'
Отправляется на сервер поля
```
    {
      name - 'Имя отправителя',
      email - 'Email пользователя',
      message - 'Сообщение от пользователя'
    }
```

***
#### На странице admin.html - POST запрос url = '/admin/upload'
Отправляется FormData объект на сервер с картинкой товара и описанием
```js
    в поле photo - Картинка товара
    в поле name - Название товара
    в поле price - Цена товара
```
 #### POST запрос url = '/admin/skills'
Отправляется поля на сервер с значением скиллов
```js
    в поле age - Возраст
    в поле concerts - Концертов
    в поле cities - Число городов
    в поле years - Лет на сцене
```
##### Домашние задание №3 - реализовать серверную часть на [Express.js](http://expressjs.com/ru/)

##### Домашние задание №4 - реализовать серверную часть на [Koa.js](http://koajs.com/)

Данные хранить на сервере в JSON файле, можно использовать пакет [nconf](https://www.npmjs.com/package/nconf) или [LowDB](https://github.com/typicode/lowdb) на свое усмотрение

### Примечание
- модульный сборщик browserify для клиентского js. ES6 подключено. 
- обратите внимание, что в файлах template.pug 
```jade
    link(rel="stylesheet" href="/assets/css/foundation%=suffix=%.css%=version=%")
    link(rel="stylesheet" href="/assets/css/app%=suffix=%.css%=version=%")

    script(src="/assets/js/foundation%=suffix=%.js%=version=%" defer)
    script(src="/assets/js/app%=suffix=%.js%=version=%" defer)
```
%=suffix=% и %=version=% подставляются автоматически сборкой и заменяет их
```html
    <link rel="stylesheet" href="/assets/css/foundation.min.css?rel=0.0.1">
    <link rel="stylesheet" href="/assets/css/app.min.css?rel=0.0.1">
    <script src="/assets/js/foundation.min.js?rel=0.0.1" defer></script>
    <script src="/assets/js/app.min.js?rel=0.0.1" defer></script>
```
Вам при переносе в проект шаблонов Pug надо будет заменить самостоятельно
```jade
    link(rel="stylesheet" href="/assets/css/foundation.min.css")
    link(rel="stylesheet" href="/assets/css/app.min.css")

    script(src="/assets/js/foundation.min.js" defer)
    script(src="/assets/js/app.min.js" defer)
```
- jQuery есть и можно использовать
- JS не используется для отправки форм, все выполняется нативно браузером. Хотите пишите самостоятельно клиентский код
- Для ответов с сервера есть поле .status в каждой форме. Чтобы туда отправлять ответы от сервера используйте пакет [connect-flash](https://www.npmjs.com/package/connect-flash)
- проект можно немного подпиливать под себя