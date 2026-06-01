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

  function mobileNavToogle() {
    document.body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  document.querySelectorAll('.navmenu .dropdown > a').forEach(dropdownLink => {
    dropdownLink.addEventListener('click', function(e) {
      if (window.innerWidth < 1200) {
        e.preventDefault();
        e.stopImmediatePropagation();

        const parentLi = this.closest('.dropdown');
        const submenu = parentLi.querySelector(':scope > ul');

        parentLi.classList.toggle('active');

        if (submenu) {
          submenu.classList.toggle('dropdown-active');
        }
      }
    });
  });

  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', function(e) {
      if (window.innerWidth < 1200) {
        const isDropdownParent = this.closest('.dropdown') && this.parentElement.classList.contains('dropdown');

        if (isDropdownParent) {
          return;
        }

        if (document.body.classList.contains('mobile-nav-active')) {
          mobileNavToogle();
        }
      }
    });
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) {
        let path = window.location.pathname;
        let page = path.split("/").pop();
        if (page === "" && navmenulink.getAttribute('href') === "index.html") {
          navmenulink.classList.add('active');
        } else if (navmenulink.getAttribute('href') === page) {
          navmenulink.classList.add('active');
          // If in a dropdown, make the parent active too
          let dropdown = navmenulink.closest('.dropdown');
          if (dropdown) {
            dropdown.querySelector('a').classList.add('active');
          }
        } else {
          navmenulink.classList.remove('active');
        }
        return;
      }
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

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