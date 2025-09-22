import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BackgroundVideo from '../components/BackgroundVideo';
import ContactForm from '../components/ContactForm';
import { 
  Search, 
  Briefcase, 
  Users, 
  DollarSign, 
  Star, 
  Clock, 
  MapPin,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Store,
  MapPin as LocationIcon,
  Calendar,
  Utensils,
  Truck,
  Headphones,
  UserCheck,
  Award,
  Lock,
  Eye,
  MessageCircle
} from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  const stats = [
    { number: '50,000+', label: 'Gig Workers Registered' },
    { number: '15,000+', label: 'Pincodes Penetrated' },
    { number: '500+', label: 'Cities Penetrated' },
    { number: '28+', label: 'States and UT Penetrated' }
  ];

  const gigCategories = [
    {
      icon: <Store className="w-12 h-12 text-blue-600" />,
      title: 'Retail Gigs',
      description: 'Flexible staffing for retail stores, brand audits, and shelf management.',
      features: ['Weekend Support', 'Peak Season Staffing', 'Brand Audits', 'Shelf Management']
    },
    {
      icon: <LocationIcon className="w-12 h-12 text-green-600" />,
      title: 'Field Gigs',
      description: 'On-ground verification, surveys, and document collection services.',
      features: ['Field Verification', 'Surveys', 'Document Collection', 'On-ground Support']
    },
    {
      icon: <Calendar className="w-12 h-12 text-purple-600" />,
      title: 'Event Gigs',
      description: 'Event staffing, crowd management, and specialized event support.',
      features: ['Event Staffing', 'Crowd Management', 'Specialized Roles', 'Flexible Timing']
    },
    {
      icon: <Utensils className="w-12 h-12 text-orange-600" />,
      title: 'Restaurant Gigs',
      description: 'Kitchen staff, servers, and restaurant support during peak hours.',
      features: ['Kitchen Staff', 'Servers', 'Peak Hour Support', 'Flexible Shifts']
    },
    {
      icon: <Truck className="w-12 h-12 text-red-600" />,
      title: 'Delivery Gigs',
      description: 'Last-mile delivery, logistics support, and quick turnaround services.',
      features: ['Last-mile Delivery', 'Quick Turnaround', 'Local Knowledge', 'Flexible Routes']
    },
    {
      icon: <Headphones className="w-12 h-12 text-indigo-600" />,
      title: 'Customer Support',
      description: 'On-demand customer service and support staff for businesses.',
      features: ['On-demand Support', 'Multi-language', '24/7 Availability', 'Scalable Teams']
    }
  ];

  const whyChooseUs = [
    {
      number: '01',
      title: 'Local-Talent On-Demand',
      subtitle: 'Local focus. Global impact.',
      description: 'Efficiently find skilled local part-time workers without adding to your overhead costs.'
    },
    {
      number: '02',
      title: 'Rapid Hiring Turnaround',
      subtitle: 'Quicker and super efficient.',
      description: 'Share your requirements and find the perfect one within 24-48 hrs, for your urgent outsourcing needs.'
    },
    {
      number: '03',
      title: 'Flexible Hiring Solutions',
      subtitle: 'Flexible Hiring Solutions',
      description: 'Efficiently deploy weekenders and part-time gig workers for your immediate needs, reducing time and expense.'
    },
    {
      number: '04',
      title: 'Transparent Pricing, No Hidden Costs',
      subtitle: 'Transparent Pricing, No Hidden Costs',
      description: 'Enjoy clear, upfront pricing with no surprises, making budgeting easier and more predictable.'
    }
  ];

  const testimonials = [
    {
      name: 'Tushar Vats',
      position: 'Manager | Talent Acquisition',
      company: 'mswipe',
      content: 'Apparel Group and its brands have consistently benefited from Gig4u\'s exceptional part-time and weekend workforce solutions during peak periods like Black Friday and festive seasons. Gig4u has impressed us with their timely delivery of high-quality candidates who seamlessly integrate into our teams.',
      avatar: 'https://ui-avatars.com/api/?name=Tushar+Vats&background=14a800&color=fff'
    },
    {
      name: 'Samrat Chadha',
      position: 'Business Head',
      company: 'mswipe',
      content: 'As MSwipe began exploring new avenues for Merchant Onboarding, we were keen to find a reliable partner for the Foot-on-Field workforce solutions. Gig4U exceeded our expectations by providing highly skilled and dependable gigers who seamlessly integrated into our operations.',
      avatar: 'https://ui-avatars.com/api/?name=Samrat+Chadha&background=14a800&color=fff'
    },
    {
      name: 'Mahendra Sharma',
      position: 'Head of Training and Channel Partner Education',
      company: 'PayNearby',
      content: 'Gig4U provided outstanding support on short notice, delivering top-notch trainers for our channel partners\' onboarding, training, and activation. Their efforts have been remarkable, and we appreciate their valuable contributions.',
      avatar: 'https://ui-avatars.com/api/?name=Mahendra+Sharma&background=14a800&color=fff'
    }
  ];

  const featuredWorkers = [
    {
      name: 'Inderjeet',
      content: 'I have been with GIG4u for over a year now, and the journey has been nothing short of amazing. From finding gigs that match my skills to prompt payments and continuous support, GIG4u stands out as a reliable platform for gig workers',
      avatar: 'https://ui-avatars.com/api/?name=Inderjeet&background=14a800&color=fff'
    },
    {
      name: 'Chandni Kaur',
      content: 'GIG4u is a one-stop solution for freelancers! I love how they make gig hunting hassle-free with their user-friendly app. The client communication is clear, and the pay is always on time. I\'ve had nothing but positive experiences with them',
      avatar: 'https://ui-avatars.com/api/?name=Chandni+Kaur&background=14a800&color=fff'
    },
    {
      name: 'Poonam',
      content: 'With GIG4u, I found the perfect balance between work and personal life. The variety of gigs allows me to explore different fields while earning a steady income. The best part is the ease of use—finding and applying for gigs has never been easier',
      avatar: 'https://ui-avatars.com/api/?name=Poonam&background=14a800&color=fff'
    },
    {
      name: 'Harshita',
      content: 'I\'ve been working with GIG4u for the past few months, and it\'s been a fantastic journey. The team is supportive, the tasks are well-defined, and the app is user-friendly. Plus, the payment cycle is prompt—exactly what every gig worker needs',
      avatar: 'https://ui-avatars.com/api/?name=Harshita&background=14a800&color=fff'
    },
    {
      name: 'Dhruv',
      content: 'GIG4u offers a great blend of flexibility, transparency, and opportunities. The gigs are diverse, and I appreciate how easy it is to find roles that align with my skills. If you\'re looking for a side hustle or something more permanent, GIG4u is the place to be',
      avatar: 'https://ui-avatars.com/api/?name=Dhruv&background=14a800&color=fff'
    },
    {
      name: 'Sanjay',
      content: 'I had a fantastic 15-day gig with GIG4U at the World Book Fair in Delhi. The support was top-notch, letting me focus on my work without worries. Plus, I now enjoy regular weekend gigs with major retail brands. GIG4U\'s professionalism and ease of use make it a great choice for freelancers',
      avatar: 'https://ui-avatars.com/api/?name=Sanjay&background=14a800&color=fff'
    }
  ];


  const companies = [
    { name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
    { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
    { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
    { name: 'Facebook', logo: 'https://logo.clearbit.com/facebook.com' },
    { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
    { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com' },
    { name: 'Uber', logo: 'https://logo.clearbit.com/uber.com' },
    { name: 'Airbnb', logo: 'https://logo.clearbit.com/airbnb.com' },
    { name: 'Spotify', logo: 'https://logo.clearbit.com/spotify.com' },
    { name: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com' },
    { name: 'PayPal', logo: 'https://logo.clearbit.com/paypal.com' }
  ];

  const blogPosts = [
    {
      title: 'Where to Find On-field Gig',
      date: '20/06/2024',
      description: 'STOP THE TALENT HUNT!!! Tired of searching "Gig workers nearby me" on Google only to find dead ends?',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      link: '/blog/on-field-gig'
    },
    {
      title: 'Boost your gig profile',
      date: '02/06/2024',
      description: 'Are you struggling to land more gigs despite putting in endless hours crafting your profile?',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      link: '/blog/boost-profile'
    },
    {
      title: 'Life Lessons, Not Just Latte',
      date: '29/05/2024',
      description: 'Ever think a part-time job was just about folding clothes or slinging fries?',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      link: '/blog/life-lessons'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Video */}
      <BackgroundVideo />

      {/* Companies that trust us - Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Companies that trust us</h2>
          </div>
          
          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {/* First set of logos */}
              {companies.map((company, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-16 w-auto opacity-100 hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="h-16 w-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hidden">
                    {company.name}
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {companies.map((company, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-16 w-auto opacity-100 hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="h-16 w-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hidden">
                    {company.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Circles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="relative flex items-center justify-center">
              {/* First Circle - Pink */}
              <div className="w-48 h-48 bg-pink-500 rounded-full flex flex-col items-center justify-center text-white shadow-lg z-10 relative">
                <div className="text-4xl font-bold">39000+</div>
                <div className="text-sm font-medium text-center px-4">GIG WORKERS REGISTERED</div>
              </div>
              
              {/* Second Circle - Pink/Magenta */}
              <div className="w-48 h-48 bg-pink-600 rounded-full flex flex-col items-center justify-center text-white shadow-lg z-20 relative -ml-8">
                <div className="text-4xl font-bold">7500+</div>
                <div className="text-sm font-medium text-center px-4">PINCODES PENETRATED</div>
              </div>
              
              {/* Third Circle - Dark Red */}
              <div className="w-48 h-48 bg-red-700 rounded-full flex flex-col items-center justify-center text-white shadow-lg z-30 relative -ml-8">
                <div className="text-4xl font-bold">2000+</div>
                <div className="text-sm font-medium text-center px-4">CITIES PENETRATED</div>
              </div>
              
              {/* Fourth Circle - Darkest Red */}
              <div className="w-48 h-48 bg-red-800 rounded-full flex flex-col items-center justify-center text-white shadow-lg z-40 relative -ml-8">
                <div className="text-4xl font-bold">34+</div>
                <div className="text-sm font-medium text-center px-4">STATES AND UT PENETRATED</div>
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* Welcome Section - Exact from Gig4U */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Welcome to Gig4U
                </h2>
                <h3 className="text-2xl text-blue-600 mb-4">Local. Flexible. Reliable.</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  India's leading platform for hiring local gig workers. 
                  Get the help you need right away.
                </p>
              </div>
            </div>
          </section>

      {/* Gig Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Your Perfect Gig Worker!
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Instantly tap into local part-timers and gig workers for your urgent outsourcing needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gigCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex justify-center mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{category.title}</h3>
                <p className="text-gray-600 mb-4 text-center">{category.description}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Reasons Why Employers Choose Gig4U
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-4">#{reason.number}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-blue-600 font-medium mb-3">{reason.subtitle}</p>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Happy Clients!
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How does it work?
            </h2>
            <h3 className="text-2xl text-blue-600 mb-4">Easy. Simple. Quick.</h3>
            <p className="text-xl text-gray-600">
              Getting started is as simple as 1,2,3!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Client Flow */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Client</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">1</div>
                  <p className="text-lg">Sign Up as a Business</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">2</div>
                  <p className="text-lg">Our executive will contact you for personalized assistance.</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">3</div>
                  <p className="text-lg">Start posting jobs and hiring!</p>
                </div>
              </div>
              <Link
                to="/register"
                className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
              >
                SignUp Client
              </Link>
            </div>

            {/* Worker Flow */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Part-timer</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">1</div>
                  <p className="text-lg">Sign Up as a gig worker.</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">2</div>
                  <p className="text-lg">Our executive will contact you for personalized assistance.</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">3</div>
                  <p className="text-lg">Explore local gigs, and start gigging and earning!</p>
                </div>
              </div>
              <Link
                to="/register"
                className="mt-8 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
              >
                SignUp Gig Worker
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Workers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Part-Timers/weekenders
            </h2>
            <h3 className="text-2xl text-green-600 mb-4">Flexible. Reliable. Diverse.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWorkers.map((worker, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={worker.avatar}
                    alt={worker.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <h4 className="font-semibold text-gray-900">{worker.name}</h4>
                </div>
                <p className="text-gray-600 italic">"{worker.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Security */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Safety & Security!
            </h2>
            <h3 className="text-2xl text-green-600 mb-4">Trust. Reliability. Protection.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Lock className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transactions are Encrypted and Protected</h3>
            </div>
            <div className="text-center p-6">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment mechanism ensures safe and secure payments</h3>
            </div>
            <div className="text-center p-6">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment is made when the customer is 100% satisfied with the work</h3>
            </div>
            <div className="text-center p-6">
              <Eye className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gig4u does not disclose your account information to any third-party app or service</h3>
            </div>
            <div className="text-center p-6">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">All payments, disputes, and cancellations are handled properly</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Blogs!
            </h2>
            <p className="text-xl text-gray-600">
              Stay updated with the latest trends and insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-3">Posted on: {post.date}</p>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Blogs!
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest trends and insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>Posted on : {post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <Link
                    to={post.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />

          {/* CTA Section */}
          {!user && (
            <section className="py-20 bg-blue-600">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of gig workers and clients who are already succeeding on our platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/register"
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Sign Up Free
                  </Link>
                  <Link
                    to="/login"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </section>
          )}
    </div>
  );
};

export default HomePage;
