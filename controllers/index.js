





$.win_main.open();
get_main_menu();
//getNews();



$.main_menu.setVisible(false);

var menu_json;
var news_current_section;

var animate_left = Ti.UI.createAnimation({
	left: '0',
	duration: 200,
});

var animate_right = Ti.UI.createAnimation({
	left: '150',
	duration: 200,
});

var disappear_left = Ti.UI.createAnimation({
	left: '-120%',
	duration: 200,
});

var disappear_right = Ti.UI.createAnimation({
	left: '120%',
	duration: 200,
});


var touch_pos = {"x1":0,"y1":0,"x2":0,"y2":0};
var current_pos = {"left":0,"top":0};

$.view_swipe_d.setLeft(140);
$.view_swipe_d.setTop(5);
//$.view_swipe.setLeft(140);
//$.view_swipe.setTop(5);

current_pos.left = $.view_swipe_d.getLeft();
current_pos.top = $.view_swipe_d.getTop();
//current_pos.left = $.view_swipe.getLeft();
//current_pos.top = $.view_swipe.getTop();

$.view_swipe.addEventListener('touchstart',function(e) {
	touch_pos.x1 = e.x;
	touch_pos.y1 = e.y;
	$.lbl_x1.setText("x1:"+touch_pos.x1);
	$.lbl_y1.setText("y1:"+touch_pos.y1);
});

$.view_swipe.addEventListener('touchmove',function(e) {
	touch_pos.x2 = e.x;
	touch_pos.y2 = e.y;
	$.lbl_x2.setText("x2:"+touch_pos.x2);
	$.lbl_y2.setText("y2:"+touch_pos.y2);
	
	var diff_x = touch_pos.x2-touch_pos.x1;
	var diff_y = touch_pos.y2-touch_pos.y1;
	var new_x =  current_pos.left- 0 + diff_x;
	var new_y =  current_pos.top- 0 + diff_y;
	
	$.view_swipe_d.setLeft(new_x);
	$.view_swipe_d.setTop(new_y);
	//$.view_swipe.setLeft(new_x);
	//$.view_swipe.setTop(new_y);

});

$.view_swipe.addEventListener('touchend',function(e) {
	touch_pos.x2 = e.x;
	touch_pos.y2 = e.y;
	
	current_pos.left = $.view_swipe_d.getLeft();
	current_pos.top = $.view_swipe_d.getTop();
	//current_pos.left = $.view_swipe.getLeft();
	//current_pos.top = $.view_swipe.getTop();
	
});

var news_touch_pos = {"x1":0,"y1":0,"x2":0,"y2":0};
/*
$.news_data.addEventListener('touchstart',function(e) {
	news_touch_pos.x1 = e.x;
	news_touch_pos.y1 = e.y;
	$.lbl_x1.setText("x1:"+news_touch_pos.x1);
	$.lbl_y1.setText("y1:"+news_touch_pos.y1);
});

$.news_data.addEventListener('touchmove',function(e) {
	news_touch_pos.x2 = e.x;
	news_touch_pos.y2 = e.y;
	$.lbl_x2.setText("x2:"+news_touch_pos.x2);
	$.lbl_y2.setText("y2:"+news_touch_pos.y2);
	
	

});

$.news_data.addEventListener('touchend',function(e) {
	news_touch_pos.x2 = e.x;
	news_touch_pos.y2 = e.y;
	
	var diff_x = Math.abs(news_touch_pos.x2-news_touch_pos.x1);
	var diff_y = Math.abs(news_touch_pos.y2-news_touch_pos.y1);
	
	if (diff_x>80 && diff_x>diff_y && diff_y<80) {
		if (news_touch_pos.x2 > news_touch_pos.x1) {
			news_prev_section();
		} else {
			news_next_section();
		}
	}
	
});
*/

$.news_data.addEventListener('swipe',function(e) {
	var d = e.direction;
	
	//alert('swipe:'+d);
	if (d=='left') {
		news_next_section();
	}
	if (d=='right') {
		news_prev_section();
	}
});

var ga_t = require("analytics.google");
ga_t.dispatchInterval = 10;
var tt = ga_t.getTracker("UA-60623337-9");

$.news_data.addEventListener('click',function(e) {
	
	/*

	// track an event
	tt.trackEvent({
  		category: "jc_cat",   // required
  		action: "jc_act",         // required
  		label: "jc_label",
  		value: 1
	});	
	*/
	
	var r_ind = e.row.r_ind;
	var r_title = e.row.children[0].text;
	alert('id5:'+r_ind+', t:'+r_title);
});

function open_win(e) {
	//alert('open_win');
	
	var args = {};
	args.msg = "open_story";
	Alloy.createController('story',args);
}

function toggle_menu(e) {
	//alert("toggle_menu");
	
	if ($.main_menu.getVisible()) {
		$.main_menu.setVisible(false);
		$.news_data.animate(animate_left);
	} else {
		$.main_menu.setVisible(true);
		$.news_data.animate(animate_right);
	}
}

