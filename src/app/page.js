"use client";
import Image from "next/image";
import NavbarComponent from "./components/NavbarComponent";
import { Button } from "@nextui-org/react";
import FooterComponent from "./components/FooterComponent";
import Link from "next/link";
import ChatbotComponent from "./components/ChatbotComponent";

export default function Home() {
  return (
    <div>
      <div className="bg-white mx-40">
        <NavbarComponent />
      </div>
      <hr />
      <div className="mx-60 font-poppin">
        <div className="  mt-12">
          <h1 className="text-4xl font-semibold leading-normal">
            The Open Source
          </h1>
          <h1 className="text-primary font-extrabold text-[60px]">
            Document Retrival <br /> Generation
          </h1>
        </div>
        <div className="flex">
          <div className="w-1/3">
            <div className=" text-lg mt-6">
              <p>
                Simply enter your question or prompt, and our <br /> intelligent
                system will retrieve the most relevant <br /> information from
                your uploaded documents.
              </p>
            </div>
            <div className=" mt-10">
              <button className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl tracking-wider">
                <a href="/login">Get Started</a>
              </button>
            </div>
          </div>
          <div className="w-2/3 -mt-60 pr-14">
            <ChatbotComponent />
          </div>
        </div>
        <div className="text-center mt-[-40px]">
          <h1 className="font-semibold text-5xl my-32 tracking-wide">
            <p className="mb-10">Innovative Features for Even</p><p>More Efficiency and Accuratcy</p>
          </h1>
        </div>
        <div className="flex mt-20 -ms-60">
          <div>
            <Image
              src={"/asset/images/chat.png"}
              width="1200"
              height="800"
              alt="Chat Image"
            />
          </div>
          <div className="-ms-52 mt-24">
            <div>
              <h1 className="font-semibold text-3xl leading-relaxed tracking-wider">
                <p>RealTime Collaborative</p>
                <p>With Documents</p>
              </h1>
            </div>
            <div>
              <div className=" text-lg mt-6">
                <div>
                  <p>
                    No more waiting—get instant responses as you and your team
                  </p>
                  <p className="mb-4">
                    work together to find the answers hidden within your <br />
                    documents.
                  </p>

                  <p>Create your own custom widget today to start
                    collaborating
                  </p>and retrieving information instantly.
                </div>
              </div>
              <div className=" mt-10">
                <button className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl tracking-wider">
                  Generate your widget
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full -mt-48">
          <Image
            src={"/asset/images/model.png"}
            alt="model"
            width={1400}
            height={800}
          />
        </div>
        <div className="my-32 text-center p-10 border-2 mx-60 rounded-xl">
          <h1 className="font-bold text-3xl leading-relaxed">
            Instant answers. Greater <br /> productivity. Endless inspiration.
          </h1>
          <button className="bg-primary mt-5 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-xl tracking-wider">
            <Link href="/playground">Let&apos;s Try</Link>
          </button>
        </div>
      </div>
      <div className="mx-40 mb-20">
        <FooterComponent />
      </div>
    </div>
  );
}
