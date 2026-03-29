<div align="center">
  <h1>dextora-anim by Dextora</h1>
  <p><strong>Animate with just HTML — a Dextora open source tool</strong></p>

[![npm version](https://img.shields.io/npm/v/data-anim.svg?style=for-the-badge&labelColor=000000&color=4F8EF7)](https://www.npmjs.com/package/data-anim)
[![gzip size](https://img.shields.io/bundlephobia/minzip/data-anim?style=for-the-badge&labelColor=000000&label=gzip&color=4F8EF7)](https://bundlephobia.com/package/data-anim)
[![License](https://img.shields.io/npm/l/data-anim.svg?style=for-the-badge&labelColor=000000&color=4F8EF7)](https://github.com/Dityasaran/dextora-dextora-anim/blob/main/LICENSE)

</div>

## About

**dextora-anim** is a drop-in scroll animation library by [Dextora](https://github.com/Dityasaran). Add a `<script>` tag, write data attributes, and your HTML comes alive. Under 3KB gzipped with 30+ animations, 4 triggers, and built-in anti-FOUC protection.

## Getting Started

### CDN (Recommended)

```html
<script src="https://unpkg.com/data-anim/dist/data-anim.min.js"></script>
```

### npm

```bash
npm install data-anim
```

```js
import 'data-anim';
```

### Usage

```html
<h1 data-anim="fadeInUp">Hello from Dextora</h1>
<div data-anim="zoomIn" data-anim-delay="200">Smooth entrance</div>
<p data-anim="slideInRight" data-anim-duration="600">Slide right in</p>
```

## Animation Library

| Category   | Animations |
|------------|------------|
| Fade       | fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight |
| Zoom       | zoomIn, zoomInUp, zoomInDown, zoomInLeft, zoomInRight |
| Slide      | slideInUp, slideInDown, slideInLeft, slideInRight |
| Bounce     | bounceIn, bounceInUp, bounceInDown, bounceInLeft, bounceInRight |
| Flip       | flipX, flipY |
| Attention  | pulse, shake, wobble, swing |
| Special    | lightSpeedIn, rollIn, jackInTheBox |

## Features

- ⚡ **Zero dependencies** — pure vanilla JS
- 📦 **Under 3KB gzipped** — no bloat
- 🎨 **30+ animations** — all via data attributes
- 🔁 **4 trigger modes** — scroll, hover, click, load
- 🛡️ **Anti-FOUC** — elements stay hidden until the library loads
- ✅ **No build step** — just drop in a `<script>` tag

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a PR.

## License

[MIT](LICENSE) © 2025 Dextora
