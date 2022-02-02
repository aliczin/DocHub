# DocHub

![Инкрементальное развитие архитектуры](pics/interface.png)

DocHub - инструмент описания архитектуры через код (Architecture as a code). Код архитектуры - ансамбль файлов на языках,
решающих задачу описания. Поддерживаются:

* [PlantUML](https://plantuml.com/) - позволяет создавать диаграммы, используя простой и интуитивно понятный язык;
* [Markdown](https://ru.wikipedia.org/wiki/Markdown) - язык разметки, созданный с целью обозначения форматирования в тексте;
* [Swagger](https://swagger.io/) - язык описания HTTP API контрактов;
* [Манифесты](https://dochub.info/docs/dochub_contexts) - структурированные файлы в формате YAML/JSON для описания архитектурных объектов.

Решаемые проблемы:

* [Управление версиями](#versions);
* [Децентрализованное управление архитектурой в Agile-ориентированных компаниях](#decentralized);
* [Управление архитектурой экосистемы](#ecosystem);
* [Создание архитектурных фасадов (портал документации)](#facade);
* [Контроль консистентности](#problems).

[Живое демо и подробная документация](https://dochub.info/)

## <a name="versions"></a> Управление версиями архитектуры

DocHub позволяет развивать кодовую базу архитектуры аналогично кодовой базе приложений. В качестве системы управления
версиями используется GitLab.

![Инкрементальное развитие архитектуры](pics/inc_arch.png)

## <a name="decentralized"></a> Децентрализованное управление архитектурой в Agile-ориентированных компаниях

DocHub умеет консолидировать описание архитектуры из различных источников. Например, из разных репозиториев. Это 
позволяет командам действовать независимо в сотрудничестве друг с другом. 

![Инкрементальное развитие архитектуры](pics/decentralized.png)

## <a name="ecosystem"></a> Управление архитектурой экосистем

DocHub создан с учетом современных проблем в управлении архитектурой экосистемы. В ней продукты взаимосвязаны, 
но развиваются автономно. DocHub позволяет создать единое информационное пространство для экосистемы. Стимулирует 
положительную синергию продуктов. 

![Инкрементальное развитие архитектуры](pics/ecosystem.png)

## <a name="facade"></a> Архитектурные фасады

DocHub хорошо решает задачу публичного портала документации. 

![Инкрементальное развитие архитектуры](pics/facade.png)

[Пример портала](https://dochub.info/).

## <a name="problems"></a> Контроль консистентности архитектуры

DocHub умеет находить проблемы в описании архитектуры.    

![Инкрементальное развитие архитектуры](pics/problems.png)



## Конфигурирование

Определите необходимые переменные окружения. Используйте файл примера "example.env" для этого. Переименуйте его для
продакшен окружения в ".env" для локального развертывания в ".env.local". 

Если вы ничего не будете трогать, развертывание произойдет с дефолтными настройками. В этом случае DocHub будет 
содержать собственную документацию.   

| Переменная                        | Описание                                      |     Значение по-умолчанию      |             Обязательно             |
|-----------------------------------|-----------------------------------------------|:------------------------------:|:-----------------------------------:|
| VUE_APP_DOCHUB_ROOT_MANIFEST      | URI в формате DocHub корневого манифеста      |    workspace/meta/root.yaml    |                 Да                  |
| VUE_APP_DOCHUB_ROOT_DOCUMENT      | Идентификатор документа главной страницы.     |         dochub_welcome         |                 Да                  |
| VUE_APP_DOCHUB_GITLAB_URL         | URL до GitLab                                 |       https://foo.space        |                 Нет                 |
| VUE_APP_DOCHUB_PERSONAL_TOKEN     | Персональный токен gitlab для разработки      |                                |                 Нет                 |
| VUE_APP_DOCHUB_APP_ID             | ID приложения зарегистрированного в GitLab    |                                | если есть VUE_APP_DOCHUB_GITLAB_URL |
| VUE_APP_DOCHUB_CLIENT_SECRET      | Секрет приложения в GitLab                    |                                | если есть VUE_APP_DOCHUB_GITLAB_URL |
 | VUE_APP_DOCHUB_APPEND_DOCHUB_DOCS | y/n подключает в описание документацию DocHub |               n                |                 Нет                 |
| VUE_APP_PLANTUML_SERVER           | Cервер рендеринга PlantUML                    | www.plantuml.com/plantuml/svg/ |                 Да                  |


> [Больше информации](https://cli.vuejs.org/ru/guide/mode-and-env.html) о переменных среды выполнения

## Развертывание

Проект является VueJS SPA приложением. Все развертывание типично для vueJS приложений.
В качестве backend пользуется GitLab.


### Локальное

Запустим локальный plantuml сервер

```console
docker-compose up plantuml
```

PlantUml будет доступен по пути http://localhost:8079/svg


Далее запустим npm

```console
npm install
npm run build
npm run serve
```


DocHub станет доступен по адресу http://localhost:8080/main

В результате будут сгенерированы статические файлы в папке /dist. Их необходимо
опубликовать используя web-сервер. Например, nginx.

Подробнее о вариантах развертывания можно узнать [тут](https://cli.vuejs.org/ru/guide/deployment.html).

Для разработки вместе с Docker
- Монтирование исходников в контейнер
- Сборка в докере
- Долго

```console
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up --build 
```

### Kubernetes

Используйте [helm chart](https://github.com/RabotaRu/helm-charts/tree/main/charts/dochub)

## Интеграция с GitLab

### Для локального развертывания

В файле ".env.local" укажите адрес GitLab в соответствующей переменной:

```dotenv
VUE_APP_DOCHUB_GITLAB_URL=https://foo.space
```

В GitLab **под своей учетной записью** выпустите персональный токен Profile->Preferences->Access Tokens

![Пример настройки GitLab](pics/personal_token.png)

Полученный токен укажите в файле ".env.local" в переменной:

```dotenv
# Персональный токен gitlab. Используется для локальной разработки
VUE_APP_DOCHUB_PERSONAL_TOKEN=9H...FR
```

Перезапустите контейнеры:

```
docker-compose down
docker-compose up
```

### Локальное развитие архитектуры

Создайте папку "/public/workspace". Папка входит в .gitignore. Это нормально. Папка предназначена для 
локального развертывания архитектурных репозиториев. Клонируйте необходимый архитектурный репозиторий.

```
cd /public/workspace
git clone git@git.foo.space:repo.git
```

Определите в ".env.local" переменную корневого манифеста:

```dotenv
VUE_APP_DOCHUB_ROOT_MANIFEST=workspace/repo/root.yaml
``` 

Перезапустите контейнеры:

```console
docker-compose down
docker-compose up
```

Теперь вы можете вносить изменения в репозиторий локально и видеть результат изменений в режиме реального времени. 

### Для продакшена

В файле ".env" укажите адрес GitLab в соответствующей переменной:

```dotenv
VUE_APP_DOCHUB_GITLAB_URL=https://foo.space
```

Настройте OAuth2 service provider в GitLab. Документацию по настройке можно найти на
[официальном сайте](https://docs.gitlab.com/ee/integration/oauth_provider.html). 

![Пример настройки GitLab](pics/gitoauth.png)

Полученные токены укажите в файле .env в переменных:

```dotenv
# Идентификатор приложения зарегистрированного в GitLab
VUE_APP_DOCHUB_APP_ID=5f3...f0

# Секрет приложения
VUE_APP_DOCHUB_CLIENT_SECRET=1e4...384
```

Соберите приложение:

```console
npm run build
```

# Статьи
* [Архитектура как кот VS Архитектура как кол](https://habr.com/ru/company/rabota/blog/578340/);
* [Архитектура как данные](https://habr.com/ru/post/593009/);

# Лицензия
DocHub распространяется под лицензией
[GNU GPL v.2](http://www.gnu.org/licenses/old-licenses/gpl-2.0.html)
Open source license.
