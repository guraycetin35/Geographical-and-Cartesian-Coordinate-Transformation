var elipsoid={
	"grs80":{
		"a":6378137,"b":6356752.314,"c":6399593.626,
		"e2":0.00669438,"ei2":0.0067394968,
		"alfa":6367449.145771,"beta":16038.508742,"gama":16.832613,"teta":0.021984,"eta":0.000031},
	"hayford":{
		"a":6378388,"b":6356911.946,"c":6399936.608,
		"e2":0.00672267,"ei2":0.00676817,
		"alfa":6367654.500058,"beta":16107.034679,"gama":16.976211,"teta":0.022266,"eta":0.000032
	},

	"bessel":{
		"a":6377397.155,"b":6356078.963,"c":6398786.849,
		"e2":0.00667437,"ei2":0.00671922,
		"alfa":6366742.519778,"beta":15988.639219,"gama":16.729955,"teta":0.021785,"eta":0.000031
	}

}
var pnt=new Array();
var hpnt=new Array();
var map,nokta={nokta1:{enlem:0, boylam:0}};
var marker;
var elevator;
var h=null;
function initMap()  {
	var myLatLng = new google.maps.LatLng(39, 35);
	var mapdiv = document.getElementById('map');
	var mapOptions = {
		center: myLatLng
		, zoom: 5
		, scaleControl: true
		, zoomControl: true
		, panControl: true
		, map: mapdiv
		, mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(mapdiv,mapOptions);
	map.setOptions({ draggableCursor: 'crosshair' });
	elevator=new google.maps.ElevationService();
   
google.maps.event.addListener(map, 'click', function(event) {

		var deger = event.latLng;
		var enlem = deger.lat();
		var boylam = deger.lng();
		
		
   elevator.getElevationForLocations({
    'locations': [event.latLng]}, function(results, status) {
    
    if (status === 'OK') {
    
      if (results[0]) {
		h=results[0].elevation;
      } else 
        h=0;
    } else 
      h=0;
  });		
		
        if(marker)
			marker.setMap(null);
		marker = new google.maps.Marker({
		position: event.latLng,
		map: map,
		title: enlem.toFixed(6) + "," + boylam.toFixed(3) + "," + h.toFixed(2)
		});

        map.setCenter(event.latLng);
		map.setZoom(10);

		nokta.nokta1.enlem=enlem;
		nokta.nokta1.boylam=boylam;

		document.getElementById("enlem1").value=enlem.toFixed(8);
		document.getElementById("boylam1").value=boylam.toFixed(8);
		document.getElementById("elevation").value=h.toFixed(3);
		
});
		
		
}	

function displayLocationElevation(location, elevator, infowindow) {

  elevator.getElevationForLocations({
    'locations': [location]
  }, function(results, status) {
  
    if (status === 'OK') {
      
      if (results[0]) {
      
		h=results[0].elevation;
      } else {
        
      }
    } else {
      
    }
  });
}


	function getelevation()
{

  elevator.getElevationForLocations(pnt[0], function(results, status) {
	  alert(status);
    if (status == google.maps.ElevationStatus.OK) {

      
      if (results[0]) {
         alert(results[0].elevation);
         hpnt[0]=results[0].elevation;
   
         
         
      } else {
        
      }
    } else {
     
    }
  });
}

function V(enlem,ei2) {
	return Math.sqrt(1 + ei2 * Math.pow(Math.cos(enlem), 2))}

function dertorad(a){return (Math.PI*parseFloat(a))/180;}
function rad2der(a){return (180*parseFloat(a))/Math.PI;}


function cografitokartezyen() {
	if(document.getElementById("enlem1").value!=="" && document.getElementById("boylam1").value!==""&& document.getElementById("elevation").value!==""){

	var enlemm=document.getElementById("enlem1").value;
		enlemm = parseFloat(enlemm);
	var boylamm=document.getElementById("boylam1").value;
		boylamm = parseFloat(boylamm);
	var yukseklik=document.getElementById("elevation").value;

	var elipsoidadi=document.getElementById("elipsoitlistesi").value;

	var e2=elipsoid[elipsoidadi].e2;
	var ei2=elipsoid[elipsoidadi].ei2;

	var enlem1=dertorad(enlemm);
	var boylam1=dertorad(boylamm);
	yukseklik=parseFloat(yukseklik);

	var v=  V(enlem1,elipsoid[elipsoidadi].ei2);
	var N= elipsoid[elipsoidadi].c/v;
	var xkor=(N+yukseklik)*(Math.cos(enlem1))*(Math.cos(boylam1));
	var ykor=(N+yukseklik)*(Math.cos(enlem1))*(Math.sin(boylam1));
	var zkor=((N/(1+ei2))+(yukseklik))*(Math.sin(enlem1));

	document.getElementById("x1").value=xkor.toFixed(8);
	document.getElementById("y1").value=ykor.toFixed(8);
	document.getElementById("z1").value=zkor.toFixed(8);

	nokta={nokta1:{enlem:enlemm,boylam:boylamm}};
		var konum=new google.maps.LatLng(enlemm,boylamm);
		if(marker)
			marker.setMap(null);
		marker = new google.maps.Marker({
			position: konum,
			map: map,
			title: enlemm.toFixed(6) + ","+ boylamm.toFixed(3)
		});
		map.setCenter(konum);
		map.setZoom(12);
	}
	else {
alert("Enlem,Boylam,Yükseklik bilgilerini girdiğinizden emin olunuz!")
	}

}

function kartezyontocografi()

{
	if(document.getElementById("x1").value!=="" && document.getElementById("y1").value!==""&& document.getElementById("z1").value!==""){
	var xkorr=document.getElementById("x1").value;
	xkorr = parseFloat(xkorr);
	var ykorr=document.getElementById("y1").value;
	ykorr = parseFloat(ykorr);
	var zkorr=document.getElementById("z1").value;
	zkorr = parseFloat(zkorr);
	var elipsoidadi=document.getElementById("elipsoitlistesi").value;

	var a=elipsoid[elipsoidadi].a;
	var b=elipsoid[elipsoidadi].b;
	var c=elipsoid[elipsoidadi].c;

	var e2=elipsoid[elipsoidadi].e2;
	var ei2=elipsoid[elipsoidadi].ei2;
//enlem
	var p=Math.sqrt(Math.pow(xkorr,2)+Math.pow(ykorr,2));
	var teta= Math.atan((zkorr*a)/(p*b));
	var enlem=Math.atan((zkorr+ei2*b*Math.pow(Math.sin(teta),3))/(p-e2*a*Math.pow(Math.cos(teta),3)));
	var enlem11=rad2der(enlem);
	

	//boylam

	var boylam = Math.atan2(ykorr,xkorr);
	var boylam11=rad2der(boylam);



	// yukseklik
	var v=  V(enlem,elipsoid[elipsoidadi].ei2);
	var N= elipsoid[elipsoidadi].c/v;
	var yukseklik = ((p/Math.cos(enlem))-(N));
	var yukseklik=Math.abs(yukseklik);

	document.getElementById("enlem1").value=enlem11.toFixed(8);
	document.getElementById("boylam1").value=boylam11.toFixed(8);
	document.getElementById("elevation").value=yukseklik.toFixed(3);

	nokta={nokta1:{enlem:enlem11, boylam:11}};
	var konum=new google.maps.LatLng(enlem11,boylam11);
	if(marker)
			marker.setMap(null);
	marker = new google.maps.Marker({
	    position: konum,
		map: map,
		title: enlem11.toFixed(6) + ","+ boylam11.toFixed(3)
		});
        map.setCenter(konum);
		map.setZoom(12);
	}
	else {
		alert("X,Y,Z değerlerini girdiğinizden emin olunuz!")
	}
}

setTimeout(function(){
	document.getElementById("map").removeAttribute("style");
	document.getElementById("map").setAttribute("class","map2");
},100);

function temizle(){
	document.getElementById("enlem1").value = '';
	document.getElementById("boylam1").value = '';
	document.getElementById("elevation").value = '';
	document.getElementById("x1").value = '';
	document.getElementById("y1").value = '';
	document.getElementById("z1").value = '';
	marker.setMap(null);

}

