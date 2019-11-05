// Construtor da RBTree
function RBTree() {
    BST.call(this);
}

RBTree.prototype = new BST(); // Herança
RBTree.prototype.constructor = RBTree;

RBTreeNode.prototype = new TreeNode(); // Herança
RBTreeNode.prototype.constructor = RBTreeNode;

// Construtor do nó
function RBTreeNode(e) {
    this.red = true; // Seta a cor do nó
    this.blackHeight = 0;
    TreeNode.call(this, e);
}

RBTreeNode.prototype = {
    isRed: function() {
        return this.red;
    },
    
    isBlack: function() {
        return !this.red;
    },
    
    setBlack: function() {
        this.red = false;
    },
    
    setRed: function() {
        this.red = true;
    }
}

// Substituir o método createNewNode
RBTree.prototype.createNewNode = function(e) {
    return new RBTreeNode(e);
}

// Insere novo elemento
RBTree.prototype.insert = function(e) {
    var successful = BST.prototype.insert.call(this, e);
    if (!successful)
        return false;
    else {
        this.ensureRBTree(e);
    }

    return true; // e is inserted
}

//Verifique se a árvore é uma árvore vermelha e preta
RBTree.prototype.ensureRBTree = function(e) {
    var path = this.path(e);
    var i = path.length - 1; 
    var u = path[i];
    var v = (u == this.root) ? null : path[i - 1];
    u.setRed();
    if (u == this.root)
        u.setBlack();
    else if (v.isRed())
        this.fixDoubleRed(u, v, path, i);
}

//Corrija a violação vermelha 
RBTree.prototype.fixDoubleRed = function(u, v, path, i) {
    var w = path[i - 2];
    parentOfw = (w == this.root) ? null : path[i - 3];
    x = (w.left == v) ? w.right : w.left;
    if (x == null || x.isBlack()) {
        if (w.left == v && v.left == u) {
            this.restructureRecolor(u, v, w, w, parentOfw);
            w.left = v.right;
            v.right = w;
        }
        else if (w.left == v && v.right == u) {
            this.restructureRecolor(v, u, w, w, parentOfw);
            v.right = u.left;
            w.left = u.right;
            u.left = v;
            u.right = w;
        }
        else if (w.right == v && v.right == u) {
            this.restructureRecolor(w, v, u, w, parentOfw);
            w.right = v.left;
            v.left = w;
        }
        else {
            this.restructureRecolor(w, u, v, w, parentOfw);
            w.right = u.left;
            v.left = u.right;
            u.left = w;
            u.right = v;
        }
    }
    else { // Caso 2: o irmão x de v é vermelho 
        w.setRed();
        u.setRed();
        (w.left).setBlack();
        (w.right).setBlack();

        if (w == this.root) {
            w.setBlack();
        }
        else if (parentOfw.isRed()) {
            u = w;
            v = parentOfw;
            this.fixDoubleRed(u, v, path, i - 2);
        }
    }
}

RBTree.prototype.restructureRecolor = function(a, b, c, w, parentOfw) {
    if (parentOfw == null)
        this.root = b;
    else if (parentOfw.left == w)
        parentOfw.left = b;
    else
        parentOfw.right = b;

    b.setBlack();
    a.setRed();
    c.setRed();
}

//Exclua o último nó do caminho
RBTree.prototype.deleteLastNodeInPath = function(path) {
    var i = path.length - 1; 
    var u = path[i];
    var parentOfu = (u == this.root) ? null : path[i - 1];
    var grandparentOfu = (parentOfu == null ||
            parentOfu == this.root) ? null : path[i - 2];
    var childOfu = (u.left == null) ? u.right : u.left;

    this.connectNewParent(parentOfu, u, childOfu);

    // Colorir os nós e corrigir preto duplo, se necessário
    if (childOfu == this.root || u.isRed())
        return;
    else if (childOfu != null && childOfu.isRed())
        childOfu.setBlack();
    else
        this.fixDoubleBlack(grandparentOfu, parentOfu, childOfu, path, i);
}

// Corrige o preto duplo pai e no nó
RBTree.prototype.fixDoubleBlack = function(grandparent, parent, db, path, i) {
    // Obtain y, y1, and y2
    var y = (parent.right == db) ? parent.left : parent.right;
    var y1 = y.left;
    var y2 = y.right;

    if (y.isBlack() && y1 != null && y1.isRed()) {
        if (parent.right == db) {
            this.connectNewParent(grandparent, parent, y);
            this.recolor(parent, y, y1);

            parent.left = y.right;
            y.right = parent;
        }
        else {
            this.connectNewParent(grandparent, parent, y1);
            this.recolor(parent, y1, y);

            parent.right = y1.left;
            y.left = y1.right;
            y1.left = parent;
            y1.right = y;
        }
    }
    else if (y.isBlack() && y2 != null && y2.isRed()) {
        if (parent.right == db) {
            this.connectNewParent(grandparent, parent, y2);
            this.recolor(parent, y2, y);

            y.right = y2.left;
            parent.left = y2.right;
            y2.left = y;
            y2.right = parent;
        }
        else {
            this.connectNewParent(grandparent, parent, y);
            this.recolor(parent, y, y2);

            y.left = parent;
            parent.right = y1;
        }
    }
    else if (y.isBlack()) {
        // Caso 2: y é preto e os filhos de y são pretos ou nulos
        y.setRed(); 
        if (parent.isRed())
            parent.setBlack();
        else if (parent != this.root) {
            db = parent;
            parent = grandparent;
            grandparent = (i >= 3) ? path[i - 3] : null;
            this.fixDoubleBlack(grandparent, parent, db, path, i - 1);
        }
    }
    else { // y.isRed()
        if (parent.right == db) {
            // y é um filho vermelho esquerdo do pai
            parent.left = y2;
            y.right = parent;
        }
        else {
            // y é um filho vermelho à direita do pai
            parent.right = y.left;
            y.left = parent;
        }

        parent.setRed(); 
        y.setBlack(); 
        this.connectNewParent(grandparent, parent, y);
        this.fixDoubleBlack(y, parent, db, path, i - 1);
    }
}

//colorir o pai
RBTree.prototype.recolor = function(parent, newParent, c) {
    if (parent.isRed())
        newParent.setRed();
    else
        newParent.setBlack();

    parent.setBlack();
    c.setBlack();
}

/** Conecta o pai com o avo */
RBTree.prototype.connectNewParent = function(grandparent, parent, newParent) {
    if (parent == this.root) {
        this.root = newParent;
        if (this.root != null)
            newParent.setBlack();
    }
    else if (grandparent.left == parent)
        grandparent.left = newParent;
    else
        grandparent.right = newParent;
}

// Localiza o no a ser excluido
RBTree.prototype.delete = function(e) {
    
    var current = this.root;
    while (current != null) {
        if (e < current.element) {
            current = current.left;
        }
        else if (e > current.element) {
            current = current.right;
        }
        else
            break; 
    }

    if (current == null)
        return false; 

    var path;
 
    if (current.left != null && current.right != null) {
        var rightMost = current.left;
        while (rightMost.right != null) {
            rightMost = rightMost.right;
        }

        path = this.path(rightMost.element);

        current.element = rightMost.element;
    }
    else
        path = this.path(e); 

    // Exclua o último nó no caminho e propague, se necessário
    this.deleteLastNodeInPath(path);

    this.size--;
    return true;
}



