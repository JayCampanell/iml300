 // GENERATED WITH GEMINI
 
 var click = $("#click")[0];
    $(".center a").click(function(event) {
        event.preventDefault(); 
        
        // Get the URL the link is supposed to go to
        var targetUrl = $(this).attr("href");
        
        // Play the sound
        click.play();
        
        // 4. Wait a fraction of a second, then navigate to the new page.
        // (500 milliseconds = half a second. Adjust this based on how long your mp3 is!)
        setTimeout(function() {
            window.location.href = targetUrl;
        }, 300);
    });
    $(".center typewriter a").click(function(event) {
        event.preventDefault(); 
        
        // Get the URL the link is supposed to go to
        var targetUrl = $(this).attr("href");
        
        // Play the sound
        click.play();
        
        // 4. Wait a fraction of a second, then navigate to the new page.
        // (500 milliseconds = half a second. Adjust this based on how long your mp3 is!)
        setTimeout(function() {
            window.location.href = targetUrl;
        }, 300);
    });
    $("a").click(function(event) {
        event.preventDefault(); 
        
        // Get the URL the link is supposed to go to
        var targetUrl = $(this).attr("href");
        
        // Play the sound
        click.play();
        
        // 4. Wait a fraction of a second, then navigate to the new page.
        // (500 milliseconds = half a second. Adjust this based on how long your mp3 is!)
        setTimeout(function() {
            window.location.href = targetUrl;
        }, 300);
    });
    $(".collage-container a").click(function(event) {
    event.preventDefault(); 
    
    // Get the URL the link is supposed to go to
    var targetUrl = $(this).attr("href");
    
    // Play the sound
    click.play();
    
    // 4. Wait a fraction of a second, then navigate to the new page.
    // (500 milliseconds = half a second. Adjust this based on how long your mp3 is!)
    setTimeout(function() {
        window.location.href = targetUrl;
    }, 300);
});