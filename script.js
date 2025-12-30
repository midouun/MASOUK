document.addEventListener('DOMContentLoaded', () => {
    
    // 1. التمرير السلس (Smooth Scroll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement){
                window.scrollTo({
                    top: targetElement.offsetTop - 40, // ترك مسافة صغيرة من الأعلى
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. تظليل القسم المقروء حالياً في القائمة
    const sections = document.querySelectorAll('.section-content');
    const navLinks = document.querySelectorAll('.sidebar nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // إذا تجاوزنا ثلث القسم يعتبر هو النشط
            if (pageYOffset >= (sectionTop - sectionHeight / 4)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
