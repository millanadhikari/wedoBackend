const nodemailer = require('nodemailer');




const send = (info) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "wedocleaning99@gmail.com",
                    pass: "yprkdbxnjgtatkyg"
                }
            })


            let result = await transporter.sendMail(info);

            console.log("Message sent: %s", result.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

            resolve(result);
        } catch (error) {
            console.log(error);
        }
    });
};


const quoteEmailProcessor = ({ bookingObj }) => {
  conole.log('hello')
  let info = "";
    info = {
        from: 'WEDO CLEANING SERVICES" <wedocleaning99@gmail.com>', // sender address
        to: bookingObj.email, // list of receivers
        subject: "Booking Confirmation", // Subject line
        text:
            "I am pleased to contact you for booking confirmation End of Lease Cleaning service, below are the details you’ve provided.", // plain text body
        html: `<b>GDay, <h3> ${bookingObj.name} </h3> </b>
        Thanks for booking a cleaning services with us. Your Booking Details are:
        <h3>Selected Service: ${bookingObj.selectedService} </h3>
        <p>Bedrooms: ${bookingObj.bedrooms}  </p>
        <p>Bathrooms: ${bookingObj.toilets} </p>
      <p style={{fontWeight:"semibold"}}>Full Name: ${bookingObj.name}</p> 
      <p>Email: ${bookingObj.email}</p>
      <p>Phone: ${bookingObj.phone}</p>
      <p>Address:${bookingObj.address} </p>
      <p>As information provided for the property with  bedroom & required will cost you ${bookingObj.totalPrice}, 
      this is a rough estimate as we have not inspected the property yet. </p>
      <p>Please note: This quote price (${bookingObj.subtotal}) may only vary if the property condition is not met.</p>
      <p>Our cleaning team will inform the final price for approval, if massive changes need to be done before starting the job.
      Our Team will notify you an hour before arrival to property. If any thing changes on your end please let us know.  
      </p>      
      Kind Regards,
      
      <h2>WEDO CLEANING SERVICES </h2>
      <a>www.wedocleaning.com.au</a>
      <p>wedocleaning99@gmail.com</p>
      <p>Phone:0415976451</p>
      <p>ABN: 92 299 193 092 </p>
      `, // html body
    };
  
  send(info);
}

