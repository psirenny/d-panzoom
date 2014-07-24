Derby Panzoom
=============

A [Derby JS](http://derbyjs.com) component for [jQuery Panzoom](https://github.com/timmywil/jquery.panzoom).
Refer to the jQuery Panzoom docs for details about options and events.

Installation
------------

    $ npm install d-panzoom --save

Dependencies
------------

This component requires [jQuery Panzoom](https://github.com/timmywil/jquery.panzoom) in order to work.
It does not include the script so must include it in the page.

Usage
-----

Create a view:

    <panzoom:>
      <img alt="" as="image" src="{{@src}}">
      <button on-click="zoom()" type="button">Zoom in</button>
      <button on-click="zoom(true)" type="button">Zoom out</button>
      <label>Slide to zoom in or out</label>
      <input as="range" type="range">
      <button on-click="reset()">Reset</button>

Associate the view with the component:

    app.use('panzoom', require('d-panzoom'));

Use the view:

    <Scripts:>
      <script src="jquery.panzoom.js">

    <Body:>
      <view name="panzoom" minScale="1" maxScale="5" src="...">
