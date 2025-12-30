document.addEventListener('DOMContentLoaded', () => {
    
    // 1. تفعيل التمرير السلس عند النقر على الروابط
    const links = document.querySelectorAll('.sidebar nav a');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });

    // 2. تظليل الرابط النشط أثناء التمرير (Active State on Scroll)
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
