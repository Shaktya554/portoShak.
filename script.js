document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Inisialisasi AOS (Animasi Scroll)
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    // 2. Animasi Progress Bar pada bagian Keahlian
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        observer.observe(skillsContainer);
    }

    // 3. Efek Typewriter pada Hero Section
    const textArray = ["Frontend Developer", "UI/UX Designer", "Graphic Designer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeTarget = document.getElementById("typewriter");

    function typeEffect() {
        if (!typeTarget) return; // Mencegah error jika elemen tidak ditemukan

        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typeTarget.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeTarget.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Jeda sebelum teks mulai dihapus
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500; // Jeda sebelum mengetik kata selanjutnya
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    // Memulai efek typewriter dengan delay 1 detik setelah halaman dimuat
    setTimeout(typeEffect, 1000);
});