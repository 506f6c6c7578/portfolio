(() => {
    const nav = document.getElementById("site-nav");
    const toggle = document.querySelector("[data-nav-toggle]");
    const indicator = nav.querySelector(".nav__indicator");
    const links = Array.from(nav.querySelectorAll(".nav__link"));
    const linksBySection = new Map(links.filter((link) => link.dataset.section)
        .map((link) => [link.dataset.section, link]));
    const supportsPopover = typeof nav.showPopover === "function";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let activeLink = links.find((link) => link.hasAttribute("aria-current"));

    const placeIndicator = () => {
        indicator.classList.toggle("nav__indicator--visible", Boolean(activeLink));
        if (!activeLink) return;
        indicator.style.setProperty("--indicator-x", `${activeLink.offsetLeft}px`);
        indicator.style.setProperty("--indicator-width", `${activeLink.offsetWidth}px`);
    };

    const setActiveLink = (link) => {
        if (!link || link === activeLink) return;
        activeLink?.removeAttribute("aria-current");
        link.setAttribute("aria-current", "true");
        activeLink = link;
        placeIndicator();
    };

    const setMenuOpen = (open) => {
        nav.classList.toggle("nav--open", open);
        toggle.setAttribute("aria-expanded", String(open));
    };

    const closeMenu = () => {
        if (!supportsPopover) setMenuOpen(false);
        else if (nav.matches(":popover-open")) nav.hidePopover();
    };

    const scrollToTarget = (target, behavior) => {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.scrollIntoView({ behavior });
        target.focus({ preventScroll: true });
    };

    placeIndicator();
    requestAnimationFrame(() => requestAnimationFrame(() => indicator.classList.add(
        "nav__indicator--animated")));
    new ResizeObserver(placeIndicator).observe(nav);

    if (supportsPopover) {
        nav.addEventListener("toggle",
            (event) => toggle.setAttribute("aria-expanded", String(event.newState === "open")));
    } else {
        toggle.addEventListener("click", () => setMenuOpen(!nav.classList.contains("nav--open")));
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && nav.classList.contains("nav--open")) setMenuOpen(false);
        });
    }

    document.addEventListener("click", (event) => {
        const link = event.target instanceof Element ? event.target.closest("a") : null;
        if (!link || link.origin !== location.origin || link.pathname !== location.pathname) return;
        const target = document.getElementById(link.dataset.section ??
            decodeURIComponent(link.hash.slice(1)));
        if (!target) return;
        event.preventDefault();
        closeMenu();
        scrollToTarget(target, reducedMotion.matches ? "auto" : "smooth");
    });

    document.addEventListener("DOMContentLoaded", () => {
        if (location.hash) {
            const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
            history.replaceState(history.state, "", location.pathname + location.search);
            if (target) scrollToTarget(target, "instant");
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.filter((entry) => entry.isIntersecting)
                    .forEach((entry) => setActiveLink(linksBySection.get(entry.target.id)));
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );

        linksBySection.forEach((_, id) => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });
    });
})();
