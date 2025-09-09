// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    // Переключение мобильного меню
    burger.addEventListener('click', function() {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('burger-active');
    });

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('nav-active');
            burger.classList.remove('burger-active');
        });
    });

    // Плавная прокрутка к секциям
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Изменение прозрачности хедера при прокрутке
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.backgroundColor = '#fff';
        }
    });

    // Обработка формы обратной связи
    const contactForm = document.querySelector('.contact-form form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получение данных формы
        const formData = new FormData(this);
        const name = this.querySelector('input[placeholder="Имя ребенка"]').value;
        const parentName = this.querySelector('input[placeholder="Ваше имя"]').value;
        const phone = this.querySelector('input[placeholder="Телефон"]').value;
        const email = this.querySelector('input[placeholder="Email"]').value;
        const program = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;

        // Простая валидация
        if (!name || !parentName || !phone) {
            alert('Пожалуйста, заполните обязательные поля: имя ребенка, ваше имя и телефон');
            return;
        }

        // Имитация отправки формы
        alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });

    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Наблюдение за элементами для анимации
    const animatedElements = document.querySelectorAll('.about-item, .program-card, .gallery-item');
    animatedElements.forEach(el => observer.observe(el));

    // Галерея - простой лайтбокс
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Здесь можно добавить функционал лайтбокса
            console.log('Открытие изображения в лайтбоксе');
        });
    });

    // Кнопка "Наверх"
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #ff6b6b;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollTopBtn);

    // Показ/скрытие кнопки "Наверх"
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    // Прокрутка наверх
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Валидация телефона
    const phoneInput = document.querySelector('input[placeholder="Телефон"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 1) {
                    value = '+7';
                } else if (value.length <= 4) {
                    value = '+7 (' + value.substring(1);
                } else if (value.length <= 7) {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4);
                } else if (value.length <= 9) {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7);
                } else {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
                }
            }
            e.target.value = value;
        });
    }
});

// Дополнительные CSS стили для мобильного меню
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: white;
            transition: right 0.3s ease;
            z-index: 999;
        }
        
        .nav-active {
            right: 0;
        }
        
        .nav-list {
            flex-direction: column;
            padding: 50px 20px;
            gap: 20px;
        }
        
        .burger-active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .burger-active span:nth-child(2) {
            opacity: 0;
        }
        
        .burger-active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);