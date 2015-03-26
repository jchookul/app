
var args = arguments[0] || {};
var msg = args.msg;

$.win_story.open();

alert("msg:"+msg);

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
		alert('not_create_dir')
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
