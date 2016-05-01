'use strict';

function BaseComponent(data, container) {
  this.element = data;
  this.container = container;
}

BaseComponent.prototype.create = function() {
  this.container.appendChild(this.element);
};

BaseComponent.prototype.remove = function() {
  this.element.parentNode.removeChild(this.element);
};

module.exports = BaseComponent;
