
var args = arguments[0] || {};
var url = args.story_url;
var news_data = {};
$.win_story.open();

var e_data = {"data":{"url":url}};

get_story(e_data);



function get_story(e) {
	var url = e.data.url;
	
	alert("Loading Story v3");
	var xhr_url = url;
	var xhr_method = "GET";
	var xhr_data = {};
	var xhr_fn_callback = render_story;
	var xhr_fn_args = {};//{"eid":"test_eid"};
	var xhr_time_out = 2000;
	var xhr_error_msg = "can not load story";
	
	var xhr_data = {"data":{"xhr_url":xhr_url,"xhr_method":xhr_method,"xhr_data":xhr_data,"xhr_fn_callback":xhr_fn_callback,"xhr_fn_args":xhr_fn_args,"xhr_time_out":xhr_time_out,"xhr_error_msg":xhr_error_msg}};
	get_xhr(xhr_data);
}

function render_story(e) {
	
	var xhr_response = e.data.xhr_response;
	//var eid = e.data.xhr_fn_args.eid;
	
	var d_json = JSON.parse(xhr_response);
	
	var ga_eid = "jc4id_"+d_json.id;
	var ga_etype = "jc4typ_story";
	var ga_esection = "jc4sect_"+d_json.category[0];
	var ga_title = "jc4tit_"+d_json.title;
	
	news_data.title = ga_title;

	Alloy.Globals.ga_track.trackScreen({
  		screenName: ga_title,   
  		customDimension: {
  			"1": ga_eid,
  			"2": ga_etype,
  			"3": ga_esection,
  		}
	});	
	
	alert(news_data.title);
	
}


function clk_img1(e) {
	
	Alloy.Globals.ga_track.trackEvent({
  		category: "jc4_img",   // required
  		action: "jc4_vimg1", // required
  		label: news_data.title,
  		value: 1
	});
	
	alert("clk_img1_"+news_data.title);	
}

function clk_img2(e) {
	
	Alloy.Globals.ga_track.trackEvent({
  		category: "jc4_img",   // required
  		action: "jc4_vimg2", // required
  		label: news_data.title,
  		value: 1
	});
	
	alert("clk_img2"+news_data.title);	
}

function clk_fb(e) {
	
	Alloy.Globals.ga_track.trackEvent({
  		category: "jc4_social",   // required
  		action: "jc4_fb", // required
  		label: news_data.title,
  		value: 1
	});
	
	
	alert("clk_fb_"+news_data.title);	
}

function clk_tt(e) {
	
	Alloy.Globals.ga_track.trackEvent({
  		category: "jc4_social",   // required
  		action: "jc4_tt", // required
  		label: news_data.title,
  		value: 1
	});
	
	
	alert("clk_tt_"+news_data.title);	
}

function story_close(e) {
	$.win_story.close();

}

function create_file(e) {
	var myDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,            
    	'jc_folder');
	if (! myDir.exists()) {
    	myDir.createDirectory();
    	alert("create_dir");
	} else {
		alert('not_create_dir');
	}

	// .resolve() provides the resolved native path for the directory.
	var myFile  = Ti.Filesystem.getFile(myDir.resolve(), 'jc_file.txt');
	Ti.API.info("ImageFile path is: " + myFile.resolve());
	
	var msg_old = "";
	if (myFile.exists()) {
		msg_old = myFile.read().toString();
	}
	var msg_new = msg_old+"jc_line1\n";
	
	if (myFile.write(msg_new)===false) {
    	alert("write_error");
	} else {
		alert("write_success");
	}
	
	// dispose of file handles
	myFile = null;
	myDir = null;
	

	alert('create_file');
}

function read_file(e) {
	var myDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'jc_folder');
	if (! myDir.exists()) {
    	alert("dir_not_exist");
	} else {
		alert('dir_exist');
	}
	
	var myFile  = Ti.Filesystem.getFile(myDir.resolve(), 'jc_file.txt');
	if (! myFile.exists()) {
    	alert("file_not_exist");
	} else {
		alert('file_exist');
		var msg  = myFile.read().toString();
		alert(msg);
	}
}
