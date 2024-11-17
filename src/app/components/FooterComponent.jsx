import Image from "next/image";
import React from "react";

export default function FooterComponent() {
  return (
    <div>
      <footer className="footer text-base-content py-10 mt-10 flex justify-between items-start bg-gray-100 dark:bg-gray-900 dark:text-gray-300">
        {/* Left Section */}
        <div>
          <aside className="flex items-center">
            <Image
              src="/asset/images/logo.png"
              alt="GPT_LOGO"
              width={40}
              height={40}
            />
            <span className="ml-5 text-lg font-semibold text-primary dark:text-white">
              Docs AI
            </span>
          </aside>
          <p className="mt-2 font-semibold dark:text-gray-400">
            This project is created under the Korea Software HRD Center.
          </p>
        </div>

        {/* Getting Started Section */}
        <div className="flex flex-col space-y-4">
          <h6 className="text-black font-semibold dark:text-white">
            GETTING STARTED
          </h6>
          <a className="link link-hover dark:text-gray-400">Playground</a>
          <a className="link link-hover dark:text-gray-400">API Documentation</a>
        </div>

        {/* Contact Us Section */}
        <div className="flex flex-col space-y-4">
          <h6 className="text-black font-semibold dark:text-white">CONTACT US</h6>
          <div className="flex">
            <Image
              src={"/asset/images/location.png"}
              width={20}
              height={20}
              className="me-2"
              alt="location"
            />
            <p className="dark:text-gray-400">
              #12, St 323, Sangkat Boeung Keng I, Khan Toul Kork, Phnom Penh,
              Cambodia
            </p>
          </div>
          <div className="flex">
            <Image
              src={"/asset/images/mail.png"}
              width={20}
              height={20}
              className="me-2"
              alt="mail"
            />
            <p className="dark:text-gray-400">
              Email:{" "}
              <a
                className="link link-hover dark:text-blue-400"
                href="mailto:info.kth@gmail.com"
              >
                info.kth@gmail.com
              </a>
            </p>
          </div>
          <div className="flex">
            <Image
              src={"/asset/images/phone.png"}
              width={20}
              height={20}
              className="me-2"
              alt="phone"
            />
            <p className="dark:text-gray-400">
              Phone:{" "}
              <a className="link link-hover dark:text-blue-400" href="tel:012988919">
                012 988 919
              </a>{" "}
              /{" "}
              <a className="link link-hover dark:text-blue-400" href="tel:086244123">
                086 244 123
              </a>
            </p>
          </div>
        </div>

        {/* Partnership Section */}
        <div className="flex flex-col space-y-4">
          <h6 className="text-black font-semibold dark:text-white">PARTNERSHIP</h6>
          <div className="flex items-center gap-4">
            <Image
              src="/asset/images/kshrd.png"
              alt="Partnership Logo"
              width={40}
              height={40}
            />
            <Image
              src="/asset/images/ksga.png"
              alt="Partnership Logo"
              width={50}
              height={50}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
