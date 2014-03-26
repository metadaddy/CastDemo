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

`castdemoreceiver.page` and `vf-chromecast` comprise a more elaborate demo. `vf-chromecast` allows you to login and select a Visualforce page to cast to the device. `castdemoreceiver.page` loads the Visualforce page into an iframe, and remains active, waiting for further commands and periodically refreshing the page.

Read More
---------
A series of three blog posts I wrote on this project:

* [Getting Started with Chromecast on Visualforce](http://blog.superpat.com/2014/03/07/getting-started-with-chromecast-on-visualforce/)
* [Display ANY Visualforce Page on Google Chromecast](http://blog.superpat.com/2014/03/21/display-any-visualforce-page-on-google-chromecast/)
* [Visualforce on Chromecast, as a Service!](http://blog.superpat.com/2014/03/25/visualforce-on-chromecast-as-a-service/)