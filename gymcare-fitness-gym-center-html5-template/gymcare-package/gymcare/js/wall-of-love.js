(function () {
    "use strict";

    function createPagedStrip(options) {
        var grid = document.getElementById(options.gridId);
        var prevBtn = document.getElementById(options.prevId);
        var nextBtn = document.getElementById(options.nextId);
        var counterEl = document.getElementById(options.counterId);

        if (!grid || !prevBtn || !nextBtn) return;

        var items = Array.prototype.slice.call(grid.children);
        var currentPage = 0;

        function getPageSize() {
            var w = window.innerWidth || 1280;
            if (w >= 1200) return options.desktopCount;
            if (w >= 576) return options.tabletCount;
            return options.mobileCount;
        }

        function render() {
            var pageSize = getPageSize();
            var totalPages = Math.max(1, Math.ceil(items.length / pageSize));
            if (currentPage >= totalPages) {
                currentPage = totalPages - 1;
            }
            var start = currentPage * pageSize;
            var end = start + pageSize;

            items.forEach(function (item, idx) {
                if (idx >= start && idx < end) {
                    item.removeAttribute("hidden");
                } else {
                    item.setAttribute("hidden", "");
                }
            });

            prevBtn.disabled = currentPage <= 0;
            nextBtn.disabled = currentPage >= totalPages - 1;
            if (counterEl) {
                counterEl.textContent = (currentPage + 1) + " / " + totalPages;
            }
        }

        prevBtn.addEventListener("click", function () {
            if (currentPage > 0) {
                currentPage -= 1;
                render();
            }
        });

        nextBtn.addEventListener("click", function () {
            var totalPages = Math.max(1, Math.ceil(items.length / getPageSize()));
            if (currentPage < totalPages - 1) {
                currentPage += 1;
                render();
            }
        });

        var resizeTimer = null;
        window.addEventListener("resize", function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(render, 120);
        }, { passive: true });

        render();
    }

    function initStoryModal() {
        var modalEl = document.getElementById("wolModal");
        if (!modalEl) return;

        var imgEl = document.getElementById("wolModalImg");
        var badgeEl = document.getElementById("wolModalBadge");
        var titleEl = document.getElementById("wolModalTitle");
        var metricEl = document.getElementById("wolModalMetric");
        var quoteEl = document.getElementById("wolModalQuote");
        var notesEl = document.getElementById("wolModalNotes");
        var linkEl = document.getElementById("wolModalLink");

        var bsModal = null;
        if (window.bootstrap && window.bootstrap.Modal) {
            bsModal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
        }

        document.addEventListener("click", function (e) {
            var trigger = e.target.closest("[data-wol-story]");
            if (!trigger) return;

            if (imgEl) {
                imgEl.src = trigger.getAttribute("data-img") || "image/portfolio/portfolio-1.jpg";
                imgEl.alt = trigger.getAttribute("data-title") || "Client story preview";
            }
            if (badgeEl) badgeEl.textContent = trigger.getAttribute("data-badge") || "Client Story";
            if (titleEl) titleEl.textContent = trigger.getAttribute("data-title") || "";
            if (metricEl) metricEl.textContent = trigger.getAttribute("data-metric") || "";
            if (quoteEl) quoteEl.textContent = trigger.getAttribute("data-quote") || "";
            if (notesEl) notesEl.textContent = trigger.getAttribute("data-notes") || "";
            if (linkEl) {
                var href = trigger.getAttribute("data-link") || "portfolio-details.html";
                var linkText = trigger.getAttribute("data-link-label") || "Read Case Study";
                linkEl.setAttribute("href", href);
                linkEl.textContent = linkText;
            }

            if (bsModal) {
                bsModal.show();
            }
        });
    }

    function init() {
        createPagedStrip({
            gridId: "wolReelsGrid",
            prevId: "wolReelsPrev",
            nextId: "wolReelsNext",
            counterId: "wolReelsCounter",
            desktopCount: 4,
            tabletCount: 2,
            mobileCount: 1
        });

        createPagedStrip({
            gridId: "wolVideosGrid",
            prevId: "wolVideosPrev",
            nextId: "wolVideosNext",
            counterId: "wolVideosCounter",
            desktopCount: 3,
            tabletCount: 2,
            mobileCount: 1
        });

        initStoryModal();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
