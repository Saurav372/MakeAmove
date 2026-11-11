/**
 * 
 *  headerSticky
 *  video
 *  btnSearch
 *  counter
 *  progresslevel
 *  circlesProgressLevel
 *  handleAccordionBorders
 *  parallaxImage
 *  gotop
 *  switchPrice
 *  preloader
 *
 **/

(function ($) {
    ("use strict");

    var headerSticky = function () {
        let lastScrollTop = 0;
        let delta = 5;
        let ticking = false;
        let a = jQuery;
        function updateHeader() {
            let st = a(window).scrollTop();
            let adminBarHeight = a("#wpadminbar").length
                ? a("#wpadminbar").outerHeight()
                : 0;

            if (st < 0) st = 0;

            if (st > 50) {
                a(".header-sticky").addClass("header-bg");
            } else {
                a(".header-sticky").removeClass("header-bg");
            }

            a(".header-sticky").css({
                transform: "translateY(0%)",
                top: adminBarHeight,
            });

            lastScrollTop = st;
            ticking = false;
        }

        a(window).on("scroll", function () {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });

        updateHeader();
    };
    
    var video = function () {
        if ($(".wg-video").length && typeof $.fn.magnificPopup === "function") {
            $(".popup-youtube").magnificPopup({
                type: "iframe",
            });
        }
    };

    var btn = function () {
        $(document).on("click", function (e) {
            if (!$(e.target).closest(".search-btn, .form-search").length) {
                $(".top-search, .search-btn").removeClass("active");
                $("body").removeClass("no-scroll");
            }
        });

        $(".search-btn").on("click", function (e) {
            e.stopPropagation();
            $(".top-search, .search-btn").toggleClass("active");

            if ($(".top-search").hasClass("active")) {
                $("body").addClass("no-scroll");
            } else {
                $("body").removeClass("no-scroll");
            }
        });

        $(".form-search").on("click", function (e) {
            e.stopPropagation();
        });

        $(".button-close").on("click", function () {
            $(".top-search, .search-btn").removeClass("active");
            $("body").removeClass("no-scroll");
        });

        $(".item-check").on("click", function () {
            $(this).closest(".list-checks").find(".active").removeClass("active");
            $(this).addClass("active");
        });

    };
    
    var change_image = () => {
        $('.trainer-item').on('mouseenter', function(){
            if(!$(this).hasClass('active-img')) {
                $('.trainer-item').removeClass('active-img');
                $(this).addClass('active-img');
    
                const newImg = $(this).data('img');
                $('.trainer-image').find('img').css('opacity', 0);
                setTimeout(() => {
                  $('.trainer-image').find('img').attr('src', newImg).css('opacity', 1);
                }, 200);
            }
        });
        
        function activateProgramItem($item) {
            if (!$item.hasClass('active-img')) {
                $('.programs-item').removeClass('active-img').attr('aria-pressed', 'false');
                $item.addClass('active-img').attr('aria-pressed', 'true');

                const newImg = $item.data('img');
                $('.programs-image').find('img').css('opacity', 0);
                setTimeout(() => {
                    $('.programs-image').find('img').attr('src', newImg).css('opacity', 1);
                }, 150);
            }
        }

        $('.programs-item').on('click', function () {
            activateProgramItem($(this));
        }).on('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (!$(e.target).closest('a').length) {
                    e.preventDefault();
                    activateProgramItem($(this));
                }
            }
        });
    };

    var counter = function () {
        if ($(document.body).hasClass("counter-scroll")) {
            const observer = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const element = $(entry.target);

                            if (!element.hasClass("odometer-activated")) {
                                const to = element.data("to");
                                element.addClass("odometer-activated");

                                element.html(to);
                            }

                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            $(".counter .number").each(function () {
                observer.observe(this);
            });
        }
    };

    var progresslevel = function () {
        if ($(".progress-bars").length) {
            var bars = document.querySelectorAll(".progress-bars-line > div");
            setInterval(function () {
                bars.forEach(function (bar) {
                    var t1 = parseFloat(bar.dataset.progress);
                    var t2 = parseFloat(bar.dataset.max);
                    var getWidth = (t1 / t2) * 100;
                    bar.style.width = getWidth + "%";
                });
            }, 500);
        }
    };

    var circlesProgressLevel = function () {
        var circles = document.querySelectorAll(".progress-circle-svg");
        var observer = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
                        var el = entry.target;
                        var progressValue = parseFloat(el.dataset.progress);

                        var textElement = el.querySelector(".progress-text");
                        var progressBar = el.querySelector(".progress-ring-bar");

                        var radius = parseFloat(progressBar.getAttribute("r"));
                        var circumference = 2 * Math.PI * radius;

                        progressBar.style.strokeDasharray = `${circumference} ${circumference}`;
                        progressBar.style.strokeDashoffset = circumference;

                        let currentProgress = 0;
                        let animationFrameId;

                        function animateCircle() {
                            if (currentProgress < progressValue) {
                                currentProgress += 1;
                                const offset = circumference - (currentProgress / 100) * circumference;
                                progressBar.style.strokeDashoffset = offset;
                                textElement.textContent = Math.round(currentProgress);
                                animationFrameId = requestAnimationFrame(animateCircle);
                            } else {
                                const finalOffset = circumference - (progressValue / 100) * circumference;
                                progressBar.style.strokeDashoffset = finalOffset;
                                textElement.textContent = Math.round(progressValue);
                                cancelAnimationFrame(animationFrameId);
                            }
                        }

                        animateCircle();
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.9 }
        );

        circles.forEach(function (circle) {
            observer.observe(circle);
        });
    };

    var handleAccordionBorders = function () {
        if (document.querySelector(".according-active")) {
            var accordions = document.querySelectorAll(".according-active .collapse");

            accordions.forEach(function (collapseEl) {
                var parentItem = collapseEl.closest(".according-active");

                var addActiveBorder = function () {
                    parentItem.classList.add("active");
                };

                var removeActiveBorder = function () {
                    parentItem.classList.remove("active");
                    var nextItem = parentItem.nextElementSibling;
                    if (nextItem && nextItem.classList.contains("according-active")) {
                        nextItem.style.borderTopColor = "";
                    }
                };

                if (collapseEl.classList.contains("show")) {
                    addActiveBorder();
                }

                collapseEl.addEventListener("show.bs.collapse", addActiveBorder);
                collapseEl.addEventListener("hide.bs.collapse", removeActiveBorder);
            });
        }
    };

    var parallaxImage = function () {
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        if ($(".parallax-img").length > 0 && typeof SimpleParallax !== "undefined") {
            $(".parallax-img").each(function () {
                new SimpleParallax(this, {
                    delay: 0.6,
                    orientation: "up",
                    scale: 1.17,
                    transition: "cubic-bezier(0,0,0,1)",
                    customContainer: "",
                    customWrapper: "",
                });
            });
        }
    };

    var gotop = function () {
        if ($("div").hasClass("progress-wrap")) {
            var progressPath = document.querySelector(".progress-wrap path");
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition =
                "none";
            progressPath.style.strokeDasharray = pathLength + " " + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition =
                "stroke-dashoffset 10ms linear";
            var updateprogress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength) / height;
                progressPath.style.strokeDashoffset = progress;
            };
            updateprogress();
            $(window).scroll(updateprogress);
            var offset = 0;
            var duration = 0;
            jQuery(window).on("scroll", function () {
                if (jQuery(this).scrollTop() > offset) {
                    jQuery(".progress-wrap").addClass("active-progress");
                } else {
                    jQuery(".progress-wrap").removeClass("active-progress");
                }
            });
            jQuery(".progress-wrap").on("click", function (event) {
                event.preventDefault();
                jQuery("html, body").animate({ scrollTop: 0 }, duration);
                return false;
            }).on("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    jQuery("html, body").animate({ scrollTop: 0 }, duration);
                }
            });
        }
    };

    var switchPrice = () => {
        function formatUSD(n) {
            return "$" + Number(n).toLocaleString("en-US");
        }

        function updatePrices(isSecondary) {
            $("#pricingSwitch").attr("aria-checked", isSecondary ? "true" : "false");
            $(".currency-btn-inr").toggleClass("active", !isSecondary);
            $(".currency-btn-usd").toggleClass("active", isSecondary);

            $(".price-number").each(function () {
                const $p = $(this);
                if ($p.attr("data-inr") !== undefined && $p.attr("data-usd") !== undefined) {
                    const val = isSecondary ? $p.data("usd") : $p.data("inr");
                    $p.text(val);
                    const perAttr = isSecondary ? "usd-per" : "inr-per";
                    const perVal = $p.data(perAttr);
                    if (perVal) {
                        $p.next(".price-per").text(perVal);
                    }
                } else {
                    const val = isSecondary ? $p.data("year") : $p.data("month");
                    $p.text(formatUSD(val));
                    $p.next(".price-per").text(isSecondary ? "/ year" : "/ month");
                }
            });
        }

        $("#pricingSwitch").on("change", function () {
            updatePrices(this.checked);
        });

        $(".currency-btn-inr").on("click", function () {
            $("#pricingSwitch").prop("checked", false).trigger("change");
        });

        $(".currency-btn-usd").on("click", function () {
            $("#pricingSwitch").prop("checked", true).trigger("change");
        });

        updatePrices($("#pricingSwitch").is(":checked"));
    };

    var contactFormA11y = () => {
        const $form = $(".form-contact");
        if (!$form.length) return;

        $form.attr("novalidate", "novalidate");
        $form.on("submit", function (e) {
            $form.find(".field-error-msg").remove();
            $form.find("[aria-invalid='true']").removeAttr("aria-invalid").removeAttr("aria-describedby");

            let firstInvalid = null;
            const fields = [
                { id: "intake_full_name", msg: "Please enter your full name." },
                { id: "intake_email", msg: "Please enter a valid email address.", email: true },
                { id: "intake_phone", msg: "Please enter your WhatsApp or phone number." },
                { id: "intake_primary_goal", msg: "Please describe your primary 12-week goal." },
                { id: "consent_terms", msg: "Please confirm exercise clearance and policy consent.", checkbox: true },
            ];

            fields.forEach((f) => {
                const el = document.getElementById(f.id);
                if (!el) return;
                const val = (el.value || "").trim();
                const invalid = f.checkbox
                    ? !el.checked
                    : f.email
                        ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
                        : val.length === 0;

                if (invalid) {
                    const errId = f.id + "_error";
                    $(el).attr({ "aria-invalid": "true", "aria-describedby": errId });
                    const $msg = $('<div class="field-error-msg" role="alert"></div>').attr("id", errId).text(f.msg);
                    if (f.checkbox) {
                        $(el).closest(".form-check").after($msg);
                    } else {
                        $(el).after($msg);
                    }
                    if (!firstInvalid) firstInvalid = el;
                }
            });

            if (firstInvalid) {
                e.preventDefault();
                $("#form-status").text("Please fix the highlighted fields below before submitting.");
                firstInvalid.focus();
            } else {
                const $btn = $form.find('button[type="submit"]');
                $btn.attr("aria-busy", "true").text("Submitting Intake...");
            }
        });
    };

    var preloader = function () {
        if ($("#loading").length) {
            $("#loading").fadeOut("fast", function () {
                $(this).remove();
            });
        }
    };

    // Safety timeout to ensure loader never hangs if an external asset delays
    setTimeout(preloader, 800);
    $(window).on("load", preloader);

    // Dom Ready
    $(function () {
        headerSticky();
        video();
        btn();
        change_image();
        counter();
        progresslevel();
        circlesProgressLevel();
        handleAccordionBorders();
        parallaxImage();
        gotop();
        switchPrice();
        contactFormA11y();
        preloader();
    });
})(jQuery);
