import React from 'react';
import Dropdown from './Dropdown';

const Faq = () => {
  let faqs = [
    {
      title:"What if i forgot my password?",
      description:"If you forgot your password then you have to contact us via contact form or via mail, and then have to provide us some information about your account and then we will share new password with you."
    },
    {
      title:"How many days it takes to get a job?",
      description:"It depends on which company you are applying to and their respective procedure to hire someone."
    },
    {
      title:"What if somebody tries to scam me in this web portal?",
      description:"This Job Portal(Talent Acquaitance) is compeleteley free to use and we don't charge anyone any fees. So be aware if somebody tries to scam you with deposit, laptop charge or any other charges then please contact us immediatley"
    }
  ]

  return (
    <div id="faq" className="wow vision slideInRight">
        {
          faqs.map(faq =>{
            return <Dropdown title={faq.title} description={faq.description} />
          })
        }
    </div>
  )
}

export default Faq