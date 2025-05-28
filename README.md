# IRES Website

A public-facing website for Incident Response and Emergency Services (IRES), connecting communities with trained emergency responders for rapid assistance in crisis situations.

---

## Project Structure

```
ires-frontend-v1/
├── public/                      # Static assets (favicons, images, etc.)
│   ├── favicon.ico
│   ├── logo.png
│   └── ...
│
├── src/
│   ├── app/                     # Next.js app directory (routing, pages, layouts)
│   │   ├── layout.tsx           # Root layout (providers, global styles, metadata)
│   │   ├── page.tsx             # Home page
│   │   ├── about/               # About page
│   │   ├── contact/             # Contact page
│   │   ├── services/            # Services page
│   │   ├── pricing/             # Pricing page
│   │   └── responders/          # Call for Responders page
│   │
│   ├── components/              # Reusable UI components
│   │   ├── layout/              # Layout components (PublicLayout, etc.)
│   │   └── ...                  # Other shared components
│   │
│   ├── styles/                  # Global styles
│   │   └── globals.css          # Tailwind and custom CSS variables
│   │
│   └── types/                   # TypeScript types (if any)
│
├── .env                         # Environment variables (if needed)
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

---

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/iresorg/ires-frontend-v1.git
   cd ires-frontend-v1
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start the development server**

   ```bash
   yarn dev
   ```

4. **Open your browser**
   - Visit [http://localhost:3000](http://localhost:3000)

---

## Features

- Modern, responsive public website for IRES
- Informational pages: Home, About, Services, Pricing, Contact, Call for Responders
- Accessible, theme-aware (light/dark mode) design
- SEO-friendly metadata and favicon support
- Easy to extend with new pages or sections

---

## Tech Stack

- [Next.js 13+ (App Router)](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-themes](https://github.com/pacocoursey/next-themes) (for dark mode)
- [Heroicons](https://heroicons.com/) (for icons)

---

## Contributing

1. **Fork the repository**
2. **Create your feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes and commit**

   ```bash
   git commit -m "feat: add new section to About page"
   ```

4. **Pull from origin dev before pushing and solve merge conflicts**

    ```bash
    git pull origin dev
    ```

5. **Push to your branch**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**  
   - Use a clear title and description
   - Link related issues if applicable

---

## Branch Naming Convention

- Feature: `feature/short-description`
- Bugfix: `fix/short-description`
- Documentation: `docs/short-description`
- Refactor: `refactor/short-description`

---

## Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

---

## License

This project is licensed under the MIT License.
