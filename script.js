document.addEventListener('DOMContentLoaded', () => {
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

    // Update range values
    fovRange.addEventListener('input', (e) => {
        fovVal.textContent = e.target.value;
    });

    sensRange.addEventListener('input', (e) => {
        sensVal.textContent = e.target.value;
    });

    // Speedy buttons
    speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            speedBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            console.log('Speed set to:', btn.dataset.speed);
        });
    });

    // Draggable Logic
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const dragStart = (e) => {
        let clientX, clientY;
        if (e.type === "touchstart") {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        initialX = clientX - xOffset;
        initialY = clientY - yOffset;

        if (e.target === menuHeader || e.target.closest('#menu-header') || e.target === floatingIcon) {
            isDragging = true;
        }
    };

    const dragEnd = () => {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    };

    const drag = (e) => {
        if (isDragging) {
            e.preventDefault();
            let clientX, clientY;
            if (e.type === "touchmove") {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            currentX = clientX - initialX;
            currentY = clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, isDragging === true && e.target === floatingIcon ? floatingIcon : modMenu);
        }
    };

    const setTranslate = (xPos, yPos, el) => {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    };

    // Event listeners for dragging
    window.addEventListener("mousedown", dragStart);
    window.addEventListener("touchstart", dragStart, { passive: false });
    window.addEventListener("mouseup", dragEnd);
    window.addEventListener("touchend", dragEnd);
    window.addEventListener("mousemove", drag);
    window.addEventListener("touchmove", drag, { passive: false });

    // Minimize / Toggle
    const toggleMenu = () => {
        modMenu.classList.toggle('hidden');
        floatingIcon.classList.toggle('hidden');
        // Reset offsets when toggling to avoid weird jumps
        if (!modMenu.classList.contains('hidden')) {
             // If opening menu, position it centered or near icon
        }
    };

    minimizeBtn.addEventListener('click', toggleMenu);
    floatingIcon.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', () => {
        if(confirm('¿Cerrar Mod Menu?')) {
            window.close(); // Note: might not work in all environments
            modMenu.classList.add('hidden');
        }
    });

    // Launch Game
    launchBtn.addEventListener('click', () => {
        const gameUri = 'freefireth://';
        
        // In a real Android environment with Capacitor:
        // window.location.href = gameUri;
        
        console.log('Launching:', gameUri);
        
        // Notify user
        launchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ABRIENDO...';
        
        setTimeout(() => {
            launchBtn.innerHTML = '<i class="fab fa-free-code-camp"></i> ABRIR FREE FIRE';
            // Switch to floating mode automatically
            if (!modMenu.classList.contains('hidden')) {
                toggleMenu();
            }
            // Trigger the deep link
            window.location.href = gameUri;
        }, 1500);
    });
});
