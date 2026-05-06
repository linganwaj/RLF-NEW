/**
* Template Name: ZenBlog
* Template URL: https://bootstrapmade.com/zenblog-bootstrap-blog-template/
* Updated: Aug 08 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  if (mobileNavToggleBtn) {
    function mobileNavToogle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        if (typeof mobileNavToogle === 'function') mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Donation Logic
   */
  const amountButtons = document.querySelectorAll('.btn-amount');
  const customAmountInput = document.getElementById('custom-donation-amount');
  const donateSubmitBtn = document.querySelector('.donate-submit-btn');

  amountButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      amountButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      customAmountInput.value = ''; // Clear custom amount if preset is selected
    });
  });

  customAmountInput.addEventListener('input', function() {
    if (this.value) {
      amountButtons.forEach(b => b.classList.remove('active'));
    }
  });

  if (donateSubmitBtn) {
    donateSubmitBtn.addEventListener('click', function() {
      const selectedBtn = document.querySelector('.btn-amount.active');
      const amount = selectedBtn ? selectedBtn.getAttribute('data-amount') : customAmountInput.value;
      const program = document.getElementById('donate-program').value;
      const freq = document.querySelector('input[name="freq"]:checked').id;

      if (!amount || amount <= 0) {
        alert('Please select or enter a valid donation amount.');
        return;
      }

      // Simulate submission
      this.innerHTML = '<i class="bi bi-hourglass-split me-2"></i> Processing...';
      this.disabled = true;

      setTimeout(() => {
        alert(`Thank you for your ${freq} donation of $${amount} to support ${program === 'Where it\'s needed most' ? 'our mission' : 'the ' + program + ' program'}! \n\nThis is a demonstration. In a live site, you would be redirected to a payment gateway.`);
        this.innerHTML = '<i class="bi bi-heart-fill me-2"></i> Proceed to Donate';
        this.disabled = false;
      }, 2000);
    });
  }

})();