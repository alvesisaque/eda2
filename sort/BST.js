// Constructor for BST
function BST() {
    this.root = null;
    this.size = 0;
}

// Retorna true se o elemento estiver na árvore
BST.prototype.search = function(e) {
    var current = this.root;

    while (current != null) {
        if (e < current.element) {
            current = current.left;
        }
        else if (e > current.element) {
            current = current.right;
        }
        else
            return true;
    }

    return false;
}

// Construtor do nó
function TreeNode(e) {
    this.element = e;
    this.left = null;
    this.right = null;
}

// Insere elemento
BST.prototype.insert = function(e) {
    if (this.root == null)
        this.root = this.createNewNode(e);
    else {
        var parent = null;
        var current = this.root;
        while (current != null)
            if (e < current.element) {
                parent = current;
                current = current.left;
            }
            else if (e > current.element) {
                parent = current;
                current = current.right;
            }
            else
                return false;

        if (e < parent.element) {
            parent.left = this.createNewNode(e);
        }
        else {
            parent.right = this.createNewNode(e);
        }
    }

    this.size++;
    return true;
}

BST.prototype.createNewNode = function(e) {
    return new TreeNode(e);
}

//Deleta elemento
BST.prototype.remove = function(e) {
    var parent = null;
    var current = this.root;
    while (current != null) {
        if (e < current.element) {
            parent = current;
            current = current.left;
        }
        else if (e > current.element) {
            parent = current;
            current = current.right;
        }
        else
            break;
    }

    if (current == null)
        return false;

    // Caso 1: verifica se tem filhos
    if (current.left == null) {
        if (parent == null) {
            root = current.right;
        }
        else {
            if (e < parent.element)
                parent.left = current.right;
            else
                parent.right = current.right;
        }
    }
    else {
        // Case 2: O nó atual tem um filho esquerdo
        var parentOfRightMost = current;
        var rightMost = current.left;

        while (rightMost.right != null) {
            parentOfRightMost = rightMost;
            rightMost = rightMost.right;
        }

        current.element = rightMost.element;
        if (parentOfRightMost.right == rightMost)
            parentOfRightMost.right = rightMost.left;
        else
            parentOfRightMost.left = rightMost.left;
    }

    this.size--;
    return true;
}

// Retorna true se a árvore estiver vazia 
BST.prototype.isEmpty = function() {
    return this.root == null;
}

// Tamanho da arvore 
BST.prototype.getSize = function() {
    return this.size;
}

// Retorna um caminho da raiz que leva ao elemento especificado
BST.prototype.path = function(e) {
    list = [];
    var current = this.root;

    while (current != null) {
        list.push(current);
        if (e < current.element) {
            current = current.left;
        }
        else if (e > current.element) {
            current = current.right;
        }
        else
            break;
    }

    return list;
}

BST.prototype.getRoot = function() {
    return this.root;
}

BST.prototype.getInorder = function(root) {
    if (root != null)
        return this.getInorder(root.left) + " " + root.element + " " +
                this.getInorder(root.right);
    else
        return "";
}

BST.prototype.getPreorder = function(root) {
    if (root != null) {       
        return root.element + " " + this.getPreorder(root.left) 
                + " " + this.getPreorder(root.right);
    }
    else
        return "";
}

BST.prototype.getPostorder = function(root) {
    if (root != null)
        return this.getPostorder(root.left) + " " +
                this.getPostorder(root.right) + " " + root.element;
    else
        return "";
}