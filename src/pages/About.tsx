
import React from 'react';
import { Shield, Star, Award, Users, Globe, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const milestones = [
    { year: '1995', event: 'Founded GemRock Auctions in New York' },
    { year: '2000', event: 'First online auction platform launched' },
    { year: '2005', event: 'Reached 10,000 registered bidders' },
    { year: '2010', event: 'Opened international offices' },
    { year: '2015', event: 'Introduced mobile bidding platform' },
    { year: '2020', event: 'Live streaming auctions launched' },
    { year: '2024', event: 'Over 50,000 active members worldwide' }
  ];

  const team = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Chief Gemologist',
      image: 'photo-1494790108755-2616b612b5e5?w=300',
      credentials: 'GIA Graduate Gemologist, 25+ years experience'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Auctions',
      image: 'photo-1472099645785-5658abf4ff4e?w=300',
      credentials: 'Former Sotheby\'s specialist, 15+ years in luxury auctions'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Authentication Director',
      image: 'photo-1438761681033-6461ffad8d80?w=300',
      credentials: 'FGA Fellow, specialized in rare gemstone identification'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Authenticity',
      description: 'Every piece is thoroughly authenticated by certified gemologists using advanced testing methods.'
    },
    {
      icon: Star,
      title: 'Quality',
      description: 'We maintain the highest standards in gemstone selection and jewelry craftsmanship.'
    },
    {
      icon: Award,
      title: 'Expertise',
      description: 'Our team of experts brings decades of experience in gemology and auction house operations.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building lasting relationships with collectors, dealers, and gemstone enthusiasts worldwide.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About GemRock Auctions
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              For nearly three decades, we've been the trusted destination for collectors 
              and enthusiasts seeking the world's finest gemstones and jewelry
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 1995 by renowned gemologist Dr. James Harrison, GemRock Auctions 
                  began as a small gallery in Manhattan's Diamond District. Dr. Harrison's 
                  vision was simple: create a trusted marketplace where collectors could 
                  discover and acquire authentic, exceptional gemstones.
                </p>
                <p>
                  What started as weekly in-person auctions has evolved into a global platform 
                  serving over 50,000 registered bidders across six continents. Our commitment 
                  to authenticity, quality, and expert curation has made us the premier 
                  destination for serious collectors and casual enthusiasts alike.
                </p>
                <p>
                  Today, we continue to honor Dr. Harrison's legacy by maintaining the highest 
                  standards of gemological expertise while embracing modern technology to 
                  connect collectors worldwide with extraordinary pieces.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600"
                alt="Gemstones and jewelry"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-purple-600 text-white p-6 rounded-lg">
                <div className="text-3xl font-bold">29+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600">Key milestones in our company's evolution</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-purple-200"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-2">{milestone.year}</div>
                      <div className="text-gray-800">{milestone.event}</div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-6 h-6 bg-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                  <value.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Expert Team</h2>
            <p className="text-gray-600">Meet the specialists who ensure quality and authenticity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${member.image}`}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.credentials}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">By the Numbers</h2>
            <p className="text-gray-300">Our impact in the gemstone auction industry</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-gray-300">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">$250M+</div>
              <div className="text-gray-300">Total Sales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">200K+</div>
              <div className="text-gray-300">Items Sold</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">98.5%</div>
              <div className="text-gray-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
