// Copy and save Brewery API URL to variable
let BreweryAPIurl = 'https://api.openbrewerydb.org/breweries';

//filterEmptydata
function DataNullFilter(data) {
    if (data === null) {
        return "N/A";
    } else {
        return data;
    }
}

async function handlesearch(){
    //To access user input
    let Input=document.querySelector(".inputvalue");
    try{
            // Fetch data from API
            let BreweryResponse = await fetch(BreweryAPIurl);
    
           // COnvert json to object
            let BreweryData = await BreweryResponse.json();
            
            //select row 2
            let Row = document.querySelector(".content-1");

            //Before start empty the row content
            Row.innerHTML="";
            
            //Filter details based on input
            let Data=BreweryData.filter(BreweryData=>{

                //get Name
                let BreweryName = DataNullFilter(BreweryData.name);

                //Get all object values and convert uppercase char to lowercase char
                let BrewerValues=Object.values(BreweryData).map(Str=>{

                    if(Str!=null){
                        StrSplit=Str.split("");
                        for(let i in StrSplit){
                            
                            if(StrSplit[i].charCodeAt(0)>=65 || StrSplit[i].charCodeAt(0)<=90){
                                StrSplit[i]= StrSplit[i].toLowerCase();
                            }else{
                                StrSplit[i]= StrSplit[i];
                            }
                        }
                    }
                    return StrSplit.join("");
                   
                });

                //All object values joined together
                let BrewerValuestring=[];
                for(let i=0;i<BrewerValues.length;i++){
                    BrewerValuestring.push(...BrewerValues[i].split(""));
                }


                //Input value convert to lowercase
                let InputSplit=Input.value.split("").map(Str=>{
                    if(Str.charCodeAt(0)>=65 || Str.charCodeAt(0)<=90 ){
                        return Str.toLowerCase();
                    }else{
                        return Str;
                    }
                })

                //Get Brewery type
                let BreweryType = DataNullFilter(BreweryData.brewery_type);
    
                //Get Brewery Street
                let BreweryStreet = DataNullFilter(BreweryData.street);
    
                //Get city
                let BreweryCity = DataNullFilter(BreweryData.city);
    
                //Get State
                let BreweryState = DataNullFilter(BreweryData.state);
    
                //Get pincode
                let Brewerypincode = DataNullFilter(BreweryData.postal_code);
    
                //Address
                let BreweryAddress = BreweryStreet + " , " + BreweryCity + " , " + BreweryState + ", " + Brewerypincode;
    
                //Get Brewery Website URL
                let BreweryUrl = DataNullFilter(BreweryData.website_url);
    
                //Get Brewery Phone Number
                let BreweryPhoneNumber = DataNullFilter(BreweryData.phone);

                //condition to check input value with Brewer object values
                if(BrewerValuestring.join("").includes(InputSplit.join(""))){
                    
                    //Create div and content and append to row
                    let BreweryDetails = document.createElement("div");
                    BreweryDetails.className = " col-sm-12 col-lg-5  serch-control m-3 d-flex justify-content-center align-items-center";
                    BreweryDetails.innerHTML = `
                    <div class="bg-info bg-gradient bg-opacity-10" style="width:100%; height:15rem">
                        <ul type="none">
                            <li>
                                <p><span class="fw-bold" >Name : </span> ${BreweryName}</p>
                                <p><span class="fw-bold">Type : </span>${BreweryType} </p>
                                <p><span class="fw-bold">Address : </span>${BreweryAddress} </p>
                                <p><span class="fw-bold">url : </span> <a href="${BreweryUrl}" target="_Blank" class="fw-bold">${BreweryUrl}</a> </p>
                                <p><span class="fw-bold">Phone Number : </span> ${BreweryPhoneNumber} </p>
                            </li>
                        <ul>
                    </div>
                    `

                    Row.appendChild(BreweryDetails);
                    
                }
                
            })
            //condition to check filtering data availability 
            if(Row.innerHTML.length===0){
                Row.innerHTML="Result Not found"

            }
            
                      
            
        }catch(error){
            
            //error output
            console.error('Error:', error);
        }
    
    
}

//Check input every second
setInterval(handlesearch,1000);



//content added to body
document.body.innerHTML = `  
<div class="container-fluid bg-gradient">
    <div class="row d-flex justify-content-center align-items-center m-4">
       
       
            <div class="input-group mt-4 ">
                <input type="text" class="form-control inputvalue" placeholder="Search Brewery....">
                <span onclick="handlesearch()" class="input-group-text btn btn-secondary searchbutton">Search</span>
            </div>
        

    </div>
</div>
<div class="container-fluid bg-gradient">
   
    <div class="row content-1 d-flex justify-content-center align-items-center m-4">
   
    </div>    

</div>`