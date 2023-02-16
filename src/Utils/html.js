exports.orderReqContent = ({ user, orderRequest, date }) => (`<div>
        
<h2>${user.fullName} has sent an order request on ${date}.</h2>

<h5>Order Info:</h5>
Name: ${orderRequest.name}<br/>
Category: ${orderRequest.category}<br/>
Ordered Items: ${orderRequest.allItems.length}<br/>
Total Price: ${orderRequest.totalPrice}<br/>

<h5>User Info:</h5>
Name: ${user.fullName} <br/>
Email: ${user.email} <br/>
Phone: ${user.contactNumber} <br/>
Total Purchase: ${user.totalPurchase} <br/>
Total Order: ${user.orderCount} <br/>

*Please check on <a target="_blank" rel="noreferrer" href="https://admin-dhaka-catering.netlify.app/order-request">Admin Dashboard</a>. <br/>
</div>`)



exports.orderReqUpdateContent = ({ status, orderRequestData }) => (`<div> 

<h3>${status === 'Approved' ? 'Congratulations!' : 'Sorry!'} Your order request has been ${status}</h3>. 

<h5>Order Info:</h5>
Name: ${orderRequestData.name}<br/>
Category: ${orderRequestData.category}<br/>
Ordered Items: ${orderRequestData.allItems.length}<br/>
Total Price: ${orderRequestData.totalPrice}<br/>

Please contact with this number to ${status === 'Approved' ? 'Confirm your order' : 'request again'}. </br> 
GP: 01703790978 </br> 
BL: 01703790978

</div>`)