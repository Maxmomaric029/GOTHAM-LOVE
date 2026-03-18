document.addEventListener('DOMContentLoaded', async () => {
    const modMenu = document.getElementById('mod-menu');
    const menuHeader = document.getElementById('menu-header');
    const fovRange = document.getElementById('fov-range');
    const fovVal = document.getElementById('fov-val');
    const sensRange = document.getElementById('sens-range');
    const sensVal = document.getElementById('sens-val');
    const speedBtns = document.querySelectorAll('.speed-btn');
    const launchBtn = document.getElementById('launch-game');
    const floatingIcon = document.getElementById('floating-icon');
    const closeBtn = document.querySelector('.close-btn');
    const minimizeBtn = document.querySelector('.minimize-btn');

    // UI Updates
    fovRange.addEventListener('input', (e) => fovVal.textContent = e.target.value);
    sensRange.addEventListener('input', (e) => sensVal.textContent = e.target.value);

    speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            speedBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Capacitor Native Bridge (Mock or Real)
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    // Request Overlay Permission on Start
    const requestPermission = () => {
        if (isAndroid) {
            console.log("Solicitando permiso de superposición...");
            // Este es un fallback simple, en Capacitor real usarías un plugin de Settings
            alert("Por favor, asegúrate de activar 'Mostrar sobre otras aplicaciones' para que el menú no desaparezca.");
        }
    };
    
    requestPermission();

    // Draggable Logic (Browser/WebView)
    let isDragging = false, currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;

    const dragStart = (e) => {
        const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
        initialX = clientX - xOffset;
        initialY = clientY - yOffset;
        if (e.target === menuHeader || e.target.closest('#menu-header') || e.target === floatingIcon) isDragging = true;
    };

    const drag = (e) => {
        if (isDragging) {
            e.preventDefault();
            const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
            currentX = clientX - initialX;
            currentY = clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            const el = (isDragging && !modMenu.classList.contains('hidden')) ? modMenu : floatingIcon;
            el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        }
    };

    const dragEnd = () => isDragging = false;

    window.addEventListener("mousedown", dragStart);
    window.addEventListener("touchstart", dragStart, { passive: false });
    window.addEventListener("mouseup", dragEnd);
    window.addEventListener("touchend", dragEnd);
    window.addEventListener("mousemove", drag);
    window.addEventListener("touchmove", drag, { passive: false });

    // Floating Logic
    const toggleMenu = () => {
        modMenu.classList.toggle('hidden');
        floatingIcon.classList.toggle('hidden');
    };

    minimizeBtn.addEventListener('click', toggleMenu);
    floatingIcon.addEventListener('click', toggleMenu);
    
    closeBtn.addEventListener('click', () => {
        if(confirm('¿Deseas cerrar el Mod Menu por completo?')) {
            modMenu.classList.add('hidden');
            floatingIcon.classList.add('hidden');
        }
    });

    // Launch & Persist
    launchBtn.addEventListener('click', () => {
        launchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ABRIENDO...';
        
        setTimeout(() => {
            launchBtn.innerHTML = '<i class="fab fa-free-code-camp"></i> ABRIR FREE FIRE';
            
            // 1. Convert to Floating Icon
            if (!modMenu.classList.contains('hidden')) toggleMenu();
            
            // 2. Open Game
            window.location.href = 'freefireth://';

            // Nota: Para que persista fuera de la app, el APK debe usar un Servicio de Android.
            // Al inyectar SYSTEM_ALERT_WINDOW en el workflow, Android permitirá que el WebView se mantenga.
        }, 1200);
    });
});
