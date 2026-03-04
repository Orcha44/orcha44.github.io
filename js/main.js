(function ()
{
    initSmoothScroll();
    initFaviconAnimator();
    initActiveSectionNav();
})();

function initSmoothScroll()
{
    var links = document.querySelectorAll('a[href^="#"]');

    for (var i = 0; i < links.length; i++)
    {
        links[i].addEventListener("click", function (e)
        {
            var href = this.getAttribute("href");
            var target = document.querySelector(href);

            if (!target)
            {
                return;
            }

            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }
}

function initActiveSectionNav()
{
    var navLinks = document.querySelectorAll('.cta-row a[href^="#"]');

    if (!navLinks || navLinks.length === 0)
    {
        return;
    }

    var sections = [];

    for (var i = 0; i < navLinks.length; i++)
    {
        var href = navLinks[i].getAttribute("href");
        var id = href ? href.replace("#", "") : "";
        var section = id ? document.getElementById(id) : null;

        if (section)
        {
            sections.push(section);
        }
    }

    function setActiveById(activeId)
    {
        for (var j = 0; j < navLinks.length; j++)
        {
            var linkHref = navLinks[j].getAttribute("href");
            var linkId = linkHref ? linkHref.replace("#", "") : "";

            if (linkId === activeId)
            {
                navLinks[j].classList.add("is-active");
            }
            else
            {
                navLinks[j].classList.remove("is-active");
            }
        }
    }

    function computeActive()
    {
        var bestId = "";
        var bestDistance = Number.POSITIVE_INFINITY;

        // Pick the section whose top is closest to a point below the sticky header.
        // Adjust this number if your header height changes.
        var anchorY = 140;

        for (var k = 0; k < sections.length; k++)
        {
            var rect = sections[k].getBoundingClientRect();
            var distance = Math.abs(rect.top - anchorY);

            if (distance < bestDistance)
            {
                bestDistance = distance;
                bestId = sections[k].id;
            }
        }

        if (bestId)
        {
            setActiveById(bestId);
        }
    }

    var ticking = false;

    function onScroll()
    {
        if (ticking)
        {
            return;
        }

        ticking = true;

        requestAnimationFrame(function ()
        {
            computeActive();
            ticking = false;
        });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    computeActive();
}