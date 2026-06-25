document.addEventListener("DOMContentLoaded", () => {
    
    // --- CONTROL DE PÁGINAS (FLUJO INTERACTIVO) ---
    const triggerStart = document.getElementById("start-trigger");
    const nextButtons = document.querySelectorAll(".btn-next");
    const backButtons = document.querySelectorAll(".btn-back");

    // Portada -> Clic en Corazón Central
    triggerStart.addEventListener("click", () => {
        changeScreen(2);
        // Intentar reproducir música automáticamente tras la primera interacción
        playMusic();
    });

    // Eventos para botones NEXT
    nextButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetScreen = btn.getAttribute("data-next");
            changeScreen(targetScreen);
        });
    });

    // Eventos para botones BACK
    backButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetScreen = btn.getAttribute("data-back");
            changeScreen(targetScreen);
        });
    });

    // Función Central de Transición de Pantallas
    function changeScreen(screenNumber) {
        document.querySelectorAll(".screen").forEach(screen => {
            screen.classList.remove("active");
        });
        
        const nextActive = document.getElementById(`screen-${screenNumber}`);
        nextActive.classList.add("active");

        // Disparar la máquina de escribir si llega a la pantalla final (Pantalla 5)
        if(parseInt(screenNumber) === 5) {
            startTypewriterEffect();
        }
    }

    // --- GENERACIÓN DEL CALENDARIO (SEPTIEMBRE) ---
    const calendarGrid = document.getElementById("calendar-days");
    if(calendarGrid) {
        // Creamos los 30 días de Septiembre
        for(let dayNum = 1; dayNum <= 30; dayNum++) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("calendar-day");
            dayElement.innerText = dayNum;

            // Marcamos el aniversario (Día 25)
            if(dayNum === 25) {
                dayElement.classList.add("active-day");
            }
            calendarGrid.appendChild(dayElement);
        }
    }

    // --- EFECTO INTERACTIVO DE LA CARTA ---
    const envelope = document.getElementById("envelope");
    if(envelope) {
        envelope.addEventListener("click", () => {
            envelope.classList.toggle("open");
        });
    }

    // --- MÁQUINA DE ESCRIBIR (PANTALLA FIN) ---
    const finalPhrase = "Mi amor no necesita razones, pero estas s..."; // Ajusta tu texto real aquí
    let charIndex = 0;
    let typewriterTimeout;

    function startTypewriterEffect() {
        const textContainer = document.getElementById("typewriter-text");
        textContainer.innerText = "";
        charIndex = 0;
        clearTimeout(typewriterTimeout);

        function type() {
            if (charIndex < finalPhrase.length) {
                textContainer.innerText += finalPhrase.charAt(charIndex);
                charIndex++;
                typewriterTimeout = setTimeout(type, 110); // Velocidad al escribir
            }
        }
        type();
    }

    // --- SISTEMA DE AUDIO FLOTANTE ---
    const musicBtn = document.getElementById("music-btn");
    const bgAudio = document.getElementById("bg-audio");

    musicBtn.addEventListener("click", () => {
        if (bgAudio.paused) {
            playMusic();
        } else {
            bgAudio.pause();
            musicBtn.classList.remove("playing");
        }
    });

    function playMusic() {
        bgAudio.play().then(() => {
            musicBtn.classList.add("playing");
        }).catch(err => {
            console.log("La reproducción automática requiere interacción previa del usuario.");
        });
    }

    // --- GENERADOR DE PÉTALOS DE ROSAS CAYENDO ---
    const petalsBox = document.getElementById("petals");

    function generatePetal() {
        const petal = document.createElement("div");
        petal.classList.add("petal");
        
        // Atributos aleatorios para naturalidad
        petal.style.left = Math.random() * 100 + "vw";
        const scaleSize = Math.random() * 12 + 8; // tamaños variados
        petal.style.width = `${scaleSize}px`;
        petal.style.height = `${scaleSize}px`;
        
        petal.style.animationDuration = Math.random() * 3 + 3.5 + "s"; // velocidad de caída
        
        petalsBox.appendChild(petal);

        // Remover del documento al finalizar la animación
        setTimeout(() => {
            petal.remove();
        }, 6000);
    }

    // Crea un pétalo nuevo cada 350 milisegundos
    setInterval(generatePetal, 350);
});