function news_prev_section(e) {
	$.news_data.animate(disappear_right);
	
	news_current_section--;
	var sect = menu_json.menu[news_current_section].title;
	$.section_cur.setText("Sect:"+sect);
	
	var url = menu_json.menu[news_current_section].link;
	var e_data = {"data":{"url":url}};
	get_news_section(e_data);
}

function news_next_section(e) {
	$.news_data.animate(disappear_left);
	
	news_current_section++;
	var sect = menu_json.menu[news_current_section].title;
	$.section_cur.setText("Sect:"+sect);
	
	var url = menu_json.menu[news_current_section].link;
	var e_data = {"data":{"url":url}};
	get_news_section(e_data);
	
	
}

function get_main_menu(e) {
	$.xhr_status.setText("Loading Main Menu");
	//var xhr_url = "http://digstephens.newsengin.com/atom3/reviewjournal/manifest.json";
	var xhr_url = "http://digstephens.newsengin.com/atom3/businesspress/manifest.json";
	var xhr_method = "GET";
	var xhr_data = {};
	var xhr_fn_callback = render_main_menu;
	var xhr_fn_args = {};//{"eid":"test_eid"};
	var xhr_time_out = 2000;
	var xhr_error_msg = "can not load main menu";
	
	var xhr_data = {"data":{"xhr_url":xhr_url,"xhr_method":xhr_method,"xhr_data":xhr_data,"xhr_fn_callback":xhr_fn_callback,"xhr_fn_args":xhr_fn_args,"xhr_time_out":xhr_time_out,"xhr_error_msg":xhr_error_msg}};
	get_xhr(xhr_data);
}


function render_main_menu(e) {
	
	$.xhr_status.setText("Loaded Main Menu");
	
	var xhr_response = e.data.xhr_response;
	//var eid = e.data.xhr_fn_args.eid;
	
	menu_json = JSON.parse(xhr_response);
	var menu_data = [];
	var menu_row;
	var menu_lable;
	var menu_title;
	var menu_link;
	
	for (i=0; i<menu_json.menu.length; i++) {
		
		menu_title = menu_json.menu[i].title;
		
		menu_label = $.UI.create('Label',{  
			text: menu_title,
			classes: ['menu_label'],   
			 
		});
		
		menu_row = $.UI.create('TableViewRow',{
			classes: ['menu_row'],
		});
		
	
		menu_row.add(menu_label);
		
		menu_data[i] = menu_row; 
	}
	$.main_menu.data = menu_data;
	
	var url = menu_json.menu[0].link;
	var e_data = {"data":{"url":url}};
	news_current_section = 0;
	get_news_section(e_data);
}

function get_news_section(e) {
	var url = e.data.url;
	//alert(url);
	
	$.xhr_status.setText("Loading News Section");
	var xhr_url = url;
	var xhr_method = "GET";
	var xhr_data = {};
	var xhr_fn_callback = render_news_section;
	var xhr_fn_args = {};//{"eid":"test_eid"};
	var xhr_time_out = 2000;
	var xhr_error_msg = "can not load news section";
	
	var xhr_data = {"data":{"xhr_url":xhr_url,"xhr_method":xhr_method,"xhr_data":xhr_data,"xhr_fn_callback":xhr_fn_callback,"xhr_fn_args":xhr_fn_args,"xhr_time_out":xhr_time_out,"xhr_error_msg":xhr_error_msg}};
	get_xhr(xhr_data);
	
}

function render_news_section(e) {
	$.xhr_status.setText("Loaded News Section");
	
	var xhr_response = e.data.xhr_response;
	//var eid = e.data.xhr_fn_args.eid;
	
	var d_json = JSON.parse(xhr_response);
	
	
	//begin_ga
	var ga_eid = "jcid_"+d_json.title;
	var ga_etype = "jctyp_section"
	var ga_section = "jcsect_"+d_json.title;
	var ga_title = "jctit_"+d_json.title;
	//alert(ga_eid+"_"+ga_etype+"_"+ga_section+"_"+ga_title);
	alert(ga_eid+"_"+ga_etype);
	
	tt.trackScreen({
  		screenName: ga_title,   
  		customVar: {
  			"1": ga_eid,
  			"2": ga_etype,
  			"3": ga_section
  		}
	});	
	//end_ga
	
	var d_title;
	var d_img;
	var d_link;
	
	var e_data = [];
	var e_row;
	var e_lable;
	var e_img;
	
	var default_img = "/cat.jpg";
	
	for (i=0; i<d_json.data.length; i++) {
		
		d_title = d_json.data[i].title;
		
		d_img = default_img;
		if (d_json.data[i].images.length>0) {
			d_img = d_json.data[i].images[0].links[0];
			d_img = d_img.replace(/ +/g,'');
		}
		
		
		e_label = $.UI.create('Label',{  
			text: d_title,
			classes: ['news_title'],   
			 
		});
		
		
		//e_img = $.UI.create('ImageView',{  
		//	image: d_img,
		//	classes: ['news_image'],
		//});
		
		e_row = $.UI.create('TableViewRow',{
			classes: ['news_row'],
			r_ind: i,
		});
		
	
		//e_row.add(e_img);
		e_row.add(e_label);
		
		e_data[i] = e_row; 
	}
	$.news_data.data = e_data;
	$.news_data.scrollToTop(0);
	$.news_data.setLeft(0);
}

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

