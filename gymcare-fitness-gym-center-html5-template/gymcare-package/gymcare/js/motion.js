(function () {
    "use strict";

    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || typeof IntersectionObserver === "undefined") {
        return;
    }

    var preloadedPrograms = false;
    var programsRoot = document.querySelector(".section-programs");

    function preloadProgramImages() {
        if (preloadedPrograms) return;
        preloadedPrograms = true;
        var items = document.querySelectorAll(".programs-item[data-img]");
        items.forEach(function (item) {
            var src = item.getAttribute("data-img");
            if (src) {
                var img = new Image();
                img.src = src;
            }
        });
    }

    function animateCounter(el) {
        if (el.dataset.counted === "1") return;
        el.dataset.counted = "1";

        var suffix = el.dataset.suffix || "";
        var prefix = el.dataset.prefix || "";
        var useComma = el.dataset.format === "comma";
        var duration = 800;
        var startTime = performance.now();

        if (el.dataset.rangeA && el.dataset.rangeB) {
            var targetA = parseInt(el.dataset.rangeA, 10);
            var targetB = parseInt(el.dataset.rangeB, 10);

            function stepRange(now) {
                var t = Math.min((now - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - t, 3);
                var a = Math.round(targetA * eased);
                var b = Math.round(targetB * eased);
                el.textContent = a + "-" + b + suffix;
                if (t < 1) {
                    requestAnimationFrame(stepRange);
                } else {
                    el.textContent = targetA + "-" + targetB + suffix;
                }
            }
            requestAnimationFrame(stepRange);
            return;
        }

        var target = parseFloat(el.dataset.countTo || "0");

        function formatNum(val) {
            var rounded = Math.round(val);
            return useComma ? rounded.toLocaleString("en-US") : String(rounded);
        }

        function stepCount(now) {
            var t = Math.min((now - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - t, 3);
            el.textContent = prefix + formatNum(target * eased) + suffix;
            if (t < 1) {
                requestAnimationFrame(stepCount);
            } else {
                el.textContent = prefix + formatNum(target) + suffix;
            }
        }
        requestAnimationFrame(stepCount);
    }

    function initMotion() {
        var revealGroups = [
            ".section-programs .programs-item",
            ".section-works .box-work, .section-works .box-step",
            ".section-pricing-package .pricing-item",
            ".section-client-testimonials .testimonial-card",
            ".section-portfolio .result-card",
            ".section-news-2 .blog-card, .grid-blog .blog-card",
            ".section-value .p-30",
            ".section-fitness-courses .service-card"
        ];

        var vh = window.innerHeight || 900;
        var revealTargets = [];

        revealGroups.forEach(function (selector) {
            var nodes = document.querySelectorAll(selector);
            nodes.forEach(function (node, idx) {
                node.setAttribute("data-reveal", "");
                node.style.setProperty("--mam-stagger", String(idx % 5));
                var rect = node.getBoundingClientRect();
                if (rect.top <= vh * 0.95) {
                    node.classList.add("is-visible");
                } else {
                    revealTargets.push(node);
                }
            });
        });

        var counterTargets = Array.prototype.slice.call(
            document.querySelectorAll("[data-count-to], [data-range-a]")
        );

        document.documentElement.classList.add("js-motion");

        var sharedObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    var target = entry.target;

                    if (target === programsRoot) {
                        preloadProgramImages();
                        observer.unobserve(target);
                        return;
                    }

                    if (target.hasAttribute("data-reveal")) {
                        target.classList.add("is-visible");
                        observer.unobserve(target);
                    }

                    if (target.hasAttribute("data-count-to") || target.hasAttribute("data-range-a")) {
                        animateCounter(target);
                        observer.unobserve(target);
                    }
                });
            },
            {
                rootMargin: "120px 0px -30px 0px",
                threshold: 0.08
            }
        );

        if (programsRoot) {
            sharedObserver.observe(programsRoot);
        }

        revealTargets.forEach(function (el) {
            sharedObserver.observe(el);
        });

        counterTargets.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top <= vh * 0.95 && rect.bottom >= 0) {
                animateCounter(el);
            } else {
                sharedObserver.observe(el);
            }
        });

        var fineDesktop = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 992px)").matches;
        var worksSection = document.querySelector(".section-works");
        var wfRail = document.querySelector(".mam-workflow-rail");
        var wfLine = document.querySelector(".mam-wf-line");
        var wfNodes = wfRail ? Array.prototype.slice.call(wfRail.querySelectorAll(".mam-wf-node")) : [];
        if (wfRail && wfLine) {
            wfRail.classList.add("is-wired");
        }

        var heroSection = document.querySelector(".section-hero-3");
        var heroImg = fineDesktop && heroSection ? heroSection.querySelector(".image img") : null;

        var scrollTick = false;

        function updateScrollEffects(viewHeight) {
            if (wfRail && wfLine && worksSection) {
                var wRect = worksSection.getBoundingClientRect();
                var span = Math.max(wRect.height * 0.58, 220);
                var progress = Math.max(0, Math.min(1, (viewHeight * 0.88 - wRect.top) / span));
                wfLine.style.strokeDashoffset = (880 * (1 - progress)).toFixed(1);
                wfNodes.forEach(function (node, idx) {
                    var threshold = idx * 0.22;
                    node.classList.toggle("is-lit", progress >= threshold);
                });
            }

            if (heroImg && heroSection) {
                var hRect = heroSection.getBoundingClientRect();
                if (hRect.bottom > 0 && hRect.top < viewHeight) {
                    var ratio = Math.max(0, Math.min(1, -hRect.top / Math.max(hRect.height, 400)));
                    heroImg.style.setProperty("--mam-hsy", (-ratio * 14).toFixed(1) + "px");
                }
            }
        }

        function sweepAboveFoldOrPassed() {
            scrollTick = false;
            var viewHeight = window.innerHeight || 900;
            var viewThreshold = viewHeight * 0.98;
            var remaining = 0;

            revealTargets.forEach(function (el) {
                if (el.classList.contains("is-visible")) return;
                if (el.getBoundingClientRect().top <= viewThreshold) {
                    el.classList.add("is-visible");
                    sharedObserver.unobserve(el);
                } else {
                    remaining++;
                }
            });

            counterTargets.forEach(function (el) {
                if (el.dataset.counted === "1") return;
                if (el.getBoundingClientRect().top <= viewThreshold) {
                    animateCounter(el);
                    sharedObserver.unobserve(el);
                } else {
                    remaining++;
                }
            });

            updateScrollEffects(viewHeight);

            if (remaining === 0 && !wfRail && !heroImg) {
                window.removeEventListener("scroll", scheduleSweep);
            }
        }

        function scheduleSweep() {
            if (!scrollTick) {
                scrollTick = true;
                requestAnimationFrame(sweepAboveFoldOrPassed);
            }
        }

        window.addEventListener("scroll", scheduleSweep, { passive: true });
        window.addEventListener("hashchange", scheduleSweep, { passive: true });
        sweepAboveFoldOrPassed();

        if (worksSection && wfNodes.length) {
            var workSteps = Array.prototype.slice.call(worksSection.querySelectorAll(".box-work, .box-step"));
            workSteps.forEach(function (card, idx) {
                if (!wfNodes[idx]) return;
                card.addEventListener("mouseenter", function () {
                    wfNodes[idx].classList.add("is-active");
                });
                card.addEventListener("mouseleave", function () {
                    wfNodes[idx].classList.remove("is-active");
                });
            });
        }

        if (fineDesktop) {
            var pointerPending = false;
            var activeSurface = null;
            var lastX = 0;
            var lastY = 0;

            function applyPointerVars() {
                pointerPending = false;
                if (!activeSurface) return;
                var rect = activeSurface.getBoundingClientRect();
                if (!rect.width || !rect.height) return;

                var px = lastX - rect.left;
                var py = lastY - rect.top;
                var dx = Math.max(-1, Math.min(1, ((px / rect.width) - 0.5) * 2));
                var dy = Math.max(-1, Math.min(1, ((py / rect.height) - 0.5) * 2));

                if (activeSurface === heroSection && heroImg) {
                    heroImg.style.setProperty("--mam-hx", (dx * 5).toFixed(1) + "px");
                    heroImg.style.setProperty("--mam-hy", (dy * 4).toFixed(1) + "px");
                    heroImg.style.setProperty("--mam-hrx", (-dy * 1.4).toFixed(2) + "deg");
                    heroImg.style.setProperty("--mam-hry", (dx * 1.4).toFixed(2) + "deg");
                    heroImg.style.setProperty("--mam-hs", "1.015");
                } else if (activeSurface.classList.contains("pricing-item")) {
                    activeSurface.style.setProperty("--mx", Math.round(px) + "px");
                    activeSurface.style.setProperty("--my", Math.round(py) + "px");
                    activeSurface.style.setProperty("--mam-rx", (-dy * 2.5).toFixed(2) + "deg");
                    activeSurface.style.setProperty("--mam-ry", (dx * 2.5).toFixed(2) + "deg");
                } else if (activeSurface.classList.contains("box-cta")) {
                    activeSurface.style.setProperty("--mx", Math.round(px) + "px");
                    activeSurface.style.setProperty("--my", Math.round(py) + "px");
                }
            }

            var surfaces = Array.prototype.slice.call(
                document.querySelectorAll(".pricing-item, .section-cta .box-cta")
            );
            if (heroSection && heroImg) {
                surfaces.push(heroSection);
            }

            surfaces.forEach(function (surface) {
                surface.addEventListener("pointermove", function (e) {
                    if (e.pointerType === "touch") return;
                    activeSurface = surface;
                    lastX = e.clientX;
                    lastY = e.clientY;
                    if (!pointerPending) {
                        pointerPending = true;
                        requestAnimationFrame(applyPointerVars);
                    }
                }, { passive: true });

                surface.addEventListener("pointerleave", function () {
                    if (activeSurface === surface) {
                        activeSurface = null;
                    }
                    if (surface === heroSection && heroImg) {
                        heroImg.style.setProperty("--mam-hx", "0px");
                        heroImg.style.setProperty("--mam-hy", "0px");
                        heroImg.style.setProperty("--mam-hrx", "0deg");
                        heroImg.style.setProperty("--mam-hry", "0deg");
                        heroImg.style.setProperty("--mam-hs", "1");
                    } else {
                        surface.style.setProperty("--mam-rx", "0deg");
                        surface.style.setProperty("--mam-ry", "0deg");
                        surface.style.setProperty("--mx", "50%");
                        surface.style.setProperty("--my", "50%");
                    }
                });
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMotion);
    } else {
        initMotion();
    }
})();

