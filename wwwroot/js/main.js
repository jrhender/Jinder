/**
 * jTinder initialization
 */

var currentPane = 5;

var JTinderDivID = "#Tinderslide";
var currentPane = $(">ul>li", JTinderDivID).length;

$(JTinderDivID).jTinder({
	// dislike callback
    onDislike: function (item) {
	    // set the status text
        $('#status').html('Dislike image ' + (item.index()+1));
		currentPane = item.index()+1;
    },
	// like callback
    onLike: function (item) {
	    // set the status text
        $('#status').html('Like image ' + (item.index()+1));
		currentPane = item.index()+1;
    },
	animationRevertSpeed: 200,
	animationSpeed: 400,
	threshold: 1,
	likeSelector: '.like',
	dislikeSelector: '.dislike'
});

/**
 * Set button action to trigger jTinder like & dislike.
 */
$('.actions .dislike').click(function(e){
	e.preventDefault();
	$("#Tinderslide").jTinder($(this).attr('class'));
});

$('.actions .like').click(function(e){
	e.preventDefault();

	//It's a like so show the match modal
	$("#john-image").attr("src","/img/pane/john".concat(currentPane,".jpg"));
	$("#matchModal").show();

	//trigger the JTinder to update the next image
	//$("#Tinderslide").jTinder($(this).attr('class'));
});

