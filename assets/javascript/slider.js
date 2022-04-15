$(document).ready(function(){
    $('.image-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      infinite: true,
      autoplaySpeed: 1500,
      prevArrow: '<div class="slick-prev"><i class="ti-angle-left" aria-hidden="true"></i></div>',
      nextArrow: '<div class="slick-next"><i class="ti-angle-right" aria-hidden="true"></i></div>',
      dots: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            dots: true
          }
        },
        {
          breakpoint: 740,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
      ]
    });
}); 
// Slider footer
$(document).ready(function(){
  $('.image-slider1').slick({
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
    prevArrow: '<div class="slick-prev"><i class="ti-angle-left" aria-hidden="true"></i></div>',
    nextArrow: '<div class="slick-next"><i class="ti-angle-right" aria-hidden="true"></i></div>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2000,
        }
      },
      {
        breakpoint: 740,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        }
      },
    ]
  });
}); 