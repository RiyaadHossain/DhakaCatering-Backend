exports.orderReqContent = ({ user, orderRequest, date }) => (`<div>
        
<h2>${user.name} has sent an order request on ${date}.</h2> <br/> 

<h5>Order Info:</h5>
Name: ${orderRequest.name}<br/>
Category: ${orderRequest.category}<br/>
Ordered Items: ${orderRequest.allItems.length}<br/>
Total Price: ${orderRequest.totalPrice}<br/>

<h5>User Info:</h5>
Name: ${user.name} <br/>
Email: ${user.email} <br/>
Phone: ${user.phone} <br/>
Total Purchase: ${user.purchase} <br/>
Total Order: ${user.order} <br/>

*Please check on <a target="_blank" rel="noreferrer" href="https://admin-dhaka-catering.netlify.app/order-request">Admin Dashboard</a>. <br/>
</div>`)



exports.orderReqAcceptContent = ({ status, orderRequestData }) => (`<div> 

<h3> Congratulations! Your order request has been ${status}</h3>. 

<h5>Order Info:</h5>
Name: ${orderRequestData.name}<br/>
Category: ${orderRequestData.category}<br/>
Ordered Items: ${orderRequestData.allItems.length}<br/>
Total Price: ${orderRequestData.totalPrice}<br/>

Please contact with this number to Confirm your order. </br> 
GP: 01703790978 </br> 
BL: 01703790978

</div>`)