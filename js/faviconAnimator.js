function initFaviconAnimator()
{
    var favicon = document.getElementById("favicon");
    var onHref = "assets/favicon-on.png";
    var offHref = "assets/favicon-off.png";

    var intervalId = null;
    var showOn = false;

    function setFavicon(href)
    {
        favicon.href = href + "?v=" + Date.now();
    }

    function stop()
    {
        if (intervalId !== null)
        {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    function startBlink()
    {
        stop();

        intervalId = setInterval(function ()
        {
            showOn = !showOn;
            setFavicon(showOn ? onHref : offHref);
        }, 700);
    }

    function setOn()
    {
        stop();
        setFavicon(onHref);
    }

    document.addEventListener("visibilitychange", function ()
    {
        if (document.hidden)
        {
            startBlink();
            return;
        }

        setOn();
    });

    window.addEventListener("blur", startBlink);
    window.addEventListener("focus", setOn);
}