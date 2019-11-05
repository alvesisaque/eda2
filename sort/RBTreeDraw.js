tree = new RBTree();        
	//tree.insert(50);
	//tree.insert(25);
	//tree.insert(80);
	//tree.insert(35);
vGap = 40;
radius = 20;

function draw() {
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

// Reset size will clear the canvas, but not for IE9
canvas.width = window.innerWidth - 400;
canvas.height = window.innerHeight - 180;        
context.clearRect(0, 0, canvas.width, canvas.height); // For IE 9

context.font = "14px sans-serif";
context.strokeStyle = "#100"; // Set a pen color

if (tree.isEmpty()) {
	//context.fillText("A arvore es", canvas.width / 2 - 50, 15);  
}
else {
	x = canvas.width / 2;
	y = 30;
	
	drawTree(context, x, y, radius, tree.root, canvas.width / 4);
}
	
context.stroke();
}

function drawTree(context, x, y, radius, root, hGap) {
if (root.isRed()) {
	context.fillStyle="#EB0D1B";
}
else {
	context.fillStyle="black";
}

context.beginPath();
context.arc(x, y, radius, 0, Math.PI * 2, false);  
context.closePath();
context.fill();

context.fillStyle="white";

	if ((root.element + "").length == 1)
	context.fillText(root.element + "", x - 3, y + 5);
	else if ((root.element + "").length == 2)
	context.fillText(root.element + "", x - 8, y + 5);
	else if ((root.element + "").length == 3)
	context.fillText(root.element + "", x - 12, y + 5);
	else if ((root.element + "").length == 4)
	context.fillText(root.element + "", x - 16, y + 5);
	else 
	context.fillText(root.element + "", x - 8, y + 5);
		

if (root.left != null) {
	connectTwoCircles(context, x, y, x - hGap, y + vGap);
	context.moveTo(x - hGap + radius, y + vGap); 
	drawTree(context, x - hGap, y + vGap, radius, root.left, hGap / 2);
}

if (root.right != null) {
	connectTwoCircles(context, x, y, x + hGap, y + vGap);
	context.moveTo(x + hGap + radius, y + vGap); 
	drawTree(context, x + hGap, y + vGap, radius, root.right, hGap / 2);
}
}

// Connect two circles centered at (x1, y1) and (x2, y2) 
function connectTwoCircles(context, x1, y1, x2, y2) {
context.fillStyle="black";
var d = Math.sqrt(vGap * vGap + (x2 - x1) * (x2 - x1));
var x11 = x1 - radius * (x1 - x2) / d;
var y11 = y1 - radius * (y1 - y2) / d;
var x21 = x2 + radius * (x1 - x2) / d;
var y21 = y2 + radius * (y1 - y2) / d;
context.moveTo(x11, y11);
context.lineTo(x21, y21);

context.stroke();

} 

function remove1() {
if (tree.isEmpty()) {
	jAlert("The tree is empty"); 
}
else {
	var value = document.getElementById('value').value.trim();
	if (value == "") {
	jAlert("no key entered");
	}
	else if (tree.search(parseInt(value))) {
	tree.delete(parseInt(value));
	draw();
	}
	else {
	jAlert("key " + value + " is not in the tree");
	}
}
}

function insert() {
var value = document.getElementById('value').value.trim();
if (value == "") {
	jAlert("no key entered");
}
else if (tree.search(parseInt(value))) {
	jAlert("key " + value + " is already in the tree");
}
else {
	tree.insert(parseInt(value));
	draw();
}
}

function drawArrowLine(context, x1, y1, x2, y2) {
context.moveTo(x1, y1);
context.lineTo(x2, y2);

// find slope of this line
var slope = (y1 - y2) / (x1 - x2);

var arctan = Math.atan(slope);

// This will flip the arrow 45 off of a
// perpendicular line at pt x2
var set45 = 1.57 / 2;

// arrows should always point towards i, not i+1
if (x1 < x2) {
	// add 90 degrees to arrow lines
	set45 = -1.57 * 1.5;
}

// set length of arrows
var arrlen = 15;

// draw arrows on line
context.moveTo(x2, y2);
context.lineTo(x2 + Math.cos(arctan + set45) * arrlen,
y2 + Math.sin(arctan + set45) * arrlen);

context.moveTo(x2, y2);
context.lineTo(x2 + Math.cos(arctan - set45) * arrlen,
y2 + Math.sin(arctan - set45) * arrlen);
}

function search() {
var value = document.getElementById('value').value.trim();
if (value == "") {
	jAlert("no key entered");
}
else {
	if (tree.search(parseInt(value))) {
	jAlert(value + " is in the tree");
	}
	else {
	jAlert(value + " is not in the tree");
	}
}
}