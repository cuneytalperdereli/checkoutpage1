// const taxRate = 0.18;
// const shippingPrice = 15;
// const shippingFreePrice = 300

window.addEventListener("load",() =>{
    calculateCartPrice();
    // set items to localStorage
    // localStorage.setItem("taxRate",taxRate)
    // localStorage.setItem("shippingPrice",shippingPrice)
    // localStorage.setItem("shippingFreePrice",shippingFreePrice)

    // sessionStorage.setItem("taxRate",taxRate)
    // sessionStorage.setItem("shippingPrice",shippingPrice)
    // sessionStorage.setItem("shippingFreePrice",shippingFreePrice)
})


const productsDiv = document.querySelector(".products");
// Capturing vs. Bubbling
productsDiv.addEventListener("click",(event)=>{
   
    // console.log(event.target);
    if(event.target.className == "fa-solid fa-minus"){
        // console.log("minus btn is clicked!");
        if( event.target.parentElement.querySelector(".quantity").innerText >1){
            event.target.parentElement.querySelector(".quantity").innerText--;
            calculateProductPrice(event.target);
            calculateCartPrice();
        }
        else{
            if(confirm(`${event.target.parentElement.parentElement.querySelector("h2").innerText} will be deleted !!`)){

                //remove
                event.target.parentElement.parentElement.parentElement.remove();
                calculateCartPrice();
            }
        }
    }
    else if(event.target.classList.contains("fa-plus")){
        // console.log("plust btn is clicked")
        event.target.previousElementSibling.innerText++;
        calculateProductPrice(event.target);
        calculateCartPrice();
    }
    else if(event.target.className == "remove-product"){
        // console.log("remove btn is clicked");
        event.target.parentElement.parentElement.parentElement.remove();
        calculateCartPrice();

    }
    else{
        console.log("other element is clicked");
    }

})
const calculateProductPrice = (clickedBtn) =>{
    const productInfoDiv =  clickedBtn.parentElement.parentElement;
    const price = productInfoDiv.querySelector(".product-price strong").innerText;
    const quantity = productInfoDiv.querySelector(".quantity").innerText;
    const productTotalDiv = productInfoDiv.querySelector(".product-line-price");
    productTotalDiv.innerText = (price * quantity).toFixed(2);
    // alert(quantity)

   

}
const calculateCartPrice = () =>{

    //foreach ==> NodeList,Array
    const productsTotalPricesDivs = document.querySelectorAll(".product-line-price")
    // const productsTotalPricesDivs = [...document.querySelectorAll(".product-line-price")];

    let subTotal = 0;
    productsTotalPricesDivs.forEach(div =>{
        subTotal += parseFloat(div.innerText)
    })
    // console.log(subTotal);
    const taxPrice = subTotal * localStorage.getItem("taxRate")
    const shippingPrice = parseFloat(subTotal > 0 && subTotal < localStorage.getItem("shippingFreePrice")
        ? localStorage.getItem("shippingPrice") 
        :  0)
        // console.log(shippingPrice);

        document.querySelector("#cart-subtotal").lastElementChild.innerText = subTotal.toFixed(2)
        document.querySelector("#cart-tax p:nth-child(2)").innerText = taxPrice.toFixed(2);
        document.querySelector("#cart-shipping").children[1].innerText = parseFloat(shippingPrice).toFixed(2);
        document.querySelector("#cart-total").lastElementChild.innerText = (subTotal+taxPrice+shippingPrice).toFixed(2);
}
