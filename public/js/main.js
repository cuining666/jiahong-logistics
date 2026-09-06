/* =========================================================
   江苏嘉弘国际货运代理有限公司 · 企业官网 交互脚本
   ========================================================= */
(function () {
  "use strict";

  // 头部滚动阴影
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 移动端导航
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
      });
    });
  }

  // 滚动进场动画
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            // 同一组元素错落出现
            var delay = el.dataset.delay || 0;
            setTimeout(function () {
              el.classList.add("in");
            }, delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  }

  // 联系表单校验与提交反馈（前端演示，无后端）
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var fields = form.querySelectorAll("[data-required]");
      fields.forEach(function (f) {
        var wrap = f.closest(".field");
        if (!f.value.trim()) {
          wrap.classList.add("invalid");
          ok = false;
        } else {
          wrap.classList.remove("invalid");
        }
        // 邮箱格式
        if (f.type === "email" && f.value.trim()) {
          var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!re.test(f.value.trim())) {
            wrap.classList.add("invalid");
            ok = false;
          }
        }
        // 手机号格式（中国）
        if (f.id === "phone" && f.value.trim()) {
          var re2 = /^1[3-9]\d{9}$/;
          if (!re2.test(f.value.trim())) {
            wrap.classList.add("invalid");
            ok = false;
          }
        }
      });

      if (!ok) return;

      var success = document.getElementById("formSuccess");
      if (success) success.classList.add("show");
      form.reset();
      window.scrollTo({ top: success.offsetTop - 120, behavior: "smooth" });
    });
  }

  // 年份
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
