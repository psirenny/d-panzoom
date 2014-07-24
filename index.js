function Component () {};

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

  options.onChange = function (e, panzoom, transform) {
    self.emit('change', transform);
  };

  options.onEnd = function (e, panzoom, matrix, changed) {
    self.emit('end', matrix, changed)
  }

  options.onPan = function (e, panzoom, x, y) {
    self.emit('pan', x, y);
  }

  options.onReset = function () {
    self.emit('resize');
  };

  options.onStart = function (e, panzoom, event, touches) {
    self.emit('start', event, touches);
  }

  options.onZoom = function (e, panzoom, scale, opts) {
    self.emit('zoom', scale, opts);
  }

  $(this.image).panzoom(options);
};

Component.prototype.reset = function (options) {
  $(this.image).panzoom('reset', options);
};

Component.prototype.resetPan = function (options) {
  $(this.image).panzoom('resetPan', options);
};

Component.prototype.resetZoom = function (options) {
  $(this.image).panzoom('resetZoom', options);
};

Component.prototype.zoom = function (scale, opts) {
  $(this.image).panzoom('zoom', scale, opts);
};

Component.prototype.zoomIn = function () {
  $(this.image).panzoom('zoom');
};

Component.prototype.zoomOut = function () {
  $(this.image).panzoom('zoom', true);
};

module.exports = Component;
