# Maximista Mod Menu APK (GitHub Actions)

Este proyecto crea un APK de "Mod Menu" premium con un diseño "Maximista", usando HTML, CSS, y JavaScript, envuelto en **Capacitor**.

## Características
- **Aimbot**: Neck, Lock, Silent Aim.
- **FOV**: Deslizador personalizable (0-360°).
- **Speedy**: Modos x1, fix, x2.
- **Sensibilidad**: Ajuste de 1% a 200%.
- **Launch Game**: Botón para abrir Free Fire (`freefireth://`).
- **Menu Draggable**: Se minimiza a un icono flotante al abrir el juego.

## Instrucciones para Generar el APK
1. Sube este código a un repositorio en **GitHub**.
2. Ve a la pestaña **Actions** en tu repositorio.
3. El workflow "Build Mod Menu APK" se activará automáticamente al hacer push a `main`.
4. Una vez terminado, descarga el **Artifact** llamado `maximista-mod-menu-debug`.

## Notas Técnicas
- **Superposición (Overlay)**: El menú tiene lógica de arrastre (draggable) incorporada. Para que funcione *sobre* otras aplicaciones en Android, el APK generado solicita el permiso `SYSTEM_ALERT_WINDOW`.
- **Deep Link**: El botón "Abrir Free Fire" usa el esquema `freefireth://`.

## Estructura del Proyecto
- `index.html`: Estructura del menú.
- `style.css`: Diseño premium neon/glassmorphism.
- `script.js`: Lógica de controles y movimiento.
- `.github/workflows/`: Configuración de construcción automática.
