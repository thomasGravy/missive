/* Missive theme — small, dependency-free enhancements */
(function () {
    'use strict';

    /* Header border once the page scrolls */
    var header = document.querySelector('[data-header]');
    if (header) {
        var onScroll = function () {
            header.classList.toggle('is-scrolled', window.scrollY > 8);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, {passive: true});
    }

    /* Mobile menu */
    var burger = document.querySelector('[data-burger]');
    var nav = document.querySelector('[data-nav]');
    if (burger && nav) {
        var setMenu = function (open) {
            document.body.classList.toggle('is-menu-open', open);
            burger.setAttribute('aria-expanded', String(open));
        };
        burger.addEventListener('click', function () {
            setMenu(!document.body.classList.contains('is-menu-open'));
        });
        nav.addEventListener('click', function (event) {
            if (event.target.closest('a')) setMenu(false);
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') setMenu(false);
        });
    }

    /* Issue numbers: the newest post is issue N, the oldest is issue 1 */
    function numberIssues(items, scope) {
        var total = parseInt(scope.getAttribute('data-total'), 10);
        var page = parseInt(scope.getAttribute('data-page'), 10) || 1;
        var limit = parseInt(scope.getAttribute('data-limit'), 10);
        var label = scope.getAttribute('data-label') || '';
        if (!total || !limit) return;

        items.forEach(function (item, index) {
            var slot = item.querySelector('[data-issue-no]');
            var number = total - (page - 1) * limit - index;
            if (slot && number > 0) {
                slot.textContent = (label ? label + ' ' : '') + number;
            }
        });
    }

    document.querySelectorAll('[data-numbered]').forEach(function (scope) {
        scope.classList.add('is-numbered');
        numberIssues(Array.prototype.slice.call(scope.querySelectorAll('[data-issue]')), scope);
    });

    /* "Load more issues" — falls back to a normal pagination link without JS */
    document.querySelectorAll('[data-loadmore]').forEach(function (button) {
        var feed = document.querySelector('[data-feed]');
        if (!feed) return;

        button.addEventListener('click', function (event) {
            event.preventDefault();
            if (button.classList.contains('is-loading')) return;
            button.classList.add('is-loading');

            fetch(button.href)
                .then(function (response) {
                    if (!response.ok) throw new Error(response.status);
                    return response.text();
                })
                .then(function (html) {
                    var doc = new DOMParser().parseFromString(html, 'text/html');
                    var items = Array.prototype.slice.call(doc.querySelectorAll('[data-feed] > [data-issue]'));
                    var scope = doc.querySelector('[data-numbered]');
                    if (scope) numberIssues(items, scope);

                    items.forEach(function (item) {
                        item.classList.add('is-new');
                        feed.appendChild(document.importNode(item, true));
                    });

                    var next = doc.querySelector('[data-loadmore]');
                    if (next) {
                        button.href = next.href;
                        button.classList.remove('is-loading');
                    } else {
                        button.parentElement.remove();
                    }
                })
                .catch(function () {
                    window.location.href = button.href;
                });
        });
    });

    /* Archive page: year headings */
    document.querySelectorAll('[data-group-by-year]').forEach(function (list) {
        var current = null;
        list.querySelectorAll('[data-year]').forEach(function (item) {
            var year = item.getAttribute('data-year');
            if (year !== current) {
                current = year;
                var heading = document.createElement('h2');
                heading.className = 'm-year';
                heading.textContent = year;
                list.insertBefore(heading, item);
            }
        });
    });

    /* Subscribe page: monthly / yearly switch */
    var plans = document.querySelector('[data-plans]');
    if (plans) {
        var switches = plans.querySelectorAll('[data-cadence-switch]');
        switches.forEach(function (control) {
            control.addEventListener('click', function () {
                var cadence = control.getAttribute('data-cadence-switch');
                switches.forEach(function (other) {
                    other.setAttribute('aria-pressed', String(other === control));
                });
                plans.querySelectorAll('[data-cadence]').forEach(function (price) {
                    price.hidden = price.getAttribute('data-cadence') !== cadence;
                });
                plans.querySelectorAll('[data-tier-button]').forEach(function (link) {
                    var target = 'signup/' + link.getAttribute('data-tier') + '/' + cadence;
                    link.setAttribute('data-portal', target);
                    link.setAttribute('href', '#/portal/' + target);
                });
            });
        });
    }

    /* Reading progress */
    var bar = document.querySelector('[data-progress]');
    var content = document.querySelector('[data-content]');
    if (bar && content) {
        var ticking = false;
        var update = function () {
            var rect = content.getBoundingClientRect();
            var distance = rect.height - window.innerHeight * 0.6;
            var progress = distance > 0 ? Math.min(Math.max(-rect.top / distance, 0), 1) : 1;
            bar.style.transform = 'scaleX(' + progress + ')';
            ticking = false;
        };
        window.addEventListener('scroll', function () {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(update);
            }
        }, {passive: true});
        update();
    }

    /* Share: native share sheet on mobile, copy link elsewhere */
    document.querySelectorAll('[data-share]').forEach(function (button) {
        var label = button.querySelector('[data-share-label]');
        var done = button.querySelector('[data-share-done]');
        button.addEventListener('click', function () {
            var data = {title: button.getAttribute('data-title'), url: button.getAttribute('data-url')};
            if (navigator.share && window.matchMedia('(pointer: coarse)').matches) {
                navigator.share(data).catch(function () {});
                return;
            }
            if (!navigator.clipboard) return;
            navigator.clipboard.writeText(data.url).then(function () {
                label.hidden = true;
                done.hidden = false;
                setTimeout(function () {
                    label.hidden = false;
                    done.hidden = true;
                }, 2000);
            });
        });
    });
})();
