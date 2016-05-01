'use strict';

function BaseComponent(data, element) {
  this.data = data;
  this.element = element;
}

BaseComponent.prototype.create = function() {
  this.container.appendChild(this.element);
};

BaseComponent.prototype.remove = function() {
  this.element.parentNode.removeChild(this.element);
};

module.exports = BaseComponent;
