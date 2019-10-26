{
    //if user already set a custom theme - load it, otherwise load system theme
    var currentTheme = localStorage.getItem("customTheme");
    if(currentTheme) {
        if(currentTheme === 'light') {
            unloadDarkTheme();
        } else {
            loadDarkTheme();
        }
    }
}

function changeTheme(currentTheme) {
    var currentTheme = "dark"; 
    if(! localStorage.getItem("customTheme")) {
        var systemTheme = "light";
        if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            systemTheme = "dark";
        }
    } else {
        currentTheme = localStorage.getItem("customTheme");
    }

    // if current theme eq dark, change it to light and remove css
    if(currentTheme === 'dark') {
        unloadDarkTheme();
        // if current theme eq light, change it to dark and add css
    } else if(currentTheme === 'light') {
        loadDarkTheme();
    }
}

function unloadDarkTheme() {
    localStorage.setItem("customTheme", "light");
    $('#darkTheme').remove()
    $('#forceDarkTheme').remove()
}

function loadDarkTheme() {
    localStorage.setItem("customTheme", "dark");
    $('head').append('<link id="forceDarkTheme" rel="stylesheet" type="text/css" href="/stylesheets/forceDark.css">');
}

function removeCssFile(filename){
    var targetelement="link"
    var targetattr="href"
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}