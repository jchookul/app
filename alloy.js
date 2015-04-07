// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

var ga_inst = require("analytics.google");
ga_inst.dispatchInterval = 10;
Alloy.Globals.ga_track = ga_inst.getTracker("UA-60623337-12");

Alloy.Globals.device_os = 'android';
Alloy.Globals.device_token = "this is devtoken";


function get_xhr(e) {
	var xhr_url = e.data.xhr_url;
	var xhr_method = e.data.xhr_method;
	var xhr_data = e.data.xhr_data;
	var xhr_fn_callback = e.data.xhr_fn_callback;
	var xhr_fn_args = e.data.xhr_fn_args;
	var xhr_time_out = e.data.xhr_time_out;
	var xhr_error_msg = e.data.xhr_error_msg;
	var xhr_response;
	
	var xhr = Ti.Network.createHTTPClient({
		timeout: xhr_time_out,
		onload: function(e){
			xhr_response = {"data":{"xhr_response":xhr.responseText,"xhr_fn_args":xhr_fn_args}};
			xhr_fn_callback(xhr_response);
		},
		onerror: function(e){
			$.xhr_status.setText(xhr_error_msg+":"+e.error);
		},
	});
	
	xhr.open(xhr_method,xhr_url);
	xhr.send(xhr_data);
	
}
