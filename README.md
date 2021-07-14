# Vue img resize params

## Overview

Plugin helps to add resize params like width, height etc. to image url. Compatible with Vue 3.x.
NOTE:
Plugin doesn't resize image. Plugin only helps to format url to resize server with comfortable way.

## Requirements

- Vue 3.x

## Installation

```
npm i -DE vue-img-resize-params
```

## Usage
Just pass pattern of img resize params replacement 

**Global**
```javascript
// app.js
createApp(Global)
  .use(VueImgResizeParamsPlugin, {
      url: 'https://resizer.ru/resizer:imgPath?:imgQuery&width=:width&height=:height',
  })
  .mount('#global');
```

```vue
<template>
  <!-- In component -->
  <img v-img-resize-params="{ width: 200, height: 300, }" src="/path/to/img?test-param=1" alt="Img description">
</template>
```

**or local**

```vue
<template>
  <!-- In component -->
  <img v-img-resize-params="{ width: 200, height: 300, options: { url: 'https://resizer.ru/resizer:imgPath?:imgQuery&width=:width&height=:height' }}" src="/path/to/img?test-param=1" alt="Img description">
</template>
```

**result:**
```html
<img src="http://resizer.loc:8090/resizer/path/to/img?test-param=1&width=300&height=300" alt="Img description">
```

## Picture tag support
```vue
<template>
  <picture>
    <source v-img-resize-params="{ width: 50, height: 50 }" srcset="/path/to/img?test-param=1" media="(min-width: 600px)">
    <img v-img-resize-params="{ width: 200, height: 300 }" src="/path/to/img?test-param=1" alt="Img description"> 
  </picture>
</template>
```

**result:**
```html
<picture>
  <source srcset="https://resizer.ru/resizer/path/to/img?test-param=1&width=50&height=50" media="(min-width: 600px)">
  <img src="https://resizer.ru/resizer/path/to/img?test-param=1&width=300&height=300" alt="Img description"> 
</picture>
```

## Replace params

| Param         | Description           |
| ------------- |:---------------------:|
| :imgPath      | Path from img src     |
| :imgQuery     | Query from img src    |
| :width        | Width from directive  |
| :height       | Height from directive |
