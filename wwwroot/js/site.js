// Write your Javascript code.

// Get the modal
var modal = document.getElementById('myModal');

// Get the match modal
var matchModal = document.getElementById('matchModal')

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
$('.actions .profile').click(function(e){
	e.preventDefault();
    if($('.pane5').css("display") != "none") {
        $('#profileText').text("Nothing on his baby face is particularly pretty, but somehow it all just works together");
    }
    else if($('.pane4').css("display") != "none") {
        $('#profileText').text("He's smarter than two dumb guys!");
    }
    else if($('.pane3').css("display") != "none") {
        $('#profileText').text("He hates how intimidated people get when they see his muscular biceps.");
    }
    else if($('.pane2').css("display") != "none") {
        $('#profileText').text("He oozes class from every pore. No wonder his face is shiny");
    }
    else if($('.pane1').css("display") != "none") {
        $('#profileText').text("Impossible to resist his unhinged joy!");
    }
	modal.style.display = "block";
});

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    if(currentPane){
        $("#john-image").attr("src","/img/pane/john".concat(currentPane,".jpg"));
    }
    matchModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    matchModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == matchModal) {
        matchModal.style.display = "none";
    }
}