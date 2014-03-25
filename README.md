Load Visualforce Pages on Google Chromecast
===========================================

Try it out!
-----------

Go to https://vf-chromecast.herokuapp.com/ and follow the instructions to cast a Visualforce Page to Google Chromecast!

CastHelloText
-------------

`receiver.page` and `chromehellotext.page` (in `src/pages`) are simply the [https://github.com/googlecast](Google Cast Sample) [CastHelloText-chrome](https://github.com/googlecast/CastHelloText-chrome) pages ported to Visualforce. They need to be exposed via a Force.com Site. You should register a new app in the [Google Cast SDK Developer Console](https://cast.google.com/publish/) with the appropriate Site URL for `receiver.page`, and paste the application ID into `chromehellotext.page`.

CastVisualforce
---------------

`castdemoreceiver.page` and `NodeCast` comprise a more elaborate demo. `NodeCast` allows you to login and select a Visualforce page to cast to the device. `castdemoreceiver.page` loads the Visualforce page into an iframe, and remains active, waiting for further commands and periodically refreshing the page.