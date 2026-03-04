(function ()
{
    initSmoothScroll();
    initFaviconAnimator();
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