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

  // 联系表单：校验 + 通过 Formspree 真实提交
  // 表单 ID 的唯一来源是 contact.astro 中 <form> 的 action 属性，
  // 注册 formspree.io 并把生成的 ID 填入该 action 即可（无需改本文件）。

  // 中英文提示文案（根据 <html lang> 自动切换）
  var isEn = (document.documentElement.lang || "").toLowerCase().indexOf("en") === 0;
  var MSG = isEn
    ? {
        configuring:
          "Form not configured: sign up at formspree.io, verify X_kenny@yeah.net, then paste your form ID into the form's action in contact.astro.",
        failed: "Submission failed. Please retry later or call +86 18013613114.",
        network: "Network error — submission failed. Please retry or call +86 18013613114.",
        submitting: "Submitting…",
        sep: "; ",
      }
    : {
        configuring:
          "表单尚未配置：请前往 formspree.io 免费注册，验证邮箱 X_kenny@yeah.net 后，将生成的表单 ID 填入 src/pages/contact.astro 中 <form> 的 action 属性（替换 YOUR_FORM_ID）。",
        failed: "提交失败，请稍后重试或直接致电 +86 18013613114。",
        network: "网络异常，提交未成功。请检查网络后重试，或直接致电 +86 18013613114。",
        submitting: "提交中…",
        sep: "；",
      };

  var form = document.getElementById("contactForm");
  if (form) {
    var submitBtn = document.getElementById("submitBtn");
    var successBox = document.getElementById("formSuccess");
    var errorBox = document.getElementById("formError");

    function showError(msg) {
      if (errorBox) {
        errorBox.textContent = msg;
        errorBox.classList.add("show");
      }
      if (successBox) successBox.classList.remove("show");
      if (errorBox) errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    function showSuccess() {
      if (successBox) successBox.classList.add("show");
      if (errorBox) errorBox.classList.remove("show");
      form.reset();
      if (successBox) window.scrollTo({ top: successBox.offsetTop - 120, behavior: "smooth" });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (errorBox) errorBox.classList.remove("show");

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

      // 尚未配置 Formspree：提示先注册并填入表单 ID（在 contact.astro 的 action 中）
      var endpoint = form.getAttribute("action") || "";
      if (!endpoint || endpoint.indexOf("YOUR_FORM_ID") !== -1) {
        showError(MSG.configuring);
        return;
      }

      // 真实提交到 Formspree
      var originalText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = MSG.submitting;
      }

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (res.ok) {
            showSuccess();
          } else {
            return res.json().then(function (data) {
              var msg = data && data.errors
                ? data.errors.map(function (x) { return x.message; }).join(MSG.sep)
                : MSG.failed;
              showError("✗ " + msg);
            }, function () {
              showError("✗ " + MSG.failed);
            });
          }
        })
        .catch(function () {
          showError("✗ " + MSG.network);
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        });
    });
  }

  // 年份
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