function getNews(e) {
	var news_data = [];
	var news_row;
	
	var news_table;
	var news_image;
	var news_title;
	var news_title_tmp;
	var imgs = getNewsImg();
	
	
	for (i=0; i<9; i++) {
		
		news_title_tmp = 'Titlev1_'+i;
		
		news_image = $.UI.create('ImageView',{  
			image: imgs[i],
			classes: ['news_image'],
			
		});
		
		news_title = $.UI.create('Label',{  
			text: news_title_tmp,
			classes: ['news_title'],   
			 
		});
		
		news_row = $.UI.create('TableViewRow',{
			classes: ['news_row'],
		});
		
		news_row.add(news_image); 
		news_row.add(news_title);
		
		news_data[i] = news_row; 
	}
	$.news_data.data = news_data;

}
function getNewsImg(e) {
	imgs = new Array('/cat.jpg','/dog.jpg','/cow.jpg','/cat.jpg','/dog.jpg','/cow.jpg','/cat.jpg','/dog.jpg','/cow.jpg');
	return imgs;
}




function addBtnFn(e) {
	var btns = $.view_btn.children;
	for (var i = 0 ; i < btns.length; i++) {
    	btns[i].addEventListener('click',btnClick);
   
	}
}

function btnClick(e) {
	var id = parseInt(e.source.id.toString().split("_")[1])-1;
	var lbls = $.view_lbl.children;
	var lbl = lbls[id];
	var v = lbl.getVisible();
	if (v == false) {  
		lbl.setVisible(true);
	} else {
		lbl.setVisible(false);
	}
}


/*
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function()
{
	Titanium.API.info('loaded');
	alert('load_a');
 
};
xhr.onerror = function()
{
	Titanium.API.info('error');
	alert('error_a');
};
xhr.open("GET","http://google.com");
xhr.send();
*/


 /*
// create base UI tabs and  windows
var table1 =  Titanium.UI.createTableView({
	data:[
		{title:"Row 1 - simple row"},
		{title:"Row 2 -  with child", hasChild:true},
		{title:"Row 3 -  with detail", hasDetail:true},
		{title:"Row 4 -  with check", hasCheck:true},
		{title:"Row 5 -  red background", backgroundColor:"#f00"}
	]	
});

var win1 = Titanium.UI.createWindow({  
    title:'Win 1',
    backgroundColor:'#fff'
});
 
win1.add(table1);

var tab1 = Titanium.UI.createTab({  
    title:'Tab 1',
    window:win1
});

var section21 = Titanium.UI.createTableViewSection();
section21.headerTitle = "Hello1";
var row211 = Titanium.UI.createTableViewRow({title:"Hello 1"});
var row212 = Titanium.UI.createTableViewRow({title:"Hello 2"});
section21.add(row211);
section21.add(row212);
 
var section22 = Titanium.UI.createTableViewSection();
section22.headerTitle = "Hello2";
var row221 = Titanium.UI.createTableViewRow({title:"Hello 3"});
var row222 = Titanium.UI.createTableViewRow({title:"Hello 4"});
section22.add(row221);
section22.add(row222);

var picker2 = Titanium.UI.createPicker();
var data2 = [];
data2.push(Titanium.UI.createPickerRow({title:'Bananas'}));
data2.push(Titanium.UI.createPickerRow({title:'Strawberries'}));
data2.push(Titanium.UI.createPickerRow({title:'Mangos'}));
data2.push(Titanium.UI.createPickerRow({title:'Grapes'}));
picker2.add(data2);

var table2 =  Titanium.UI.createTableView({
});
 
table2.setData([section21,section22]);

var win2 = Titanium.UI.createWindow({  
    title:'Win 2',
    backgroundColor:'#fff'
});


win2.add(table2);
win2.add(picker2);

var tab2 = Titanium.UI.createTab({  
    title:'Tab 2',
    window:win2
});
 

var img3 = Titanium.UI.createImageView({ 
image:"cat.jpg"
});
 
var win3 = Titanium.UI.createWindow({  
    title:'Win 3',
    backgroundColor:'#fff'
});
 
win3.add(img3); 
var tab3 = Titanium.UI.createTab({  
    title:'Tab 3',
    window:win3
});


var picker4 = Titanium.UI.createPicker();
var data4 = [];
data4.push(Titanium.UI.createPickerRow({title:'Bananas'}));
data4.push(Titanium.UI.createPickerRow({title:'Strawberries'}));
data4.push(Titanium.UI.createPickerRow({title:'Mangos'}));
data4.push(Titanium.UI.createPickerRow({title:'Grapes'}));
picker4.add(data4);

var win4 = Titanium.UI.createWindow({  
    title:'win 4',
    backgroundColor:'#fff'
});
 
win4.add(picker4 ); 
var tab4 = Titanium.UI.createTab({  
    title:'Tab 4',
    window:win4
});



//  add tab 
var tabGroup = Titanium.UI.createTabGroup();
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);    
// open tab group
tabGroup.open();
*/
