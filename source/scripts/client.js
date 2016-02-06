helpers.tabs({
    parent: 'b-info',
    tab: ['b-info__tab', 'b-info__tab_active'],
    tabParent: 'tab-wrap',
    content: ['b-info__content-item', 'b-info__content-item_active']
});

// helpers.popup($('.h-popup-link'));
// test

// helpers.swiper($('.b-swiper'), {
//     addPrevButton: true,
//     addNextButton: true,
//     addPagination: true,
//     paginationClickable: true,
//     slidesPerView: 'auto',
//     spaceBetween: 50,
//     centeredSlides: false,
//     breakpoints: {
//         1200: {
//             spaceBetween: 100,
//             centeredSlides: true,
//         }
//     }
// });

helpers.owl($('.b-owl'));

helpers.owlTabs($('.b-box__tabs'), $('.b-box__content'));
