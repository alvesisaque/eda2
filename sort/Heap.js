// Construtor
function Heap() {
  this.list = [];
}
           
Heap.prototype = {
  // Adiciona um novo objeto 
  add: function(e) {
    this.list.push(e);
    var currentIndex = this.list.length - 1; // Index do ultimo nó

    while (currentIndex > 0) {
      var parentIndex = Math.floor((currentIndex - 1) / 2);
      
      if (this.list[currentIndex] > this.list[parentIndex]) {
        var temp = this.list[currentIndex];
        this.list[currentIndex] = this.list[parentIndex];
        this.list[parentIndex] = temp;
        currentIndex = parentIndex;
      }
      else 
        break;
    }
  },
      
  // Remova a raiz da pilha
  remove: function() {
    if (this.list.length == 0) return null;

    var removedObject = this.list[0];
    this.list[0] = this.list[this.list.length - 1];
    this.list.pop();

    var currentIndex = 0;
    while (currentIndex < this.list.length) {
      var leftChildIndex = 2 * currentIndex + 1;
      var rightChildIndex = 2 * currentIndex + 2;

      if (leftChildIndex >= this.list.length) break;
      var maxIndex = leftChildIndex;
      if (rightChildIndex < this.list.length) {
        if (this.list[maxIndex] < this.list[rightChildIndex]) {
          maxIndex = rightChildIndex;
        }
      }

      if (this.list[currentIndex] < this.list[maxIndex]) {
        var temp = this.list[maxIndex];
        this.list[maxIndex] = this.list[currentIndex];
        this.list[currentIndex] = temp;
        currentIndex = maxIndex;
      }
      else
        break;
    }

    return removedObject;
  },

  getSize: function() {
    return this.list.length;
  },
                  
  isEmpty: function() {
    return this.list.length == 0;
  }
}