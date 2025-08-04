// import React from "react";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Helmet } from "react-helmet"


export default function PrivacyPolicy() {




    return (

        <>

<Helmet>
            <meta charSet="utf-8" />
            <title>Privacy Policy - toomanyheys</title>
            <meta name="keywords" content="sat, satprep, sat dating, rizz, rizz dating" />
            <meta
      name="description"
      content="Privacy Policy. Standardize your dating life by taking the official SAT that tests your game."
    />
        </Helmet>
            <Navbar />




            <div className="container mx-auto my-10 p-6 bg-base-100 font-1 rounded-lg">
      <h1 className="text-4xl font-bold text-left mb-8">Privacy Policy</h1>

  <div className="prose max-w-none">
  {/* Introduction */}
  <h2 className="text-2xl font-semibold">1. Introduction</h2>
  <p>
    At TooManyHeys, we value your privacy and are committed to protecting your personal information. This Privacy Policy
    explains how we collect, use, and safeguard the data you provide to us. By using TooManyHeys (https://toomanyheys.com),
    you agree to the terms of this Privacy Policy.
  </p>

  {/* Data Collection */}
  <h2 className="text-2xl font-semibold">2. Data Collection</h2>
  <p>
    TooManyHeys collects the following personal information when you use our service:
  </p>
  <ul className="list-disc list-inside">
    <li>Full Name</li>
    <li>Email Address</li>
  </ul>

  {/* Use of Data */}
  <h2 className="text-2xl font-semibold">3. How We Use Your Data</h2>
  <p>
    The data we collect is used solely for account-related purposes, such as account creation and login. We do not
    share, sell, or distribute your personal data.
  </p>

  {/* Data Sharing */}
  <h2 className="text-2xl font-semibold">4. Data Sharing</h2>
  <p>
    TooManyHeys does not sell, share, or trade your personal information with any third parties.
  </p>

  {/* Cookies and Tracking */}
  <h2 className="text-2xl font-semibold">5. Cookies and Tracking</h2>
  <p>
    TooManyHeys does not use cookies or tracking technologies to monitor user behavior. We are committed to offering
    a transparent and respectful user experience.
  </p>

  {/* Security */}
  <h2 className="text-2xl font-semibold">6. Data Security</h2>
  <p>
    Your personal data is encrypted before storage, and we use the latest security measures to ensure its protection.
    Industry-standard safeguards are in place to prevent unauthorized access.
  </p>

  {/* User Rights */}
  <h2 className="text-2xl font-semibold">7. User Rights</h2>
  <p>
    You have the right to request access to, correction, or deletion of your personal information. To do so, contact us at
    <a href="mailto:xdagging@gmail.com" className="text-primary underline"> xdagging@gmail.com</a>.
  </p>

  {/* Data Retention */}
  <h2 className="text-2xl font-semibold">8. Data Retention</h2>
  <p>
    We retain your personal data only as long as needed for account-related purposes. Upon account deletion, your
    information is securely and permanently erased.
  </p>

  {/* Age Restrictions */}
  <h2 className="text-2xl font-semibold">9. Age Restrictions</h2>
  <p>
    TooManyHeys is intended for users aged 18 and older. We do not knowingly collect personal information from individuals
    under 18.
  </p>

  {/* Contact Information */}
  <h2 className="text-2xl font-semibold">10. Contact Us</h2>
  <p>
    If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us at:
  </p>
  <p>
    Email: <a href="mailto:xdagging@gmail.com" className="text-primary underline">xdagging@gmail.com</a>
  </p>
</div>

    
    </div>

      <Footer />


        </>




    )

}