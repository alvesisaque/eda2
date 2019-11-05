heap = new Heap();      
vGap = 40;
radius = 20;

function draw() {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext("2d");

	canvas.width = window.innerWidth - 400;
	canvas.height = window.innerHeight - 180;        
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.font = "14px sans-serif";
	context.strokeStyle = "#100";

	if (heap.isEmpty()) {
		//context.fillText("heap is empty", canvas.width / 2 - 50, 15);  
	}
	else {
		x = canvas.width / 2;
		y = 30;
		
		drawTree(context, x, y, radius, 0, canvas.width / 4);
	}
		
	context.stroke();
}
// Desenha a arvore
function drawTree(context, x, y, radius, i, hGap) {
	context.fillText(heap.list[i] + "", x - 5, y + 5);  
	context.arc(x, y, radius, 0, Math.PI * 2, false);    
		
	if (2 * i + 1 < heap.list.length) {
		connectTwoCircles(context, x, y, x - hGap, y + vGap);
		context.moveTo(x - hGap + radius, y + vGap); 
		drawTree(context, x - hGap, y + vGap, radius, 2 * i + 1, hGap / 2);
	}

	if (2 * i + 2 < heap.list.length) {
		connectTwoCircles(context, x, y, x + hGap, y + vGap);
		context.moveTo(x + hGap + radius, y + vGap); 
		drawTree(context, x + hGap, y + vGap, radius, 2 * i + 2, hGap / 2);
	}
}

// Conecta dois círculos centralizados em (x1, y1) e (x2, y2)
function connectTwoCircles(context, x1, y1, x2, y2) {
	var d = Math.sqrt(vGap * vGap + (x2 - x1) * (x2 - x1));
	var x11 = x1 - radius * (x1 - x2) / d;
	var y11 = y1 - radius * (y1 - y2) / d;
	var x21 = x2 + radius * (x1 - x2) / d;
	var y21 = y2 + radius * (y1 - y2) / d;
	context.moveTo(x11, y11);
	context.lineTo(x21, y21);
} 

function remove1() {
	if (heap.isEmpty()) {
		jAlert("The heap is empty"); 
	}
	else {
		heap.remove();
		draw();
	}
}

function insert() {
	var value = document.getElementById('value').value.trim();
	if (value == "") {
		jAlert("no value entered");
	}
	else {
		heap.add(parseInt(value));
	}

	draw();
}


function drawArrowLine(context, x1, y1, x2, y2) {
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);

	// encontre a inclinação desta linha
	var slope = (y1 - y2) / (x1 - x2);

	var arctan = Math.atan(slope);

	var set45 = 1.57 / 2;

	if (x1 < x2) {
		// adiciona 90 graus às linhas das setas
		set45 = -1.57 * 1.5;
	}

	// definir o comprimento das setas
	var arrlen = 10;

	// draw arrows on line
	context.moveTo(x2, y2);
	context.lineTo(x2 + Math.cos(arctan + set45) * arrlen,
	y2 + Math.sin(arctan + set45) * arrlen);

	context.moveTo(x2, y2);
	context.lineTo(x2 + Math.cos(arctan - set45) * arrlen,
	y2 + Math.sin(arctan - set45) * arrlen);
}