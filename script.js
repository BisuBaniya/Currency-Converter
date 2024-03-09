const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/usd.json";

const dropDown = document.querySelectorAll(".meraBhai select");

const btn = document.querySelector("button");

const mssg = document.querySelector("form .comp_line")

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let select of dropDown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(e)=>{
        updateFlag(e.target);
    });
}

const updateFlag = (element)=>{
    let currCode = element.value;
    // console.log(currCode);
    let countryCode = countryList[currCode];// IN, US,...
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src= newSrc;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amt = document.querySelector(".amount input");
    let amtValue  = amt.value;
    if(amtValue==="" || amtValue<1){
        amtValue = 1;
        amt.value = "1"; 
    }
    let fCurr = fromCurr.value.toLowerCase();
    let tCurr = toCurr.value.toLowerCase();
    let res = await fetch(`https://2024-03-06.currency-api.pages.dev/v1/currencies/${fCurr}.json`);
    let data = await res.json(tCurr);
    let r = data[fCurr][tCurr];
    mssg.innerText = `${amtValue} ${fromCurr.value} = ${r*amtValue} ${toCurr.value}`;
})

