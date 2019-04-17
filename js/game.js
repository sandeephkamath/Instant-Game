$(document).ready(function () {
	$("#progressTimer").progressTimer({
		timeLimit: 60,
		warningThreshold: 50,
		baseStyle: 'progress-bar-info',
		warningStyle: 'progress-bar-danger',
		completeStyle: 'progress-bar-danger',
		onFinish: function () {
			this.gameOver = true
		}
	});
	setState()
	initSwipeDetection()
});
var state
var direction
var score = 0
var gameOver = false
document.onkeydown = checkKey;
function checkKey(e) {
	if (gameOver) {
		return
	}
	e = e || window.event;
	if (e.keyCode == '38') {
		validate(2)
	}
	else if (e.keyCode == '40') {
		// down arrow
		validate(3)
	}
	else if (e.keyCode == '37') {
		// left arrow
		validate(0)
	}
	else if (e.keyCode == '39') {
		// right arrow
		validate(1)
	}
}
function validate(inputDirection) {
	if (gameOver) {
		return;
	}
	if (state == 0) {
		if (direction == inputDirection) {
			scoreAdd()
		} else {
			wrong()
		}
	} else {
		if (inputDirection == 0 && direction == 1) {
			scoreAdd()
		} else if (inputDirection == 1 && direction == 0) {
			scoreAdd()
		} else if (inputDirection == 2 && direction == 3) {
			scoreAdd()
		} else if (inputDirection == 3 && direction == 2) {
			scoreAdd()
		} else {
			wrong()
		}
	}
	console.log("Score = " + score)
}
function wrong() {
	$("#block-container").effect("shake", { times: 2 });
}
function scoreAdd() {
	score += 1
	setState()
}
function setState() {
	state = getRandom(0, 2)
	direction = getRandom(0, 4)
	setUI()
}
function getRandom(max, min) {
	return Math.floor(Math.random() * (max - min)) + min;
}
function setUI() {
	setArrow()
	setColor();
	$("#block-container").hide();
	$("#block-container").fadeIn();
}
function setArrow() {
	var dirImg;
	switch (direction) {
		case 0:
			dirImg = "left"
			break
		case 1:
			dirImg = "right"
			break
		case 2:
			dirImg = "up"
			break
		case 3:
			dirImg = "down"
			break
	}
	var className = "fa fa-arrow-" + dirImg
	console.log(className)
	$("#arrow").removeClass()
	$("#arrow").addClass(className);
}
function setColor() {
	var color
	switch (state) {
		case 0:
			color = "info"
			break
		case 1:
			color = "danger"
			break
	}
	var classNames = "btn btn-" + color + " arrow-button"
	console.log(classNames)
	$("#block").removeClass()
	$("#block").addClass(classNames);
}
function initSwipeDetection() {
	var myElement = document.getElementById('block');
	var mc = new Hammer(myElement);
	//enable all directions
	mc.get('swipe').set({
		direction: Hammer.DIRECTION_ALL,
		threshold: 1,
		velocity: 0.1
	});
	// listen to events...
	mc.on("swipeup swipedown swipeleft swiperight tap press", function (ev) {
		console.log(ev.type)
		switch (ev.type) {
			case 'swipeleft':
				validate(0)
				break
			case 'swiperight':
				validate(1)
				break
			case 'swipeup':
				validate(2)
				break
			case 'swipedown':
				validate(3)
				break
		}
	});
}