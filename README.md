# Dependencias

```
npm i pg
npm i -D @types/pg
```


# Comandos de heroku

Crear variables de entorno en heroku

```
heroku login 

heroku create

heroku apps:rename --app nombreviejo nombrenuevo

heroku local web

heroku open
git push heroku master

heroku logs --tail
heroku run bash
```

https://typeorm.io/#/entities

https://typeorm.io/#/active-record-data-mapper

#Crear migraciones

Tenemos que tener en el package.json en scripts

"typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js",
"migrations:generate": "npm run typeorm -- migration:generate -n"
"migrations:run":  "npm run typeorm -- migration:run",
"migrations:show":  "npm run typeorm -- migration:show"
"migrations:drop": "npm run typeorm -- migration:drop"

Luego ejecutamos para crear migraciones:
npm run migrations:generate -- init

ejecutamos

npm run migrations:run
npm run migrations:show
npm run migrations:drop

#agregamos migraciones
npm run migrations:generate -- add-fields