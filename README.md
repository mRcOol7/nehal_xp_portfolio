# Windows XP Portfolio

A nostalgic recreation of the Windows XP desktop experience, built as an interactive portfolio website. Experience the iconic Bliss wallpaper, draggable windows, and classic XP interface elements right in your browser.

## Overview

This project brings the beloved Windows XP operating system to life as a modern web application. Browse through desktop icons, open applications in resizable windows, and enjoy authentic XP styling with smooth animations and interactions.

## Key Features

**Desktop Experience**
- Fully interactive Windows XP desktop environment
- Classic Bliss wallpaper and authentic visual design
- Desktop icons with hover effects and double-click functionality
- Marquee selection tool for selecting multiple icons

**Window Management**
- Draggable windows with title bars
- Resizable window borders
- Minimize, maximize, and close controls
- Window focus management and layering
- Taskbar with active window indicators

**Applications**
- File Explorer with navigation
- System utilities and tools
- About/Portfolio sections
- Classic Windows XP applications

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd windows-xp-portfolio
npm install
```

## Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |
| `npm run type-check` | Run TypeScript compiler checks |

## Project Organization

```
src/
├── components/
│   └── xp/           # Windows XP UI components
├── windows/          # Application window implementations
├── assets/           # Images, fonts, and static files
├── App.tsx           # Root application component
└── main.tsx          # Application entry point
```

## Browser Support

This project works best in modern browsers with full CSS Grid and Flexbox support. Recommended browsers include Chrome, Firefox, Safari, and Edge.

## Customization

You can customize the portfolio by modifying:
- Desktop icons in the main App component
- Window applications in the `/windows` directory
- Colors and styling via Tailwind configuration
- Background wallpaper in the assets folder

## Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by the iconic Windows XP operating system
- Desktop wallpaper and design elements are recreated for educational purposes
- Thanks to the React and open source community

---

Built with nostalgia and modern web technologies ✨
