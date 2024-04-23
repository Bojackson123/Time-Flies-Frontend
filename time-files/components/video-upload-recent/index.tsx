/* eslint-disable @next/next/no-img-element */
"use client";

import { Menu, Transition } from "@headlessui/react";
import Container from "components/container";
import Ellipsis from "components/icons/ellipsis";
import Upload from "components/icons/upload";
import VideoFile from "components/icons/video-file";
import banner from "components/images/insight-girls.png";
import WindowWidthTracker from "lib/resizer";
import { cn } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dashedBorder = {
  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='40' ry='40' stroke='%23334155' stroke-width='4' stroke-dasharray='20%2c 14' stroke-dashoffset='9' stroke-linecap='round'/%3e%3c/svg%3e")`,
};


interface Video {
  id: number
  title: string;
  date: string;
  banner: string;
}

export default function VideoUploadRecent() {
  const [tab, setTab] = useState("upload");
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  

  const setTabId = (id: string) => {
    setTab(id);
    if (id === "videos") {
      fetchVideos(); // Fetch videos when tab is switched to "videos"
    }
  };

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/videos/get', {
        method: 'GET',
        credentials: 'include',
      
    }); 
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setVideos(data.videos); 
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const uploadVideo = async (file: File, title: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title); // Replace with actual title
  
    try {
      const response = await fetch('http://127.0.0.1:5000/videos/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      const result = await response.json();
      console.log('Upload successful', result);
  
      // Extract the videoID from the response
      const videoID = result.video_id;
      console.log('Video ID:', videoID);
  
      // Return the videoID or the whole result object if you need more data later
      return videoID;
    } catch (error) {
      console.error('Error uploading video:', error);
      // Handle error
      throw error; // Re-throw the error to be caught by toast.promise error handling
    }
  };

  const handleDelete = async (id: number) => {

    try {
      const response = await fetch(`http://127.0.0.1:5000/videos/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if(!response.ok) {
        toast.error('Failed to delete');
        throw new Error('Failed to delete');
      }
      console.log('Video deleted');
      toast.success('Video deleted');
      fetchVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  // Handle file selection
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
  
      // Indicate upload start
      const toastId = toast.loading('Upload in progress...');
  
      try {
        const videoID = await uploadVideo(file, file.name);
        
        // Update the toast to show success message
        toast.update(toastId, {
          render: `Upload successful!`,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        
        await wait(2000); // Wait for 2 seconds before redirecting
        router.push(`/video-result/${videoID}`);
  
      } catch (error) {
        console.error('Error uploading video:', error);
        // Update the toast to show error message
        toast.update(toastId, {
          render: `Upload failed!`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    }
  };

  // Handle drag and drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file) {
      toast.promise(
        uploadVideo(file, file.name), // This function should return a Promise
        {
          pending: 'Upload in progress...',
          success: 'Upload successful!',
          error: 'Upload failed!',
        }
      );
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

 
  return (
    <section className="pt-10 md:pt-[50px] pb-24 md:pb-[276px]">
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
      <Container>
        <div className="max-w-[864px] w-full mx-auto">
          <div className="max-w-[424px] w-full mx-auto flex bg-white flex-col sm:flex-row rounded-3xl sm:rounded-full overflow-hidden py-2 sm:py-1.5 gap-2 px-2 relative z-0">
            <button className={cn("sm:flex-1 flex items-center transition-all duration-200 justify-center px-4 h-12 rounded-full text-base font-medium gap-2", { "text-white": tab === "upload" })} onClick={() => setTabId("upload")}>
              <Upload />
              <span>Upload New</span>
            </button>
            <button className={cn("sm:flex-1 flex items-center transition-all duration-200 justify-center px-4 h-12 rounded-full text-base font-medium gap-2", { "text-white": tab === "videos" })} onClick={() => setTabId("videos")}>
              <VideoFile />
              <span>Previous Videos</span>
            </button>
            <div className="absolute sm:w-1/2 rounded-[20px] sm:rounded-full h-12 sm:h-auto right-2 sm:right-auto pointer-events-none transition-all duration-200 -z-10 bg-blue-500 inset-y-1.5 left-2" style={{ left: WindowWidthTracker() >= 640 ? (tab === "upload" ? "8px" : "calc(50% - 8px)") : "8px", top: WindowWidthTracker() <= 639 ? (tab === "upload" ? "8px" : "calc(50% + 5px)") : "" }} />
          </div>

          <div className="text-center max-w-[710px] mx-auto mt-8 mb-[60px]">
            <h2 className="text-4xl font-bold leading-[56px] text-slate-800 md:text-5xl">Upload Your Video for Analysis</h2>
            <p className="mt-2 text-base font-normal leading-6 text-[#808D9E] md:text-xl md:leading-8">Ppload your video content to initiate the analysis process and gain valuable insights into subjective time perception.</p>
          </div>
        </div>

        {tab === "upload" && (
          <div 
            className={cn("max-w-[864px] bg-white mx-auto w-full rounded-[40px] h-[360px] p-8 text-center flex flex-col items-center justify-center z-0 relative", tab === "upload" ? "animate-in" : "animate-out")} style={dashedBorder}
            onDrop= {handleDrop}
            onDragOver= {handleDragOver}
          >
            <label htmlFor="upload-video" className="block mb-6 rounded-full w-fit mx-auto px-9 py-3.5 text-xl leading-8 font-semibold text-white bg-primary transition-all hover:bg-blue-600 cursor-pointer">
              Upload a Video
            </label>
            <h5 className="text-lg font-medium text-slate-700 mb-2">Drag and drop video</h5>
            <input 
              type="file" 
              id="upload-video" 
              className="absolute inset-0 w-full h-full -z-10 opacity-0" 
              onChange={handleFileChange}
            />
          </div>
        )}

        {tab === "videos" && (
          <div className={cn("sm:max-w-[1090px] -mx-6 sm:mx-auto sm:w-full bg-white sm:rounded-3xl px-6 py-10 md:p-8 animate-in", tab === "videos" ? "animate-in" : "animate-out")}>
            <div className="md:h-[840px] md:overflow-auto md:pr-6">
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <div className="lg:divide-y lg:space-y-6 divide-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 lg:block">
                  {videos.length === 0 && (
                    <p className="">No videos found!</p>
                  )}
                  {videos.map((item, index) => (
                    <div key={index} className="lg:pt-6 first:pt-0">
                      <div className="flex items-center flex-col lg:flex-row gap-6 justify-between">
                        <div className="rounded-2xl w-full lg:w-auto aspect-video lg:aspect-auto lg:h-28 overflow-hidden">
                          <img src={`http://127.0.0.1:5000/uploads/${item.banner}`} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      <div className="flex-1 w-full md:w-auto">
                        <h4 className="text-2xl font-semibold line-clamp-1 text-dark">{item.title}</h4>
                        <p className="mt-4 text-dark">{item.date}</p>
                      </div>
                      <div className="flex items-center justify-between lg:justify-normal w-full lg:w-auto gap-4">
                        <Link className="block rounded-full w-fit px-9 py-3 text-xl leading-8 font-semibold text-white bg-primary transition-all hover:bg-blue-600 cursor-pointer" href={`/video-result/${item.id}`}>
                          Results
                        </Link>
                        <div className="relative z-0">
                          <Menu as="div" className="relative inline-block text-left">
                            <Menu.Button>
                              <Ellipsis />
                            </Menu.Button>
                            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                              <Menu.Items className="absolute right-full mt-2 top-0 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                <div className="px-1 py-1">

                                  <Menu.Item>{({ active }) => <button onClick={() => handleDelete(item.id)} className={`${active ? "bg-primary text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Delete</button>}</Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