const bookingEmailProcessor = ({ bookingObj }) => {
   
     info = {
        from: 'WEDO CLEANING SERVICES" <wedocleaning99@gmail.com>', // sender address
        to: bookingObj.email, // list of receivers
        subject: "Booking Confirmation", // Subject line
        text:
            "I am pleased to contact you for booking confirmation End of Lease Cleaning service, below are the details youve provided.", // plain text body
        html: `<p>Hello</p>`,
        amp: `
        <!doctype html>
<html ⚡4email data-css-strict>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <style amp4email-boilerplate>body{visibility:hidden}</style>
</head>

 <style amp-custom>
      .container {
          font-size: 16px;
          font-family: Arial;
          max-width: 800px;
          margin: auto;
          padding: 20px;
          background-color: #f6f7f9;
         
          
          
      }
      .nav {
          font-size: 13px;
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: auto;
          padding: 20px,
      }
      .subnav {
        display: flex;
        justify-content: space-between;
      }
      .header {
         display: flex;
         align-items: center
      }
      .sublogo { 
        display: flex;
        align-items: center;
                padding-left: 10px;
                margin-left: 20px;
                border-left: 1px solid gray;
                height: 40px;
      }
      .rightnavbar {
        display: flex;
        align-items: center
      }
      .rightnavbar > p {
        color: #3e4058;
        font-size:12px
      }
      .rightbutton {
        margin-left: 15px;
        padding: 10px 15px 10px 15px;
        font-weight: bold;
        cursor: pointer;
        font-size:12px;
        color: white;
        border: none;
        background-color: #00aa91
      }
      .hatti { 
              border: 1px solid gray;
              width: 120px;
              border-radius: 1rem;
              display: flex;
              background-color: #5f738d;
              color: white;
              align-items: center;
              justify-content: center;
              height: 22px;
              font-size: 10px;
              font-weight: bold;
              margin: 20px 10px 10px 5px;
              cursor: pointer;
      }
      .hatti_support { 
        width: 20px;
        display: flex;
        color: #5f738d
      }
      .cleaning_services { 
        margin-left: 1px ;
             }
      .banner {
        background-color: white;
            margin-top: 30px;
            padding: 20px 50px 20px 50px
      }
      .banner_sub { 
        display: flex;
              width: 400px;
              align-items: center;
              justify-content: space-between;
      }
      .booking_number { 
        font-weight: bold;
        color: #3e4058;
        letter-spacing: 0.8px;
        font-size: 12px;
      }

      .booking_num { 
        font-size: 15px;
        letter-spacing: 4px;
        font-weight: bold;
      }

      .status { 
        font-weight: bold;
        color: #3e4058;
        letter-spacing: 0.8px;
        font-size: 12px;
      }

      .confirmed { 
        border: 1px solid white;
        width: 93px;
        border-radius: 1rem;
        display: flex;
        background-color: #28a138;
        color: white;
        align-items: center;
        justify-content: center;
        height: 20px;
        font-size: 11px;
        font-weight: bold;
        
      }

      .confirmed_icon { 
        width: 13px;
        margin-right:7px;
        display: flex; 
        color: #5f738d;
        
      }
      .paragraph { 
        font-size: 16px;
              width: 95%;
              margin-top: 30px;
              font-family: Arial,
      }
      .invoice_button { 
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        background-color: #e8edf1;
        width: 43%;
        margin: auto;
        margin-top: 25px;
      }
      .invoice_icon { 
        width: 16px;
        display: flex;
        color: #5f738d;
        margin-left:6px
      }
    </style>
   
  
  <body>
  <div class="container" >
      <div class="nav">
        <div class = "subnav">
          <div class="header">
            <amp-img
              src="https://ci3.googleusercontent.com/proxy/Tn5wZfpMann6OG0CJW7E255Bv6Fn6C6TYHUMLiSAbF3mmuyE3S9pLYJONA5FDgAXsO_54GXmqXrD7clExuxe93eha48hvtk=s0-d-e1-ft#https://images.kiwi.com/whitelabels/0x80/kiwicom.png"
              alt="logo"
              height="60px"
              width="100px"
            />
            <div class="sublogo">
              Making Clean Better
            </div>
          </div>
          <div class="rightnavbar"  >
            <p>
              For more info, open
              <span>Help</span>
            </p>
            <button
             class = "rightbutton"
            >
              
              Manage My Booking
            </button>
          </div>
        </div>
        <div>
          <div class="hatti">
            <div class="hatti_support">
             
            </div>
            <p class = "cleaning_services">
              Cleaning Services
            </p>
          </div>
        </div>
        <div class="banner" >
          <h3>End of Lease Cleaning Service</h3>
          <h2>We have booked everything for you cleaning service.</h2>
          <div class = "banner_sub">
            <div>
              <p class = "booking_number">
                BOOKING NUMBER
              </p>
              <div
               class= "booking_num"
              >
                989 898 989
              </div>
            </div>
            <div>
              <p class="status"> STATUS
              </p>
              <div
              class="confirmed"
              >
                <div class="confirmed_icon">
                 
                </div>
                <p>
                  Confirmed
                </p>
              </div>
            </div>
          </div>
          <div class="paragraph">  
            <p>
              Now you can manage your booking, choose additional services and
              start preparing for end of lease cleaning day.
            </p>
            <div
              class="invoice_button"
            >
              <p> Download e-invoice</p>
              <div class="invoice_icon">
                           
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
</body>
</html>
`

    };
    send(info);
}

module.exports = { bookingEmailProcessor, quoteEmailProcessor}