"use client";
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getLM, updateModelsAction } from "@/actions/modelAction";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ResponsiveNavbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const isLoggedIn = !!session;
    const accessToken = session?.access_token;
    const [lmData, setLmData] = useState(null); // State to store fetched data
    const [darkMode, setDarkMode] = useState(false);
    const handleLogout = () => {
        setIsLogoutModalOpen(false)
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

    const models = [
        {
            "id": 1,
            "provider_id": 1,
            "model_name": "llama3.1",
            "provider_info": {
                "provider_id": 1,
                "provider_name": "default"
            }
        },
        {
            "id": 2,
            "provider_id": 1,
            "model_name": "llama3.2",
            "provider_info": {
                "provider_id": 1,
                "provider_name": "default"
            }
        },
        {
            "id": 3,
            "provider_id": 2,
            "model_name": "gpt-4o-mini",
            "provider_info": {
                "provider_id": 2,
                "provider_name": "openai"
            }
        }
    ]
    const providers = [
        {
            "id": 1,
            "provider_name": "default"
        },
        {
            "id": 2,
            "provider_name": "openai"
        }
    ]
    const [isUpdating, setIsUpdating] = useState(false)
    useEffect(() => {
        fetchLM();
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

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
    const handleLogoutModal = () => {
        setIsLogoutModalOpen(true)
        document.getElementById("logout_modal")?.showModal()
    }
    const [isSettingModalOpen, setIsSettingModalOpen] = useState(false)
    const handleSettingModal = () => {
        setIsSettingModalOpen(true)
        document.getElementById("model_setting")?.showModal()
    }
    const navigation = useMemo(() => [
        { name: 'Overview', href: '/' },
        { name: 'Playground', href: '/playground' },
        { name: 'Document', href: '/docs/allApps' },
    ], []);

    return (
        <Disclosure as="nav" className="bg-white dark:bg-none">
            <div className="xl:mx-auto sm:mx-0 max-w-full sm:px-0 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-primary hover:bg-[#b6ddff] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <Image
                                src="/asset/images/logo2.png"
                                alt="GPT_LOGO"
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className="hidden sm:ml-6 md:mx-auto sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (<Link
                                        key={item.name}
                                        href={item.href}
                                        aria-current={isActive ? 'page' : undefined}
                                        className={classNames(
                                            isActive ? 'font-bold ' : 'hover:bg-primary hover:text-white font-medium',
                                            'rounded-md px-3 py-2 2xl:text-lg lg:text-base text-primary',
                                        )}
                                    >
                                        {item.name}
                                    </Link>)
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center xl:pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                        {/* Profile dropdown */}
                        <Menu as="div" className="relative xl:ml-3 sm:ml-0">
                            <div>
                                <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                                    <span className="absolute" />
                                    <span className="sr-only">Open user menu</span>
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

                                            </div>
                                        </div>
                                    ) : (
                                        <Link href="/login" className="text-primary font-semibold text-lg">
                                            Login
                                        </Link>
                                    )}
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-64 origin-top-right  bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in rounded-box py-3 text-primary font-semibold"
                            >
                                <MenuItem>
                                    <div className="flex mx-5 text-base  data-[focus]:bg-gray-100 data-[focus]:outline-none p-2 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"><path d="M19.727 20.447c-.455-1.276-1.46-2.403-2.857-3.207S13.761 16 12 16s-3.473.436-4.87 1.24s-2.402 1.931-2.857 3.207" /><circle cx="12" cy="8" r="4" /></g></svg>
                                        <span className="ml-3">
                                            {session?.user?.name ?
                                                session?.user?.name
                                                :
                                                session?.user?.email}
                                        </span>
                                    </div>
                                </MenuItem>
                                <MenuItem>
                                    <div className="flex mx-5 text-base cursor-pointer data-[focus]:bg-gray-100 data-[focus]:outline-none p-2 rounded-lg" onClick={handleSettingModal}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 .845l9.66 5.578v11.154L12 23.155l-9.66-5.578V6.423zm0 2.31L4.34 7.577v8.846L12 20.845l7.66-4.422V7.577zM12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6m-5 3a5 5 0 1 1 10 0a5 5 0 0 1-10 0" /></svg>
                                        <div className="text-left ml-3">
                                            Settings
                                        </div>
                                    </div>
                                </MenuItem>
                                <MenuItem>
                                    <div className="flex mx-5 text-base cursor-pointer data-[focus]:bg-gray-100 data-[focus]:outline-none p-2 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13 1v3h-2V1zm7.485 3.928L18.364 7.05L16.95 5.636l2.121-2.122zM4.93 3.514l2.12 2.122L5.636 7.05L3.515 4.929zM12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-6 4a6 6 0 1 1 12 0a6 6 0 0 1-12 0m-5-1h3v2H1zm19 0h3v2h-3zM7.05 18.363l-2.12 2.123l-1.415-1.416l2.121-2.122zm11.314-1.414l2.121 2.122l-1.414 1.414l-2.121-2.121zM13 20v3h-2v-3z" /></svg>
                                        <span className="ml-3" onClick={toggleTheme}>
                                            {darkMode ? "Dark Mode" : "Light Mode"}
                                        </span>
                                    </div>
                                </MenuItem>
                                <MenuItem>

                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        handleLogoutModal();
                                    }}><div className="flex mx-5 text-base  data-[focus]:bg-gray-100 data-[focus]:outline-none p-2 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m21.207 11.793l-5.914 5.914l-1.414-1.414l3.5-3.5H7.793v-2h9.586l-3.5-3.5l1.414-1.414zm-11.414-7.5h-5v15h5v2h-7v-19h7z" /></svg>
                                            <span className="text-red-500 ml-3">Log Out</span></div>
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
            {
                isSettingModalOpen && (

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
                                                    {provider?.provider_name.toUpperCase()}
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
                                                            {model?.model_name.toUpperCase()}
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
                )
            }
            {
                isLogoutModalOpen && (
                    <dialog id="logout_modal" className="modal flex justify-center items-center">
                        <div className="">
                            <div className="modal-box w-[400px] p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                                <div className="text-lg mb-8 text-primary font-medium">Do you want to logout ?</div>
                                <div className="flex justify-end text-base" >
                                    <form method="dialog">
                                        <button className="btn" onClick={() => setIsLogoutModalOpen(false)}>Cancel</button>
                                    </form>
                                    <button className="btn bg-red-500 text-white ml-5" onClick={handleLogout}>
                                        Logout
                                    </button>

                                </div>
                            </div>

                        </div>
                    </dialog>
                )
            }

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}
