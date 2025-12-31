document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================================
    // 1. تحديد الصفحة النشطة في القائمة الجانبية تلقائياً
    // ============================================================
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        // إزالة الكلاس النشط من الجميع
        link.classList.remove('active');
        // التحقق من الرابط ومطابقته للصفحة الحالية
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // ============================================================
    // 2. شريط تقدم القراءة (Reading Progress Bar)
    // ============================================================
    // إنشاء عنصر الشريط وإضافته للصفحة
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // ============================================================
    // 3. تأثير ظهور ناعم للمحتوى (Fade In Animation)
    // ============================================================
    const paperContent = document.querySelector('.paper-content');
    if(paperContent) {
        paperContent.style.opacity = '0';
        paperContent.style.transform = 'translateY(30px)';
        paperContent.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        
        // تأخير بسيط لضمان تحميل العناصر
        setTimeout(() => {
            paperContent.style.opacity = '1';
            paperContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // ============================================================
    // 4. زر الصعود للأعلى (Back to Top)
    // ============================================================
    const toTopBtn = document.createElement('button');
    toTopBtn.innerHTML = '⬆';
    toTopBtn.className = 'back-to-top';
    toTopBtn.title = 'العودة للأعلى';
    document.body.appendChild(toTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            toTopBtn.classList.add('show');
        } else {
            toTopBtn.classList.remove('show');
        }
    });

    toTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================================
    // 5. أدوات التحكم في حجم الخط (Font Size Control)
    // ============================================================
    // إنشاء اللوحة العائمة
    const fontControls = document.createElement('div');
    fontControls.className = 'font-controls';
    fontControls.innerHTML = `
        <button id="increaseFont" title="تكبير الخط">A+</button>
        <button id="resetFont" title="حجم افتراضي">A</button>
        <button id="decreaseFont" title="تصغير الخط">A-</button>
    `;
    document.body.appendChild(fontControls);

    const contentArea = document.querySelector('.paper-content');
    let currentFontSize = 19; // الحجم الافتراضي كما في CSS

    document.getElementById('increaseFont').addEventListener('click', () => {
        if(currentFontSize < 26) {
            currentFontSize += 1;
            contentArea.style.fontSize = currentFontSize + 'px';
        }
    });

    document.getElementById('decreaseFont').addEventListener('click', () => {
        if(currentFontSize > 14) {
            currentFontSize -= 1;
            contentArea.style.fontSize = currentFontSize + 'px';
        }
    });

    document.getElementById('resetFont').addEventListener('click', () => {
        currentFontSize = 19;
        contentArea.style.fontSize = '19px';
    });

    // ============================================================
    // 6. التنقل عبر لوحة المفاتيح (Keyboard Navigation)
    // ============================================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            // البحث عن زر الصفحة التالية
            const nextBtn = document.querySelector('.pagination .btn:last-child');
            if (nextBtn && nextBtn.innerText.includes('⬅')) {
                nextBtn.click();
            }
        } else if (e.key === 'ArrowRight') {
            // البحث عن زر الصفحة السابقة
            const prevBtn = document.querySelector('.pagination .btn:first-child');
            if (prevBtn && prevBtn.innerText.includes('➡')) {
                prevBtn.click();
            }
        }
    });
});
