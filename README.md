# Complitech task

## How to run

```
 npm install
 npm run proxy 
 npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

В чем преимущество qraphql перед rest для клиентских приложений?\
``
GraphQL предоставляет преимущество при работе с клиентскими приложениями, т.к. уменьшает количество запросов к серверу и позволяет запрашивать такие данные, которые реально нужны клиенту. REST протокол может потребовать множество отдельных запросов для получения всех данных, а значит увеличивает нагрузку на сеть и задержку получения данных. GraphQL так же поддерживает кэширование запросов, видимость классов и схем, могут использоваться бесплатные генераторы кода и инструменты для трассировки и мониторинга запросов.
``

Чем хороша локализация бизнес логики и отображения внутри компонента? Как достичь этого для для удаленных данных\
``
Локализация бизнес логики и отображения внутри одного компонента позволяет использовать модульную архитектуру приложения. Она позволяет развернуть зависимости приложения и сделать так, чтобы бизнес-логика отвечала за презентацию
``