Array.prototype.each = function(callback) {
  var i = 0;
  while (i < this.length) {
    callback.call(this, this[i]);
    i++;
  }
  return this;
};

Array.prototype.map = function(callback) {
  var i = this.length;
  var found = []
  while (i--) {
    if(callback.call(this, this[i])) {
      found.push(this[i]);
    }
  }
  return found;
};

Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};

Array.prototype.remove = function(element) {
  for(var i=0; i<this.length;i++ ) {
    if(this[i]==element) {
      this.splice(i,1);
      break;
    }
  }
};
