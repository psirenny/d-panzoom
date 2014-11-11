function Component () {}

Component.prototype._panzoom = {};

Component.prototype._panzoom.events = [
  'change',
  'end',
  'pan',
  'reset',
  'start',
  'zoom'
];

Component.prototype._panzoom.methods = [
  'destroy',
  'disable',
  'enable',
  'reset',
  'resetDimensions',
  'resetPan',
  'resetZoom',
  'zoom'
];

Component.prototype._panzoom.options = [
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

  this._panzoom.options.forEach(function (name) {
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

  this._panzoom.options.forEach(function (name) {
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

  this._panzoom.events.forEach(function (name) {
    var fn = 'on' + name[0].toUpperCase() + name.substring(1);
    options[fn] = function () {
      var args = [].splice.call(arguments, 2);
      args = [name].concat(args);
      self.emit.apply(self, args);
    };
  });

  $(this.image).panzoom(options);
};

Component.prototype._panzoom.methods.forEach(function (name) {
  Component.prototype[name] = function () {
    var args = [name].concat([].splice.call(arguments));
    var $image = $(this.image);
    $image.panzoom.apply($image, args);
  };
});

module.exports = Component;
