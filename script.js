gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------------
   helpers
------------------------- */
const qs = (s, ctx = document) => ctx.querySelector(s);
const qsa = (s, ctx = document) => [...ctx.querySelectorAll(s)];

qs("#year").textContent = new Date().getFullYear();

/* -------------------------
   loader / cinematic shutter
------------------------- */
if (!reduceMotion) {
  const intro = gsap.timeline({
    defaults: { ease: "power4.inOut" }
  });

  intro
    .from(".intro__wordmark span", {
      yPercent: 110,
      duration: 0.95,
      stagger: 0.08
    })
    .to(".intro__wordmark", {
      opacity: 0,
      duration: 0.35,
      delay: 0.15
    })
    .to(".intro__panel--top", {
      scaleY: 0,
      duration: 1.05
    }, "-=.05")
    .to(".intro__panel--bottom", {
      scaleY: 0,
      duration: 1.05
    }, "<")
    .from(".hero__title .line > span", {
      yPercent: 115,
      duration: 1.15,
      stagger: 0.12,
      ease: "power4.out"
    }, "-=.55")
    .from(".hero .eyebrow, .hero__descriptor, .circle-link", {
      opacity: 0,
      y: 24,
      duration: 0.75,
      stagger: 0.09
    }, "-=.72");
} else {
  qs(".intro")?.remove();
}

/* -------------------------
   custom cursor
------------------------- */
const cursor = qs(".cursor");
const follower = qs(".cursor-follower");

if (cursor && follower && window.matchMedia("(pointer:fine)").matches) {
  let mouseX = 0, mouseY = 0;
  let fx = 0, fy = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateFollower() {
    fx += (mouseX - fx) * 0.15;
    fy += (mouseY - fy) * 0.15;
    follower.style.transform = `translate(${fx}px, ${fy}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  qsa("a, button, .project__image").forEach((el) => {
    el.addEventListener("mouseenter", () => follower.classList.add("is-hovering"));
    el.addEventListener("mouseleave", () => follower.classList.remove("is-hovering"));
  });
}

/* -------------------------
   mobile menu
------------------------- */
const menuToggle = qs(".menu-toggle");
const nav = qs(".nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

qsa(".nav a").forEach((link) =>
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  })
);

/* -------------------------
   scroll progress
------------------------- */
window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const total = doc.scrollHeight - doc.clientHeight;
  const progress = total > 0 ? (doc.scrollTop / total) * 100 : 0;
  qs(".scroll-progress span").style.height = `${progress}%`;
}, { passive: true });

/* -------------------------
   hero parallax
------------------------- */
if (!reduceMotion) {
  gsap.to(".hero__media img", {
    yPercent: 12,
    scale: 1.12,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to(".hero__title", {
    yPercent: 26,
    opacity: 0.12,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom 35%",
      scrub: true
    }
  });
}

/* -------------------------
   heading reveals
------------------------- */
if (!reduceMotion) {
  qsa(".section-heading, .stats__copy, .contact__content").forEach((section) => {
    gsap.from(section.children, {
      opacity: 0,
      y: 42,
      duration: 0.9,
      stagger: 0.09,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        once: true
      }
    });
  });
}

/* -------------------------
   image curtain reveals
------------------------- */
if (!reduceMotion) {
  qsa(".image-reveal").forEach((wrap) => {
    const overlay = getComputedStyle(wrap, "::after");

    gsap.to(wrap, {
      scrollTrigger: {
        trigger: wrap,
        start: "top 82%",
        once: true,
        onEnter: () => wrap.classList.add("is-visible")
      }
    });

    // pseudo elements can't be directly animated, so use a CSS var
    wrap.style.setProperty("--reveal", "1");
  });

  // animate via injected overlay child for full browser reliability
  qsa(".image-reveal").forEach((wrap) => {
    const curtain = document.createElement("span");
    curtain.className = "js-curtain";
    Object.assign(curtain.style, {
      position: "absolute",
      inset: "0",
      zIndex: "4",
      background: "#0b0b0b",
      transformOrigin: "top",
      pointerEvents: "none"
    });
    wrap.appendChild(curtain);

    gsap.to(curtain, {
      scaleY: 0,
      duration: 1.05,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: wrap,
        start: "top 83%",
        once: true
      }
    });

    const img = qs("img", wrap);
    if (img) {
      gsap.from(img, {
        scale: 1.12,
        duration: 1.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrap,
          start: "top 83%",
          once: true
        }
      });
    }
  });
}

/* Hide CSS pseudo-curtain once JS is active */
document.documentElement.classList.add("js");
const style = document.createElement("style");
style.textContent = `.js .image-reveal::after{display:none}`;
document.head.appendChild(style);

/* -------------------------
   horizontal runway scroll
------------------------- */
if (!reduceMotion) {
  const runway = qs(".runway");
  const track = qs(".runway__track");

  function runwayDistance() {
    const sticky = qs(".runway__sticky");
    const introWidth = window.innerWidth > 900 ? window.innerWidth * 0.28 : 0;
    return Math.max(0, track.scrollWidth - (window.innerWidth - introWidth) + 80);
  }

  gsap.to(track, {
    x: () => -runwayDistance(),
    ease: "none",
    scrollTrigger: {
      trigger: runway,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      invalidateOnRefresh: true
    }
  });

  qsa(".runway-card__image img").forEach((img) => {
    gsap.fromTo(img,
      { xPercent: -5 },
      {
        xPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          containerAnimation: undefined,
          start: "left right",
          end: "right left",
          scrub: true
        }
      }
    );
  });
}

/* -------------------------
   magnetic buttons
------------------------- */
if (window.matchMedia("(pointer:fine)").matches && !reduceMotion) {
  qsa(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);

      gsap.to(el, {
        x: x * 0.16,
        y: y * 0.16,
        duration: 0.35,
        ease: "power2.out"
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "elastic.out(1, .35)"
      });
    });
  });
}

/* -------------------------
   contact background zoom
------------------------- */
if (!reduceMotion) {
  gsap.fromTo(".contact__bg img",
    { scale: 1.03 },
    {
      scale: 1.15,
      ease: "none",
      scrollTrigger: {
        trigger: ".contact",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true
      }
    }
  );
}
