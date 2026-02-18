import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import OurPolicy from '../components/OurPolicy'

const Policy = () => {
    return (
        <div>
            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'PRIVACY'} text2={' POLICY'} />
            </div>

            <div className='my-10 flex flex-col gap-6 mb-20 text-sm text-gray-600'>
                <div className='flex flex-col gap-4'>
                    <p>Your privacy is important to us. It is RAVN's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
                    <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
                </div>

                <div className='flex flex-col gap-4'>
                    <h3 className='font-bold text-lg text-gray-800'>Information Collection and Use</h3>
                    <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features or resources we make available on our Site.</p>
                </div>

                <div className='flex flex-col gap-4'>
                    <h3 className='font-bold text-lg text-gray-800'>Log Data</h3>
                    <p>We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</p>
                </div>

                <div className='flex flex-col gap-4'>
                    <h3 className='font-bold text-lg text-gray-800'>Security</h3>
                    <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>
                </div>

                <div className='flex flex-col gap-4'>
                    <h3 className='font-bold text-lg text-gray-800'>Advertisements</h3>
                    <p>Ads appearing on our website may be delivered to users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile information about you or others who use your computer.</p>
                </div>

            </div>

            <OurPolicy />
            <NewsletterBox />

        </div>
    )
}

export default Policy
