# Coffeebull :coffee:

Coffeebull is a little MacOS App that prevent the display from sleeping.
It uses the utility named `caffeinate` from your own mac.

### Why?
`Caffeine` is not more maintained, disappeared from the Store. :cry:

There are also some existing project but there're using XCode
(@see [https://github.com/newmarcel/KeepingYouAwake](https://github.com/newmarcel/KeepingYouAwake))

Basically, I just wanted to try a bit Electron, make a quickly app and that's all :dash:

### Installing

#### prerequisities

*NodeJS v6.9.1 I suggest you to use [nvm](https://github.com/creationix/nvm) for multiple node version manager*

```
nvm use
npm install
```

#### development

```
npm start
```

#### distribution

```
npm run build
```

**Application will be build into `dist/Coffeebull-darwin-x64/`**

**Just copy/paste `Coffeebull.app` into `/Applications and enjoy**