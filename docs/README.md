# Vue img resize params

## Overview

Plugin helps to add resize params like width, height etc. to image url. Compatible with Vue 3.x.

## Requirements

- Vue 3.x

## Installation

```
npm i -DE vue-img-resize-params
```

## Usage

Directive:
```vue
<img v-img-resize-params="150, 150, 'fit'" :src="img.path" alt="Image description">
```
