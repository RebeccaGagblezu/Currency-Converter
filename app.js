const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency")

window.addEventListener('load',e=>{
    // updateCurrency();
    getCountries();
});

if('serviceWorker' in navigator){
    try{
        navigator.serviceWorker.register('sw.js');
        console.log('Service worker registration successful')
    } catch(error){
        console.log('Service worker registration failed')
    }
}

// function updateCurrency(){
//   //  const res = await fetch('')
// }


function getCountries(){
    let myRequest = new Request(
        'https://free.currencyconverterapi.com/api/v5/currencies',
        {
             'method': 'GET',
        });
    fetch(myRequest).then(function(response){
          return response.json();
//console.log(_currencyList);
      //    fromCurrency.innerHTML =_currencyList.sources
         // .map(src => `<option value="${src.id}">${src.currencyName}</option>`)


    }).then(function(myJson) {
        //console.log(myJson);
       let _currencyObj = myJson.results;
        let _currencyList = [];
        for(_cur in _currencyObj){
//            console.log(_currencyList[_cur].id);
         //   console.log(_currencyList[_cur].currencyName);

            _currencyList.push({
                id:_currencyObj[_cur].id,
                currencyName:_currencyObj[_cur].currencyName
            })
        }
//console.log(_currencyList);
        fromCurrency.innerHTML =_currencyList
        .map(src => `<option value="${src.id}">${src.currencyName}</option>`)

        toCurrency.innerHTML =_currencyList
        .map(src => `<option value="${src.id}">${src.currencyName}</option>`)


      });;
}



function convertCurrency() {
    debugger;
    const fromCurr = document.getElementById('fromCurrency').value;
    const toCurr = document.getElementById('toCurrency').value;
    const amount = document.getElementById('curAmount').value;
    let query = `${fromCurr}_${toCurr}`;
    let myRequest = new Request(
        'https://free.currencyconverterapi.com/api/v5/convert?q='
            + query + '&compact=ultra',
        {
             'method': 'GET',
        });
        fetch(myRequest).then(response=>{
           return response.json(); 
            
           
        }).then(myJson => {

    //var resFinal;
            debugger;
            // console.log(myJson); 
            // let _res = myJson.query * amount;
            let _res = myJson;

            console.log(_res)
            let res = _res;
            console.log(res)
            // curResult.innerHTML = _res;
            // .map(res => `<option value="${src.id}">${src.currencyName}</option>`)
            
            //let _currencyObj = myJson.results;
       
        
        for(_ress in _res){
          console.log(_ress);
         
           let res1= _res[_ress];
           console.log(res1);

           let resFinal = res1 * amount;
             document.getElementById('curResult').value = resFinal.toFixed(2);
            
        }

       

        
        });
     


//     // . then()
//     // fetch(myRequest).then(res => res.json())
//     // .then(json => 
//     // console.log(json));
 }


