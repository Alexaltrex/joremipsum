$(function () {
    let lineDur = 1000; //продолжительность анимации для линии
    let slideDur = 1000; //продолжительность анимации для слайда
    let iLast = $('.home__slider-item:last').index(); // индекс последнего слайда
    //console.log($('.home__slider-item:last').index());

    let iCurr = 0;
    $(`.home__slider-item:eq(${iCurr})`).css('display', 'block');
    let iNext;
    let iPrev;
    let sliderHover = false; //мышь над слайдером
    // нужен для проверки: запускать ли анимацию на Line
    let lineIsAnim = false; // на line есть анимация
    let slideIsAnim = false; // на slide есть анимация

    function nextI(i) {
        return (i < iLast) ? i + 1 : 0;
    }

    function prevI(i) {
        return (i > 0) ? i - 1 : iLast;
    }

    ///////////////////////////////////////////
    ////функция после анимации линии (вправо)//
    ///////////////////////////////////////////
    function afterLineAnimate() {
        // переключение параметра статуса анимации
        lineIsAnim = false;
        console.log(`lineIsAnim = ${lineIsAnim}`);
        // положение Line обнуляется
        $('.home__slider-innerline').css('width', '0');
        // известен iCurr
        // определение iNext
        iNext = nextI(iCurr);
        //console.log(iNext);
        // слайды iCurr и iNext делаются видимыми
        $(`.home__slider-item:eq(${iCurr})`).css('display', 'block');
        $(`.home__slider-item:eq(${iNext})`).css('display', 'block');

        // спозиционировать слайдер-Curr по 0
        $(`.home__slider-item:eq(${iCurr})`).css('left', '0%');
        // спозиционировать слайдер-iNext справо от сладера-iCurr
        $(`.home__slider-item:eq(${iNext})`).css('left', '100%');

        // переключение параметра статуса анимации
        slideIsAnim = true;
        console.log(`slideIsAnim = ${slideIsAnim}`);

        // запустить анимацию сдвига на слайдах iCurr и iNext
        // и в конце этой анимации запустить функцию afterSlideAnimate
        // в которой определяется новый iCurr и запускается анимация на Line
        $(`.home__slider-item:eq(${iCurr})`).animate({
            left: '-100%'
        }, slideDur, afterSlideAnimate);

        $(`.home__slider-item:eq(${iNext})`).animate({
            left: '0%'
        }, slideDur);

    }

    ///////////////////////////////////////////
    ////функция после анимации линии (влево)//
    ///////////////////////////////////////////
    function afterLineAnimateLeft() {
        // переключение параметра статуса анимации
        lineIsAnim = false;
        console.log(`lineIsAnim = ${lineIsAnim}`);
        // положение Line обнуляется
        $('.home__slider-innerline').css('width', '0');
        // известен iCurr
        // определение iNext
        iNext = nextI(iCurr);
        //console.log(iNext);
        // слайды iCurr и iNext делаются видимыми
        $(`.home__slider-item:eq(${iCurr})`).css('display', 'block');
        $(`.home__slider-item:eq(${iNext})`).css('display', 'block');

        // спозиционировать слайдер-Curr по 0
        $(`.home__slider-item:eq(${iCurr})`).css('left', '0%');
        // спозиционировать слайдер-iNext слево от сладера-iCurr
        $(`.home__slider-item:eq(${iNext})`).css('left', '-100%');

        // переключение параметра статуса анимации
        slideIsAnim = true;
        console.log(`slideIsAnim = ${slideIsAnim}`);

        // запустить анимацию сдвига на слайдах iCurr и iNext
        // и в конце этой анимации запустить функцию afterSlideAnimate
        // в которой определяется новый iCurr и запускается анимация на Line
        $(`.home__slider-item:eq(${iCurr})`).animate({
            left: '100%'
        }, slideDur, afterSlideAnimate);

        $(`.home__slider-item:eq(${iNext})`).animate({
            left: '0%'
        }, slideDur);

    }

    ///////////////////////////////////
    ////функция после анимации слайда//
    ///////////////////////////////////
    function afterSlideAnimate() {
        // переключение параметра статуса анимации
        slideIsAnim = false;
        console.log(`slideIsAnim = ${slideIsAnim}`);

        // определяется новый iCurr
        if (iCurr < iLast) {
            iCurr++;
        } else {
            iCurr = 0;
        }
        //запускается анимация на Line
        // переключение параметра статуса анимации
        lineIsAnim = true;
        console.log(`lineIsAnim = ${lineIsAnim}`);
        if (!sliderHover) {
            $('.home__slider-innerline').animate({
                'width': '100%'
            }, lineDur, afterLineAnimate);
        }
    }

    //////////////////////////////////
    // первый запуск анимации линии///
    //////////////////////////////////
    // переключение параметра статуса анимации
    lineIsAnim = true;
    console.log(`lineIsAnim = ${lineIsAnim}`);
    if (!sliderHover) {
        $('.home__slider-innerline').animate({
            'width': '100%'
        }, lineDur, afterLineAnimate);
    }

    /////////////////////////////////////////
    //////// мышка входит на slide/////////
    /////////////////////////////////////////
    $('.home').on('mouseenter', function () {
        sliderHover = true;
        console.log('stop');
        if (lineIsAnim) { // если линия анимирована
            // удалить анимацию на линии
            $('.home__slider-innerline').stop();
            $('.home__slider-innerline').css('width', '0%');
            lineIsAnim = false;
        }

    });
    /////////////////////////////////////////
    //////// мышка уходит из slide/////////
    /////////////////////////////////////////
    $('.home').on('mouseleave', function () {
        sliderHover = false;
        // если вывели мышку после того как ввели ее во время анимации линии
        // или после того как ввели ее во время анимации слайда и она закончилась
        // в этих двух случаях нет анимации слайда

        if (!slideIsAnim) { 
            // тоже что и первый запуск анимации линии
            lineIsAnim = true;
            console.log(`lineIsAnim = ${lineIsAnim}`);
            if (!sliderHover) {
                $('.home__slider-innerline').animate({
                    'width': '100%'
                }, lineDur, afterLineAnimate);
            }
        }

    });

    // клик по правой стрелке
    $('.home__slider-arrow.arrow-right').on('click', function () {
        afterLineAnimate();
    });

    // клик по левой стрелке
    $('.home__slider-arrow.arrow-left').on('click', function () {
        afterLineAnimateLeft();
    });







})