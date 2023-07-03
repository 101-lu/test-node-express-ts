#Node Express TS Test

![node version](https://img.shields.io/badge/Node-16+-green) ![typescript version](https://img.shields.io/badge/Typescript-5.1.6-blue) ![express version](https://img.shields.io/badge/Express-4.18.2-blue) ![express version](https://img.shields.io/badge/Studios-101-red)


## Installation

Before start installation you need to install [Node.js](https://nodejs.org/en/) v16+, prepare a good coffee and fork this project.

### Lets start

```sh
git clone https://github.com/my-github-fork.git node-express-ts-test
cd node-express-ts-test
npm install
```

### Launch server with nodemon

```sh
npm run dev
```

## What should be done

##### <font color="orange">One</font>
Understand how the server works, who does what and how.

##### <font color="blue">Two</font>
Read Todo comments in each controller

##### <font color="green">Three</font>
Prepare an other good coffee and a good playlist

##### <font color="red">Let's go</font>

## Documentation

### Files structure
```sh
index.ts # server entry point
config.ts # server config: port, host, ...
type.ts # main importable types
helpers/ # useful helper like JWT
app/
    controllers/ # place to work
    database/ # non presistent database
    exceptions/ # custom errors declarations
    middleware/ # maybe place to work
    models/ # fake ORM
    start/ # kernel & routes declarations
    validators/ # Joi schemas
```

### Express context pretifier
Because i love <font color="pink">Express ♡</font>, i write a small context pretifier as HOF to use in controller declarations
```typescript
({
  request: {
    headers: () => express.Request['headers],
    param: (key: string) => Option<string>,
    params: () => string[],
    // best way to validate and type request.body trow a ValidationException catch by exceptionsHandler
    validate: async (schema: JoiSchema) => Record<string, any>
    original: express.Request,
  },
  response: {
    // response shortcut
    ok: (json?: Record<string, any>) => void,// 200
    created: (json?: Record<string, any>) => void,// 201
    accepted: (json?: Record<string, any>) => void,// 203
    noContent: () => void,// 204
    badRequest: (json?: Record<string, any>) => void,// 400
    unauthorized: (json?: Record<string, any>) => void,// 401
    forbidden: (json?: Record<string, any>) => void,// 403
    notFound: (json?: Record<string, any>) => void,// 404
    notAllowed: (json?: Record<string, any>) => void,// 405
    original: express.Response,
  },
  next: express.NextFunction
})
```

### ORM
```typescript
{
    static findAll: () => Promise<Model[]>// get all records
    static findOne: (id: string) => Promise<Model>// get one record by id
    create: (data: ModelData) => Promise<Model>// create a new model from  data on database
    merge: (data: Partial<ModelData>) => Promise<void>// merge partial data with model
    save: () => Promise<void> // save model on database
    delete: () => Promise<void> // delete model on database
    json: () => ModelData // serialize model
}

// example code
const myUser = await findOne('my-super-uui')
await myUser.merge({name: 'Max'}).save()
return myUser.json()
await myUser.delete()
```