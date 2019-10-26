function initDropdowns(e) {
    e.children(".whit-e-drop-trigger").on("click", function(i) {
        i.stopPropagation();
        var o = $(this),
            c = o.parent();
        c.hasClass("active") ? (c.removeClass("active"), $(document).off("click")) : (e.removeClass("active"), c.addClass("active"), $(document).on("click", function() {
            e.removeClass("active")
        }))
    })
}! function() {
    $(".whit-e-nav-burger").click(function() {
        $(".whit-e-mobilehead").toggleClass("whit-e-mobilehead-open")
    })
}();