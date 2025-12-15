import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaWrench, FaUserCheck, FaShieldAlt, FaClock, FaTools, FaTint, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaCreditCard } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Top Call-to-Action Banner */}
            <div className="bg-cyan-600 py-6">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Need a Repair or Want to Join Our Team?</h2>
                    <p className="text-blue-100 mb-4">AquaFix connects you to certified technicians for reliable water solutions.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/book-service" className="px-8 py-3 bg-cyan-400 text-white font-bold rounded-md hover:bg-sky-400 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Book a Service Now
                        </Link>
                        <Link href="/become-technician" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-md hover:bg-white hover:text-blue-900 transition-all duration-300">
                            Become a Technician
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Column 1: Company Info & Trust Badges */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-2xl font-bold text-sky-400">AquaFix Mechanical</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your trusted platform for professional water mechanical services. We connect certified technicians with customers for fast, reliable, and guaranteed repairs on taps, leaks, and more.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                                <FaShieldAlt className="text-sky-400" />
                                <span>Licensed & Insured</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCheckCircle className="text-sky-400" />
                                <span>Guaranteed Work</span>
                            </div>
                        </div>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-sky-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-110">
                                <FaFacebookF className="w-5 h-5" />
                            </a>
                            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-sky-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-110">
                                <FaLinkedinIn className="w-5 h-5" />
                            </a>
                            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-sky-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-110">
                                <FaTwitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: For Customers */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-sky-400">For Customers</h4>
                        <ul className="space-y-2">
                            <li><Link href="/how-it-works" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">How It Works</Link></li>
                            <li><Link href="/our-services" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">Our Services</Link></li>
                            <li><Link href="/pricing" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">Pricing</Link></li>
                            <li><Link href="/customer-reviews" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">Customer Reviews</Link></li>
                            <li><Link href="/warranty-info" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">Warranty Information</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: For Technicians */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-sky-400">For Technicians</h4>
                        <ul className="space-y-2">
                            <li><Link href="/technician-login" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">Technician Login</Link></li>
                            <li><Link href="/become-technician" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">Join Our Network</Link></li>
                            <li><Link href="/technician-benefits" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">Technician Benefits</Link></li>
                            <li><Link href="/technician-support" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">Technician Support</Link></li>
                            <li><Link href="/payment-info" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">Payment & Earnings</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Quick Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-sky-400">Contact Us</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-start space-x-3">
                                <FaPhoneAlt className="mt-1 text-sky-400 flex-shrink-0" />
                                <span>24/7 Support: <br />+880 1795 888 111</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <FaEnvelope className="mt-1 text-sky-400 flex-shrink-0" />
                                <span>support@aquafix.com</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="mt-1 text-sky-400 flex-shrink-0" />
                                <span>123 Service Road, Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Our Services Cards */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <h4 className="text-xl font-semibold text-center mb-6 text-sky-400">Our Core Services</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2">
                            <FaTint className="text-sky-400 text-3xl mx-auto mb-2" />
                            <p className="text-sm">Tap Repair & Replacement</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2">
                            <FaTools className="text-sky-400 text-3xl mx-auto mb-2" />
                            <p className="text-sm">Leak Detection</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2">
                            <FaWrench className="text-sky-400 text-3xl mx-auto mb-2" />
                            <p className="text-sm">Pipe Installation</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2">
                            <FaCreditCard className="text-sky-400 text-3xl mx-auto mb-2" />
                            <p className="text-sm">Online Payment</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="bg-black py-4">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} AquaFix Mechanical Services. All Rights Reserved.</p>
                    <div className="flex space-x-6 mt-2 md:mt-0">
                        <Link href="/privacy-policy" className="hover:text-sky-400 transition-colors duration-300">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="hover:text-sky-400 transition-colors duration-300">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;