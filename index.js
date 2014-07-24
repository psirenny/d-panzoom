function Component () {};

Component.prototype._events = [
  'change',
  'end',
  'pan',
  'reset',
  'start',
  'zoom'
];

Component.prototype._methods = [
  'destroy',
  'disable',
  'enable',
  'reset',
  'resetDimensions',
  'resetPan',
  'resetZoom',
  'zoom'
];

Component.prototype._options = [
  'contain',
  'cursor',
  'disablePan',
  'disableZoom',
  'duration',
  'easing',
  'eventNamespace',
  'increment',
  'maxScale',
  'minScale',
  'rangeStep',
  'startTransform',
  'transition'
];

Component.prototype.init = function (model) {
  var self = this;

  this._options.forEach(function (name) {
    var value = model.get(name);
    if (typeof value === 'undefined') return;
    model.set('options.' + name, value);
  });
};

Component.prototype.create = function (model) {
  var self = this;

  model.on('change', 'options', function (options) {
    $(self.image).panzoom('option', options);
  });

  model.on('change', 'options.*', function (name, value) {
    $(self.image).panzoom('option', name, value);
  });

  this._options.forEach(function (name) {
    model.on('change', name, function (value) {
      model.set('options.' + name, value);
    });
  });

  if (this.image.src) {
    panzoom();
  }
};

Component.prototype.panzoom = function () {
  var self = this;
  var options = this.model.get('options') || {};

  if (this.range) {
    options.$zoomRange = $(this.range);
  }

  this._events.forEach(function (name) {
    var fn = 'on' + name[0].toUpperCase() + name.substring(1);
    options[fn] = function () {
      var args = [].splice.call(arguments, 2);
      args = [name].concat(args);
      self.emit.apply(self, args);
    };
  });

  $(this.image).panzoom(options);
};

Component.prototype._methods.forEach(function (name) {
  Component.prototype[name] = function () {
    $(this.image).panzoom(name).apply(this, arguments);
  };
});

module.exports = Component;
