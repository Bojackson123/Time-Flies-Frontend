/* eslint-disable @next/next/no-img-element */
"use client";
import banner from "components/images/dashboard-bg.webp";
import logo from "components/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//export const metadata: Metadata = {
//  title: "Settings",
//  datePublished: "1/1/2023",
//  breadcrumbs: [{ name: "Settings", href: "/settings" }],
//};

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [user, setUser] = useState({ fullname: '', email: '', pfp: ''});
  const [canDelete, setCanDelete] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Fetch login status when component mounts
    const fetchLoginStatus = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/users/is_logged_in', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn); // Update login status based on response
        setUser({fullname: data.fullname, email: data.email, pfp: data.pfp});
        if (!data.isLoggedIn) {
          router.push('/sign-in?type=login'); // Redirect to login page if not logged in
        }
      } catch (error) {
        console.error('Error fetching login status:', error);
        router.push('/sign-in?type=login'); // Redirect to login page on error
      }
    };

    fetchLoginStatus();
  }, [router]);

  useEffect(() => {
    console.log(canDelete); // This will log the updated value whenever `canDelete` changes.
  }, [canDelete]);

  const handleLogout = async () => {

    try {
      const response = await fetch(`http://127.0.0.1:5000/users/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      
      if(!response.ok) {
        throw new Error('Failed to logout');
      }
      console.log('Logged out successfully');
      router.push('/sign-in?type=login');
  
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (newPassword !== confirmNewPassword) {
      toast.error('New password does not match!');
      return;
    }

    // Add your validation for the new password requirements here

    try {
      const response = await fetch('http://127.0.0.1:5000/users/update_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (response.status === 400) {
        toast.error('Both current and new password are required');
        const body = await response.json();
        throw new Error(body.error);
      }
      if (response.status === 406) {
        toast.error('Current password is incorrect');
        const body = await response.json();
        throw new Error(body.error);
      }

      const responseData = await response.json();

      toast.success('Password updated successfully!');
      // Optionally, clear the form or take any other action
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleChangeInfo = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    console.log("name", fullName);
    console.log("email", email);
    console.log("confirmEmail", confirmEmail);
    if (email !== confirmEmail) {
      toast.error('Email does not match!');
      return;
    }

    // Add your validation for the new password requirements here

    try {
      const response = await fetch('http://127.0.0.1:5000/users/update_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          fullName,
          confirmEmail,
        }),
      });

      if (!response.ok) {
        toast.error('All fields left blank');
        const body = await response.json();
        throw new Error(body.error);
      }
      const responseData = await response.json();

      console.log('Info updated successfully!');
      toast.success('Info updated successfully!');
      // Optionally, clear the form or take any other action

    } catch (error) {
      console.error('Error updating info:', error);
    }
  };

  const updateProfilePicture = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch('http://127.0.0.1:5000/users/update_pfp', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        toast.error('Failed to upload profile picture');
        throw new Error('Upload failed');
      }

      const result = await response.json();
      console.log('Upload successful', result);
      toast.success('Profile picture updated successfully!');
      // Handle success
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      // Handle error
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        updateProfilePicture(file);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCanDelete(event.target.checked);
  };

  const handleDeleteClick = async () => {
    if (canDelete) {
      try {
        // Assuming you have the URL and other necessary information for the fetch request
        const response = await fetch('http://127.0.0.1:5000/users/delete_user', {
          method: 'DELETE', 
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            // Include other headers as needed, such as authorization tokens
          },
          // Include body if needed, for example:
          // body: JSON.stringify({ userId: 'USER_ID' }),
        });

        if (response.ok) {
          // Handle successful account deletion
          console.log('Account deleted successfully');
          // You might want to redirect the user or update the UI accordingly
          router.push('/');
        } else {
          // Handle server errors or unsuccessful deletion attempts
          console.error('Failed to delete account');
        }
      } catch (error) {
        // Handle network errors
        console.error('Network error:', error);
      }
    } else {
      toast.error('Please confirm that you want to delete your account');
    }
  };

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));




  return (
    <main className="relative h-full transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      <div className="h-40 lg:h-40 relative z-0">
        <nav navbar-main="true" className="relative flex flex-wrap items-center justify-between px-0 py-4 sm:py-4 mx-4 sm:mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap" navbar-scroll="false">
          <Link href={"/"} className="w-fit block">
            <Image src={logo} alt="Logo" className="w-28 object-contain" />
          </Link>
          <button onClick={() => handleLogout()} className="btn-outline">
            Logout
          </button>
        </nav>
        <Image src={banner} alt="banner" className="absolute inset-0 pointer-events-none -z-10 w-full h-full object-cover brightness-50" />
      </div>
      <div className="w-full py-6 px-3 sm:px-6 sm:py-4 mx-auto relative z-10 -mt-20">
        <div className="flex flex-wrap mb-12 items-start -mx-3">
          <div className="w-full max-w-full mx-auto px-3 lg:flex-0 shrink-0 lg:w-9/12">
            <div className="relative flex flex-col flex-auto min-w-0 p-4 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border" id="profile">
              <div className="flex flex-wrap items-center -mx-3">
                <div className="w-4/12 max-w-full px-3 flex-0 sm:w-auto">
                  <div className="relative inline-flex group overflow-hidden items-center justify-center text-base text-white transition-all duration-200 ease-in-out w-19 h-19 rounded-xl">
                    <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img src={`http://127.0.0.1:5000/uploads/pfp/${user.pfp}`} alt="Avatar" className="size-full shadow-sm rounded-xl" />
                    </div>
                    <input 
                      type="file" 
                      name="update-avatar" 
                      id="update-avatar" hidden 
                      onChange={handleFileChange}
                      />
                    <label htmlFor="update-avatar" className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40 text-white group-hover:opacity-100 group-hover:visible cursor-pointer transition-all duration-300 backdrop-blur-[2px] opacity-0 invisible rounded-full">
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current">
                          <path d="M395.8 39.6c9.4-9.4 24.6-9.4 33.9 0l42.6 42.6c9.4 9.4 9.4 24.6 0 33.9L417.6 171 341 94.4l54.8-54.8zM318.4 117L395 193.6l-219 219V400c0-8.8-7.2-16-16-16H128V352c0-8.8-7.2-16-16-16H99.4l219-219zM66.9 379.5c1.2-4 2.7-7.9 4.7-11.5H96v32c0 8.8 7.2 16 16 16h32v24.4c-3.7 1.9-7.5 3.5-11.6 4.7L39.6 472.4l27.3-92.8zM452.4 17c-21.9-21.9-57.3-21.9-79.2 0L60.4 329.7c-11.4 11.4-19.7 25.4-24.2 40.8L.7 491.5c-1.7 5.6-.1 11.7 4 15.8s10.2 5.7 15.8 4l121-35.6c15.4-4.5 29.4-12.9 40.8-24.2L495 138.8c21.9-21.9 21.9-57.3 0-79.2L452.4 17zM331.3 202.7c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-128 128c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l128-128z" />
                        </svg>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="w-8/12 max-w-full px-3 my-auto flex-0 sm:w-auto">
                  <div className="h-full">
                    <h5 className="mb-1 font-bold">{user.fullname}</h5>
                    <p className="mb-0 text-sm font-semibold leading-normal">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col min-w-0 mt-6 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border" id="basic-info">
              <div className="p-6 mb-0 rounded-t-2xl">
                <h5 className="font-bold ">Basic Info</h5>
              </div>
              <form onSubmit={handleChangeInfo}>
              <div className="flex-auto p-6 pt-0 space-y-5">
                <div className="flex flex-wrap -mx-3 flex-col sm:flex-row gap-y-5">
                  <div className="sm:w-6/12 max-w-full px-3 flex-0">
                    
                    <label className="mb-2 ml-1 text-xs font-bold text-slate-700  /80" htmlFor="Full Name">
                      Full Name
                    </label>
                    <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                      <input 
                        type="text" 
                        name="Full Name" 
                        placeholder="Alec" 
                        className="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80  /80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                  </div>
                  <div className="sm:w-6/12 max-w-full px-3 flex-0">
                    <label className="mt-6 mb-2 ml-1 text-xs font-bold text-slate-700  /80" htmlFor="Phone Number">
                      Phone Number
                    </label>
                    <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                      <input type="tel" name="Phone Number" placeholder="+40 735 631 620" className="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80  /80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 flex-col sm:flex-row gap-y-5">
                  <div className="sm:w-6/12 max-w-full px-3 flex-0">
                    <label className="mt-6 mb-2 ml-1 text-xs font-bold text-slate-700  /80" htmlFor="Email">
                      Email
                    </label>
                    <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                      <input 
                        type="email" 
                        name="Email" 
                        placeholder="example@email.com" 
                        className="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80  /80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                  </div>
                  <div className="sm:w-6/12 max-w-full px-3 flex-0">
                    <label className="mt-6 mb-2 ml-1 text-xs font-bold text-slate-700  /80" htmlFor="Confirmation Email">
                      Confirm Email
                    </label>
                    <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                      <input 
                        type="email" 
                        name="Confirmation Email" 
                        placeholder="example@email.com" 
                        className="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80  /80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" 
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        />
                    </div>
                  </div>
                </div>
              </div>
              
              

              <div className="px-6 pb-12">
                <button className="inline-block float-right px-8 py-2 mb-0 text-xs font-bold leading-normal text-right text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 bg-gradient-to-tl from-zinc-800 to-zinc-700 tracking-tight-rem bg-150 bg-x-25">Update Info</button>
              </div>
              </form>
              
            </div>
            <div className="relative flex flex-col min-w-0 mt-6 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border" id="password">
              <div className="p-6 mb-0 rounded-t-2xl">
                <h5 className="font-bold ">Change Password</h5>
              </div>
              <div className="flex-auto p-6 pt-0">
                <form onSubmit={handleChangePassword}>
                  <label className="inline-block mb-2 ml-1 text-xs font-bold text-slate-700  /80" htmlFor="Current password">
                    Current password
                  </label>
                  <div className="mb-4">
                    <input 
                      type="password" 
                      name="Current password" 
                      placeholder="Current password" 
                      className="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80  /80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                  </div>
                  <label className="inline-block mb-2 ml-1 text-xs font-bold text-slate-700  /80" htmlFor="New password">
                    New password
                  </label>
                  <div className="mb-4">
                    <input 
                      type="password" 
                      name="New password" 
                      placeholder="New password" 
                      className="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80  /80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      />
                  </div>
                  <label className="inline-block mb-2 ml-1 text-xs font-bold text-slate-700  /80" htmlFor="Confirm new password">
                    Confirm new password
                  </label>
                  <div className="mb-4">
                    <input 
                      type="password" 
                      name="Confirm new password" 
                      placeholder="Confirm password" 
                      className="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80  /80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" 
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                  </div>
                  <h5 className="mt-12 text-slate-500">Password requirements</h5>
                  <p className="mb-2 text-slate-500 ">Please follow this guide for a strong password:</p>
                  <ul className="float-left pl-6 mb-0 list-disc text-slate-500">
                    <li>
                      <span className="text-sm leading-normal">One special characters</span>
                    </li>
                    <li>
                      <span className="text-sm leading-normal">Min 6 characters</span>
                    </li>
                    <li>
                      <span className="text-sm leading-normal">One number (2 are recommended)</span>
                    </li>
                    <li>
                      <span className="text-sm leading-normal">Change it often</span>
                    </li>
                  </ul>
                  <button type="submit" className="inline-block float-right px-8 py-2 mt-16 mb-0 text-xs font-bold leading-normal text-right text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 bg-gradient-to-tl from-zinc-800 to-zinc-700 tracking-tight-rem bg-150 bg-x-25">Update password</button>
                </form>
              </div>
            </div>

            <div className="relative flex flex-col min-w-0 mt-6 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border" id="delete">
              <div className="p-6 rounded-t-2xl">
                <h5 className="font-bold ">Delete Account</h5>
                <p className="mb-0 text-sm leading-normal  /60">Once you delete your account, there is no going back. Please be certain.</p>
              </div>
              <div className="flex-auto p-6 pt-0 sm:flex">
                <div className="flex items-center mb-6 sm:mb-0">
                  <div>
                    <div className="block pl-12 mb-0 min-h-6">
                      <input 
                        id="deleteCheckbox"
                        className="rounded-10 duration-250 ease-in-out after:rounded-circle after:shadow-2xl after:duration-250 checked:after:translate-x-5.3 h-5 mt-0.5 relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-blue-500/95 checked:bg-blue-500/95 checked:bg-none checked:bg-right checked:after:left-[calc(100%-18px)] after:transition-all after:duration-300 after:left-0" 
                        type="checkbox" 
                        checked={canDelete}
                        onChange={handleCheckboxChange}
                        />
                    </div>
                  </div>
                  <div className="ml-2">
                    <span className="block text-sm font-semibold leading-normal text-slate-700  ">Confirm</span>
                    <span className="block text-xs leading-tight">I want to delete my account.</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="inline-block px-5 py-2.5 m-0 ml-auto text-sm font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer tracking-tight-rem bg-gradient-to-tl from-red-600 to-orange-600 bg-150 bg-x-25 hover:-translate-y-px active:opacity-85"
                  onClick={handleDeleteClick}
                >
                  Delete account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
