"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getLM, getModelsAction, getProvidersAction, updateModelsAction } from "@/actions/modelAction";
import Loading from "../(playground)/playground/loading";

export default function NavbarComponent() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const accessToken = session?.access_token;
  const [lmData, setLmData] = useState(null); // State to store fetched data
  const [darkMode, setDarkMode] = useState(false);
  const handleLogout = () => {
    signOut({ redirect: false });
    router.push("/");
  };
  const [apiKey, setApiKey] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState();
  const [selectedModel, setSelectedModel] = useState();
  const [selectedTemperature, setSelectedTemperature] = useState();
  const [selectMaxToken, setSelectedToken] = useState()

  const toggleTheme = () => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Initialize theme from localStorage
    const storedTheme = localStorage.getItem("theme") || "light";
    const html = document.documentElement;
    if (storedTheme === "dark") {
      html.classList.add("dark");
      setDarkMode(true);
    } else {
      html.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const head = apiKey?.slice(0, 8); // First 8 characters
  const tail = apiKey?.slice(-8);  // Last 8 characters

  // Combine for display
  const shortenedApiKey = `${head}**************************${tail}`;
  const fetchLM = async () => {
    try {
      const data = await getLM(); // Fetch data from the action
      setLmData(data?.payload); // Store the data in state

      setSelectedProvider(data?.payload?.provider_info?.provider_id)
      setApiKey(data?.payload?.provider_api_key || '')
      setSelectedTemperature(data?.payload?.temperature)
      setSelectedToken(data?.payload?.max_token)
      setSelectedModel(data?.payload?.model_id)
    } catch (error) {
      console.error("Error fetching LM data:", error);
    }
  };

  const [models, setModels] = useState()
  const [providers, setProviders] = useState()
  const [isUpdating, setIsUpdating] = useState(false)
  const fetchModel = async () => {
    try {
      const data = await getModelsAction();
      setModels(data?.models);
    } catch (error) {

    }
  }
  const fetchProvider = async () => {
    try {
      const data = await getProvidersAction();
      setProviders(data?.models);
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchModel();
    fetchLM();
    fetchProvider();
  }, []);

  const handleSelectProvider = async (providerId) => {
    setSelectedProvider(providerId);
    const defaultModel = models?.find((model) => model.provider_id == providerId);
    setSelectedModel(defaultModel?.id || "");
  }
  const handleSelectModel = async (modelId) => {
    setSelectedModel(modelId);
  }

  const handleOnChangeTemperature = async (e) => {
    setSelectedTemperature(e.target.value)
  }
  const handleOnChangeMaxToken = async (e) => {
    setSelectedToken(e.target.value)
  }
  const handleOnChangeAPIKey = async (e) => {
    setApiKey(e.target.value)
  }

  const handleSaveLM = async () => {
    setIsUpdating(true)
    try {
      const apiKeyData = apiKey ? apiKey : null;
      const temperatureData = selectedTemperature ? selectedTemperature : 0.7;
      const maxTokenData = selectMaxToken ? selectMaxToken : 1040;
      const request = {
        model_id: selectedModel,
        provider_api_key: apiKeyData,
        temperature: temperatureData,
        max_token: maxTokenData,
      }
      await updateModelsAction(request)

    } catch (err) {
      console.error("Error saving LM data:", err);
    } finally {
      setIsUpdating(false)
      setApiKey('')
      setIsModalOpen(false);
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    console.log("check if modal is open")
    setIsModalOpen(true);
    document.getElementById("my_modal_3")?.showModal()

  }
  console.log("is modal open", isModalOpen)
  return (
    <div>
      <div className="navbar bg-base-100 font-semibold text-primary dark:bg-gray-900 dark:text-white">
        <div className="navbar-start">
          <div className="flex">
            <Link href="/">
              <Image
                src="/asset/images/logo2.png"
                alt="GPT_LOGO"
                width={50}
                height={50}
              />
            </Link>
            {/* <p className='m-auto font-bold text-xl p-3'>TexBot</p> */}
          </div>
        </div>

        {isLoggedIn ? (
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal text-lg">
              <li>
                <Link href="/" className={pathname === "/" ? "font-bold" : ""}>
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/playground"
                  className={pathname === "/playground" ? "font-bold" : ""}
                >
                  Playground
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/allApps"
                  className={pathname === "/docs" ? "font-bold" : ""}
                >
                  Docs
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}

        <div className="navbar-end text-xl">
          {isLoggedIn ? (
            <div className="flex justify-center items-center ">
              <div className="dropdown relative">
                {/* Profile button to open dropdown */}
                <div tabIndex="0" role="button" className="m-1">
                  {session?.user?.image ? (
                    <Image
                    className="rounded-[50%]"
                      src={session?.user?.image}
                      alt="profile"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <Image
                      src={"/asset/images/profile.png"}
                      alt="profile"
                      width={50}
                      height={50}
                    />
                  )}
                </div>

                {/* Dropdown content - Centered */}
                <ul
                  tabIndex="0"
                  className="dropdown-content  dark:bg-gray-900 menu bg-base-100 rounded-box z-[1] w-64 p-4 shadow absolute left-1/2 transform -translate-x-1/2 mt-2"
                >
                  <li>
                    <a>
                      <Image
                        src={"/asset/images/user.png"}
                        alt="user"
                        width={14}
                        height={14}
                      />
                      <span>
                        {session?.user?.name
                          ? session?.user?.name
                          : session?.user?.email}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <Image
                        src={"/asset/images/setting.png"}
                        alt="setting"
                        width={18}
                        height={18}
                      />
                      {/* You can open the modal using document.getElementById('ID').showModal() method */}
                      <button
                        className="text-left "
                        onClick={() =>
                          // handleOpenModal()
                          document.getElementById("model_setting")?.showModal()
                        }
                      >
                        Settings
                      </button>
                      {/* {
                        isModalOpen && ( */}
                          <dialog id="model_setting" className="modal">
                            <div className="modal-box w-full max-w-3xl p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                              {/* Close Button */}
                              <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                                // onClick={setIsModalOpen(false)}
                                >
                                  <Image
                                    src={"/asset/images/cross.png"}
                                    alt="close"
                                    width={30}
                                    height={30}
                                  />

                                </button>
                              </form>

                              {/* Modal Header */}
                              <h3 className="font-bold pb-3 text-primary dark:text-white border-b border-primary dark:border-gray-700 text-2xl">
                                Settings
                              </h3>

                              {/* Content Grid */}
                              <div className="grid grid-cols-4">
                                {/* Sidebar */}
                                <div className="col-span-1 border-r p-4 text-lg text-primary dark:text-gray-300 border-primary dark:border-gray-700">
                                  Custom Model
                                </div>

                                {/* Main Content */}
                                <div className="col-span-3 p-4">
                                  <div className="flex justify-between mb-5">
                                    <div>
                                      <h1 className="text-lg font-bold text-primary dark:text-white">
                                        Model Configuration
                                      </h1>
                                    </div>

                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Access tokens authenticate your identity to the
                                    Hugging Face Hub and allow applications to
                                    perform actions based on token permissions.
                                  </p>

                                  {/* Configuration Fields */}
                                  <div className="gap-4 ">
                                    <label className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                      Provider
                                    </label>
                                    <select
                                      id="providerDropdown"
                                      className="mb-3 appearance-none w-full border border-primary rounded-md px-4 py-2 pr-10 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      value={selectedProvider}
                                      onChange={(e) => handleSelectProvider(e.target.value)}
                                    >
                                      {providers?.map((provider) => (
                                        <option key={provider?.id} value={provider?.id}>
                                          {provider?.provider_name}
                                        </option>
                                      ))}
                                    </select>
                                    <div>
                                      <label className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Model
                                      </label>
                                      <select
                                        id="providerDropdown"
                                        className="mb-3 appearance-none w-full border border-primary rounded-md px-4 py-2 pr-10 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => handleSelectModel(e.target.value)}
                                      >
                                        {models?.map((model) => (
                                          selectedProvider == model.provider_id ?
                                            <option key={model?.id} value={model?.id}>
                                              {model?.model_name}
                                            </option>
                                            :
                                            ('')
                                        ))}
                                      </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                          Temperature
                                        </label>
                                        <input
                                          type="number"
                                          placeholder={lmData?.temperature}
                                          className="w-full p-3 my-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-gray-600"
                                          onChange={(e) => handleOnChangeTemperature(e)}
                                        />
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                          Max Length
                                        </label>
                                        <input
                                          type="number"
                                          placeholder={lmData?.max_token}
                                          className="w-full p-3 my-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-gray-600"
                                          onChange={(e) => handleOnChangeMaxToken(e)}
                                        />
                                      </div>
                                    </div>
                                    {
                                      selectedProvider == 2 ?
                                        <div>
                                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Secrets & API Keys
                                          </label>
                                          <input
                                            type="text"
                                            placeholder={shortenedApiKey}
                                            className="w-full p-3 my-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-gray-600"
                                            onChange={(e) => handleOnChangeAPIKey(e)}
                                          />
                                        </div>
                                        : ('')
                                    }

                                  </div>
                                  <div className="flex justify-end space-x-3 mt-5">
                                    <button
                                      className={`px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-indigo-700 ${isUpdating ? 'disabled' : ''}`}
                                      onClick={handleSaveLM}>
                                      {
                                        isUpdating ? <span className="loading loading-spinner loading-md text-white"></span> : 'Save'
                                      }
                                    </button>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </dialog>
                        {/* )
                      } */}
                    </a>
                  </li>
                  <li>
                    <a>
                      <Image
                        src={"/asset/images/theme.png"}
                        alt="theme"
                        width={20}
                        height={20}
                      />
                      <span className="cursor-pointer" onClick={toggleTheme}>
                        {darkMode ? "Dark Mode" : "Light Mode"}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>
                      <Image
                        src={"/asset/images/logout.png"}
                        alt="logout"
                        width={18}
                        height={18}
                      />
                      <span className="text-red-500">Log Out</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link href="/login" className="text-primary font-semibold text-lg">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
