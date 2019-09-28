class WeatherApp extends HTMLElement{
	constructor(){
		super();
		this.loc = {
					"Detroit": {lat:"42.33", long:"83.04" },
					"Denver": {lat:"39.73", long:"104.99" },
					"New York": {lat:"40.71", long:"74.00" },
					"San Diego": {lat:"32.71", long:"117.16"} 
					};

		//shadow
		const shadow = this.attachShadow({mode: 'open'});

		//create wrapper
		const wrapper = document.createElement('div');
		wrapper.setAttribute('class', 'wrapper');

		const list = this.renderList();

		//prepare request
		const key = 'acc7c51c8f25bc4a6218b0188c718cbe';
		let val = list.value;
		var requestStr = 'https://api.darksky.net/forecast/'+
						  key + '/' +
						  this.loc[val].lat + ',' + this.loc[val].long;
		var myHeaders = {
  			'Content-Type': 'application/json',
  			'Access-Control-Allow-Origin': '*'
		};

		// Open a new connection, using the GET request on the URL endpoint
		fetch(requestStr, {
			credentials: 'include',
			mode: 'cors',
			headers: myHeaders
		})
  			.then(response => {
    			return response.json();
  			})
  			.then(data => {
    			// Work with JSON data here
    			console.log(JSON.stringify(data));
  			})
  			.catch(err => {
    			// Do something for an error here
    			console.log(err);
  			});
		
		//append children
		shadow.appendChild(wrapper);
		wrapper.appendChild(list);
	}

	//create select list
	renderList(){
		
		const list = document.createElement('select');
			for(var i in this.loc) {
            	const option = document.createElement('option');
				option.setAttribute('value', i);
				option.innerHTML = i;
				list.appendChild(option);
        	};


		list.addEventListener("change", () =>{
			console.log(list.value);
		});

		return list;
	}
}



customElements.define('weather-app', WeatherApp);