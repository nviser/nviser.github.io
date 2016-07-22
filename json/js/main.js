$(function () {
	var play,  count = 0;												//input value

	$("#form").submit(function (e) {//function starting after user submit data
		e.preventDefault();
		play = $("#input").val();

		var z = play.replace(/(\s+")|\s+/g,' ').replace(/"$|"\s+|\s+$|^\s+/g,'');
		var s = z.split(' ');
		var emp = [], emp1 = [], del = [], ex = []; count = 0;
		for(var i in s){
			if((s[i]).match(/^\-/g)) {
				del.push((s[i]).substr(1));
				s.splice(i,1);				
			}
		}

		ajax_get('/json/players.json', function(data) { //here should insert right path to 'json' file
			$("#data").html("");
			if(s.length == 1){						//single or multiple query
				foo1();
			} else {
				foo2();
			}

			function foo1(){
				for(var i = 0; i < data.length; i++) {
					for (var k in data[i]){
						var d = data[i][k];
						if (typeof d == "string") {
							var g = d.split(" ");

							if(d == s[0] || g[0] == s[0] || g[1] == s[0] || g[2] == s[0]){
								if(!del[0]) {html = '<h2>'+'Name: <span class="name">'+data[i]["name"]+'</span></h2>'+'<p> Position: '+data[i]["position"]+'</p>'+'<p> Date of birth: '+data[i]["dateOfBirth"]+'</p>'+'<p> Nationality: '+data[i]["nationality"]+'</p>'+'<p> Market value: '+data[i]["marketValue"]+'</p><hr>';
								$(html).appendTo("#data");
								count++;
							} else {
								ex.push(data[i]);
							}
						}
					}
				}
			} 
			if(del[0]) except();
			
			match(); 
		}

		function foo2(){
			for(var i = 0; i < data.length; i++) {
				for (var k in data[i]){
					var d = data[i][k];
					if (typeof d == "string") {
						var g = d.split(" ");
						if(d == s[0] || g[0] == s[0] || g[1] == s[0] || g[2] == s[0]){
							emp.push(data[i]);
						}
					}
				}
			}
			for(var m in emp) {
				for(var j in emp[m]){
					var l = emp[m][j];
					if (typeof l == "string") {
						var f = emp[m][j].split(" ");
						if(emp[m][j] == s[1] || f[0] == s[1] || f[1] == s[1]) {
							if(s.length == 3) {
								emp1.push(emp[m]);
							} else {

								if(del[0]){
									ex.push(emp[m]);
								} else {
									html = '<h2>'+'Name: <span class="name">'+emp[m]["name"]+'</span></h2>'+'<p> Position: '+emp[m]["position"]+'</p>'+'<p> Date of birth: '+emp[m]["dateOfBirth"]+'</p>'+'<p> Nationality: '+emp[m]["nationality"]+'</p>'+'<p> Market value: '+emp[m]["marketValue"]+'</p><hr>';
									$(html).appendTo("#data"); count++;
								}
							} 
						}
					}
				}
			} 
			if(del[0]) except();
			for(var o in emp1) {
				for(var u in emp1[o]){
					var item = emp1[o][u];
					if (typeof item == "string") {
						var splt = emp1[o][u].split(" ");
						if(emp1[o][u] == s[2] || splt[0] == s[2] || splt[1] == s[2] || splt[2] == s[2]) {
							html = '<h2>'+'Name: <span class="name">'+emp1[o]["name"]+'</span></h2>'+'<p> Position: '+emp1[o]["position"]+'</p>'+'<p> Date of birth: '+emp1[o]["dateOfBirth"]+'</p>'+'<p> Nationality: '+emp1[o]["nationality"]+'</p>'+'<p> Market value: '+emp1[o]["marketValue"]+'</p><hr>';
							$(html).appendTo("#data"); count++;
						} 
					}
				}
			}
			match();
		}

	});

function except (){
	for(var cnt = 0; cnt < ex.length; cnt++) {
		for (var n in ex[cnt]){
			var d1 = ex[cnt][n];
			if (typeof d1 == "string") {
				var g1 = d1.split(" ");
				if(ex[cnt][n] == del[0] || g1[0] == del[0] || g1[1] == del[0]){
					delete ex[cnt];
					break;
				}
			}
		}
	}
	for(var v = 0; v < ex.length; v++) {
		if(ex[v]) {
			html = '<h2>'+'Name: <span class="name">'+ex[v]["name"]+'</span></h2>'+'<p> Position: '+ex[v]["position"]+'</p>'+'<p> Date of birth: '+ex[v]["dateOfBirth"]+'</p>'+'<p> Nationality: '+ex[v]["nationality"]+'</p>'+'<p> Market value: '+ex[v]["marketValue"]+'</p><hr>';
			$(html).appendTo("#data");
			count++;
		}
	}
}

});
/*Get data*/
function ajax_get(url, callback) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			try {
				var data = JSON.parse(xmlhttp.responseText);
			} catch(err) {
				console.log(err.message + " in " + xmlhttp.responseText);
				return;
			} 
			callback(data);
		}
	};

	xmlhttp.open("GET", url, true);
	xmlhttp.send();
};

function match () {
	if (count === 0) $('<div class="match">No matches found!</div>').appendTo("#data");
}



}); //End ready
