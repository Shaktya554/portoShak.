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

    // 4. Logika Mobile Menu (Hamburger Button)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const hamburgerIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle menu (buka/tutup)
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            
            // Ubah ikon dari garis tiga (bars) menjadi silang (xmark) jika ada
            if (hamburgerIcon) {
                if (hamburgerIcon.classList.contains('fa-bars')) {
                    hamburgerIcon.classList.remove('fa-bars');
                    hamburgerIcon.classList.add('fa-xmark');
                } else {
                    hamburgerIcon.classList.remove('fa-xmark');
                    hamburgerIcon.classList.add('fa-bars');
                }
            }
        });

        // Menutup menu secara otomatis jika salah satu link di dalam menu mobile diklik
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                
                // Kembalikan ikon ke bentuk hamburger
                if (hamburgerIcon) {
                    hamburgerIcon.classList.remove('fa-xmark');
                    hamburgerIcon.classList.add('fa-bars');
                }
            });
        });
    }
});