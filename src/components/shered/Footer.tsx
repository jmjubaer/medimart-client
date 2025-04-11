import Link from "next/link";
const Footer = () => {
    return <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About MediMart</h3>
          <p className="text-gray-400">
            Your trusted online pharmacy for all your medical needs.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/shop" className="hover:text-white">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-white">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-white">
                Returns
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: support@medimart.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Address: 123 Health Street</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>© 2024 MediMart. All rights reserved.</p>
      </div>
    </div>
  </footer>;
};

export default Footer;
