'use client'
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Card from '@mui/joy/Card';
import Button from "@mui/joy/Button";
// import { CardContent } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Typography from '@mui/joy/Typography';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import { Select } from 'antd';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Row,Col } from 'antd';
import { useAppSelector } from '@/redux/hooks';
import Script from 'next/script'


const SessionBookingForm:  React.FC = () =>  {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const [duration,setduration] = React.useState<number | null>(null);
  const [slot,setSlot] = React.useState<String | null> (null);  
  const currstate = useAppSelector((state)=>state);
  
  
  const makePayment = async() => {
    
    console.log(duration)
    console.log(slot);
    console.log(value);
    console.log(currstate);
    let hrduration = 0;
    if(duration)hrduration = duration/60;
    const key = process.env.key_id;
    console.log(key);

    const data = await fetch("http://localhost:3000/api/razorpay",{
                  method:'POST',
                      body:JSON.stringify({
                        amount: hrduration*700,
                        currency: 'INR',
                        slot:slot,
                        date: value,
                        payeeName: currstate.authReducer.credentials?.username,
                        payeeEmail: currstate.authReducer.credentials?.email,
                        payeeId: currstate.authReducer.credentials?.id
                      }),
                      headers: {
                          'Content-Type': 'application/json',
                        }
        });
    const {order} = await data.json();
    console.log(order);
    const options = {
        key: "rzp_test_qeUsKBb8MbtMkc",
        name: "Uni Connect Session",
        currency: 'INR',
        amount: order.amount,
        order_id: order.id,
        description: "Understanding RazorPay Integration",
        // image: logoBase64,

        handler: async function (response:any) {
          //       // if (response.length==0) return <Loading/>;
                console.log(response);
        
                const data = await  fetch("http://localhost:3000/api/razorpay/verify", {
                  method: "POST",
                  // headers: {
                  //   // Authorization: 'YOUR_AUTH_HERE'
                  // },
                  body: JSON.stringify({
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                });
        
                const res = await data.json();
                console.log("response verify==",res)
        
                if(res?.message=="success"){
                  console.log("redirected.......")
                  // router.push("/paymentsuccess?paymentid="+response.razorpay_payment_id)
                }
        
                // Validate payment at server - using webhooks is a better idea.
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
        },
        
        prefill: {
          name: "Chirag Jindal",
          email: "chirag@gmail.com",
        },
        callback_url:  `http://localhost:3000/mentee/${currstate.authReducer.credentials?.id}`
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", function (response:any) {
        alert("Payment failed. Please try again. Contact support for help");
      });

        return "";
  }

  const onChange = (value: number) => {
    setduration(value);
    console.log(`selected ${value}`);
  };

  const onChange2 = (value: string) => {
    setSlot(value);
    console.log(`selected ${value}`);
  }
    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <Card
                sx={{
                    width: '90%',
                    // maxWidth: '100%',
                    boxShadow: 'lg',
                }}
                >
                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                    <Typography level="title-md">Pick a date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                    </LocalizationProvider>
                    <Typography level="title-md">Pick a time</Typography>
                    {/* <Row>
                      <Col> */}
                          <Select
                              showSearch
                              placeholder="Select duration"
                              optionFilterProp="children"
                              onChange={onChange}
                              // onSearch={onSearch}
                              // filterOption={filterOption}
                              options={[
                                {
                                  value: 30,
                                  label: '30 mins',
                                },
                                {
                                  value: 60,
                                  label: '60 mins',
                                },
                                {
                                  value: 90,
                                  label: '90 mins',
                                },
                                {
                                  value: 120,
                                  label: '120 mins',
                                }
                              ]}
                              style={{width:180}}
                            />
                          
                      {/* </Col>
                      <Col> */}

                        <Select
                              showSearch
                              placeholder="Pick a Slot  "
                              optionFilterProp="children"
                              onChange={onChange2}
                              // onSearch={onSearch}
                              // filterOption={filterOption}
                              options={[
                                {
                                  value: '9-11',
                                  label: '9-11 IST',
                                },
                                {
                                  value: '12-14',
                                  label: '12-14 IST',
                                },
                                {
                                  value: '15-17',
                                  label: '15-17 IST',
                                },
                                {
                                  value: '18-20',
                                  label: '18-20 IST',
                                },
                                {
                                  value:'21-23',
                                  label:'21-23 IST'                                  
                                }
                              ]}
                              style={{width:180}}
                            />

                      {/* </Col>
                    </Row> */}

                </CardContent>

                <Button onClick={makePayment}>Pay now !</Button>
                
                <CardOverflow variant="soft" sx={{backgroundColor:'white'}}>
                    {/* <Divider inset="context" /> */}
                    <Card sx={{marginBottom:'35px'}}>
                      <CardContent orientation="horizontal">
                          <div style={{width:'82%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                              <Typography><strong>This is a rare find.</strong> Josephine's time<br></br>
                              on Uni-Connect is usually booked.</Typography>
                          </div>
                          <div style={{width:'18%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                              <img src="https://topmate.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon-service-diamond.79e0878f.svg&w=48&q=75"/>
                          </div>
                      </CardContent>
                    </Card>
                </CardOverflow>
            </Card>
        </>
    )
}

export default SessionBookingForm;