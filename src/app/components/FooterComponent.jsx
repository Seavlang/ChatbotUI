import Image from "next/image";
import React from "react";

export default function FooterComponent() {
  return (
    <div>
      <footer className="footer text-base-content py-10 mt-10 flex justify-between items-start">
        <div>
          <aside className="flex items-center">
            <Image
              src="/asset/images/logo.png"
              alt="GPT_LOGO"
              width={40}
              height={40}
            />
            <span className="ml-5 text-lg font-semibold text-primary">
              Docs AI
            </span>
          </aside>
          <p className="mt-2 font-semibold">
            This project is created under the Korea Software HRD Center.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <h6 className="text-black font-semibold">GETTING STARTED</h6>
          <a className="link link-hover">Playground</a>
          <a className="link link-hover">API Documentation</a>
        </div>

        <div className="flex flex-col space-y-4">
          <h6 className="text-black font-semibold">CONTACT US</h6>
          <div className="flex">
            <Image
              src={"/asset/images/location.png"}
              width={20}
              height={20}
              className="me-2"
              alt="locaton"
            />
            <p>
              {" "}
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
            <p>
              Email:{" "}
              <a className="link link-hover" href="mailto:info.kth@gmail.com">
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
            <p>
            Phone:{" "}
            <a className="link link-hover" href="tel:012988919">
              012 988 919
            </a>{" "}
            /{" "}
            <a className="link link-hover" href="tel:086244123">
              086 244 123
            </a>
          </p>
          </div>
          
        </div>

        <div className="flex flex-col space-y-4">
          <h6 className="text-black font-semibold">PARTNERSHIP</h6>
          {/* Add partnership logos or links here if needed */}
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
            {/* Add other partnership logos as needed */}
          </div>
        </div>
      </footer>
    </div>
  );
}
