# Página personal – Ivan O. Rios Maieru

Sitio de presentación profesional: experiencia, educación, certificaciones y contacto. Pensado para desplegarse en **GitHub Pages**.

## Contenido

- **Inicio**: rol, ubicación y enlaces rápidos
- **Sobre mí**: resumen profesional y valores
- **Experiencia**: trayectoria laboral
- **Educación**: formación académica
- **Certificaciones**: cursos y certificados
- **Habilidades**: tecnologías y herramientas
- **Contacto**: email y LinkedIn

## Estructura del proyecto

```
personal-page/
├── index.html      # Página principal
├── styles.css      # Estilos
├── script.js       # Menú móvil y año en el footer
├── ivan.png        # Foto de perfil
├── CV Ivan Rios Maieru.pdf  # Curriculum descargable
├── .github/workflows/pages.yml  # Workflow para GitHub Pages
└── README.md
```

## Despliegue en GitHub Pages

1. **Crear un repositorio** en GitHub (por ejemplo `personal-page`).

2. **Subir el código** a la rama `main`:

   ```bash
   git init
   git add .
   git commit -m "Página personal inicial"
   git remote add origin https://github.com/Iormaieru/personal-page.git
   git push -u origin main
   ```

3. **Activar GitHub Pages**:
   - Ve a **Settings → Pages** del repositorio.
   - En "Build and deployment", elige **GitHub Actions** como fuente.

4. **Workflow**: en cada push a `main`, el workflow `.github/workflows/pages.yml` genera la carpeta `public` con los archivos del sitio y los despliega.

5. **URL del sitio**: una vez desplegado, la página estará en:

   ```
   https://iormaieru.github.io/personal-page/
   ```

   (o el dominio que tengas configurado en **Settings → Pages**).

## Requisitos

- Repositorio en GitHub
- GitHub Pages con fuente **GitHub Actions** (no "Deploy from a branch")

## Desarrollo local

Abrir `index.html` en el navegador o usar un servidor local:

```bash
python3 -m http.server 8000
# o
npx serve .
```

Luego ir a `http://localhost:8000`.

---

© Ivan O. Rios Maieru
