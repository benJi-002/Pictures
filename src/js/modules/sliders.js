const sliders = (slidesSelector, direction, prevSelector, nextSelector) => {
    let slideIdex = 1,
        paused = false;

    const items = document.querySelectorAll(slidesSelector);

    function showSlides(n) {
        if (n > items.length) {
            slideIdex = 1;
        }

        if (n < 1) {
            slideIdex = items.length;
        }

        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });

        items[slideIdex - 1].style.display = 'block';
    };

    showSlides(slideIdex);

    function changeSlides(n) {
        showSlides(slideIdex += n);
    };

    try {
        const prevBtn = document.querySelector(prevSelector),
            nextBtn = document.querySelector(nextSelector);

        prevBtn.addEventListener('click', () => {
            changeSlides(-1);
            items[slideIdex - 1].classList.remove('slideInRight');
            items[slideIdex - 1].classList.add('slideInLeft');
        });

        nextBtn.addEventListener('click', () => {
            changeSlides(1);
            items[slideIdex - 1].classList.remove('slideInLeft');
            items[slideIdex - 1].classList.add('slideInRight');
        });
    } catch(e) {}

    function activateAnimation() {
        if (direction === 'vertical') {
            paused = setInterval(() => {
                changeSlides(1);
                items[slideIdex - 1].classList.add('slideInDown');
            }, 3000);
    
        } else if (direction === 'horizontal') {
            paused = setInterval(() => {
                changeSlides(1);
                items[slideIdex - 1].classList.remove('slideInLeft');
                items[slideIdex - 1].classList.add('slideInRight');
            }, 3000);
        }
    };

    activateAnimation();

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });

    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });
};

export default sliders;