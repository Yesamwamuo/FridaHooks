function printMap(map){
var keys = map.keySet();
    var iterator = keys.iterator();
    while (iterator.hasNext()) {
      var k = iterator.next();
      console.log(k + " : " + map.get(k));
  }  
}


setTimeout(function () {

	Java.perform(function () {
		var provisionClass = Java.use("com.ringapp.feature.wifisetup.Provision");
		provisionClass.getValue.overload().implementation = function () {
			console.log("\n\nNew call")
			var ret = this.getValue()
			console.log("Provision Value: " + ret)
			console.log(JSON.stringify(this))
			return ret;
		}
	});


	Java.perform(function () {

		var firmwareRequest = Java.use("com.ringapp.ws.volley.firmware.BaseFirmwareRequest");
		var String = Java.use("java.lang.String");

		firmwareRequest.parseNetworkResponse
		.overload("com.android.volley.NetworkResponse", "java.lang.Class")
		.implementation = function (arg0, arg1) {
			console.log("\n\nNew Firmware call")
			console.log("Method: " + this.getMethodName())
			console.log("Url: " + this.getUrl())
			console.log("Headers: ")
			printMap(this.getHeaders())

			if(this.getBody()){
				console.log("Body: " + String.$new(this.getBody()))
			}
			if(this.getBodyContentType()){
				console.log("BodyContentType: " + this.getBodyContentType())
			}
			if(this.getParams()){
				printMap(this.getParams())
			}
			if(this.getPostBody()){
				String.$new(this.getPostBody())
			}
			
			
			console.log("\n")
			console.log("Status Code: "+ arg0.statusCode.value)
			console.log("Headers: ")
			printMap(arg0.headers.value)
			if(arg0.data){
				var string = String.$new(arg0.data.value)
				console.log(string)
			}
			var ret = this.parseNetworkResponse(arg0,arg1)
			console.log("Firmware Value: " + ret)
			return ret;
		}
	});

	Java.perform(function () {

		var request = Java.use("com.ringapp.ws.volley.backend.BaseBackendRequest");
		var String = Java.use("java.lang.String");


		request.parseNetworkResponse
		.overload("com.android.volley.NetworkResponse", "java.lang.Class")
		.implementation = function (arg0, arg1) {
			console.log("\n\nNew Backend call")
			console.log("Method: " + this.getMethodName())
			console.log("Url: " + this.getUrl())
			printMap(this.getHeaders())

			if(this.getBody()){
				console.log("Body: " + String.$new(this.getBody()))
			}
			if(this.getBodyContentType()){
				console.log("BodyContentType: " + this.getBodyContentType())
			}
			if(this.getParams()){
				printMap(this.getParams())
			}
			if(this.getPostBody()){
				String.$new(this.getPostBody())
			}
			
			
			console.log("\n")

			var string = String.$new(arg0.data.value)
			console.log(string)
			var ret = this.parseNetworkResponse(arg0,arg1)
			console.log("Backend Value: " + ret)
			return ret;
		}
	});

}, 0);
