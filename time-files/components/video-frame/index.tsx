/* eslint-disable @next/next/no-img-element */
import Container from "components/container";
import PlayButton from "components/icons/play-button";
import Xmark from "components/icons/xmark";
import videobanner from "components/images/insight-girls.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as React from 'react';
import Button from '@mui/material/Button';
import { Slider } from "@mui/material";

interface VideoProps {
  video: string;
}
interface Video {
  id: number
  title: string;
  date: string;
  banner: string;
}

export default function VideoFrame(props: VideoProps) {
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasVideoResults, setHasVideoResults] = useState(false);
  const id  = props.video; // Getting the video ID from the URL parameter
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

  useEffect(() => {
    const fetchVideo = async () => {
      // Ensure that we have an id and it's not an array
      if (id && typeof id === 'string') {
        try {
          const response = await fetch(`http://127.0.0.1:5000/videos/get/${id}`, {
            method: 'GET',
            credentials: 'include',
          });
          if (!response.ok) throw new Error('Video not found');
          const data = await response.json();
          setVideo(data);
          setHasVideoResults(data.results && data.results !== "");
        } catch (error) {
          console.error("Failed to fetch video:", error);
          // Handle error (show error message, navigate to an error page, etc.)
        }
      }
    };

    

    fetchVideo();
  }, [id]); // This effect depends on the 'id' parameter

  // Handling case where video data is not yet fetched
  if (!video) {
    return <div>Loading...</div>;
  }
  const toggleVideoPlay = () => {
    setIsPlaying(!isPlaying); // Toggle video play state
  };

  const analyzeVideoById = async () => {
    // Indicate analysis start
    const toastId = toast.loading('Analysis in progress...');
    const analyzeButton = document.getElementById('analyzeButton') as HTMLButtonElement;
    
    // Check if the analyzeButton exists before attempting to modify it
    if (analyzeButton) {
        // Disable the analyze button to prevent subsequent presses
        analyzeButton.disabled = true;
        analyzeButton.classList.add('opacity-50'); // Optional: reduce opacity to visually indicate it's disabled
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/videos/analyze/${id}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            // If response is not ok, update the toast to show error message
            toast.update(toastId, { render: 'Error analyzing video', type: 'error', isLoading: false });
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // On success, update the toast to show success message
        toast.update(toastId, { render: 'Video analysis complete', type: 'success', isLoading: false });

        // Optionally, wait for 2 seconds before reloading
        await wait(2000);
        window.location.reload();
    } catch (error) {
        // Log error and update the toast to show the caught error message
        console.error('Error analyzing video');
        toast.update(toastId, { render: `Error analyzing video`, type: 'error', isLoading: false });
    } finally {
        // Re-enable the button after the process is complete or if an error occurred
        // Check again if the analyzeButton exists
        if (analyzeButton) {
            analyzeButton.disabled = false;
            analyzeButton.classList.remove('opacity-50'); // Optional: restore opacity
        }
    }
};

  const downloadResults = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/videos/download_results/${id}`, {
        method: 'GET',
        credentials: 'include',
      });
  
      if (!response.ok) {
        toast.error('Error downloading video results');
        throw new Error('Network response was not ok');
      }
  
      // Create a blob from the response data
      const blob = await response.blob();
      // Create a URL from the blob
      const url = window.URL.createObjectURL(blob);
      // Create a temporary link element
      const a = document.createElement('a');
      // Set the download filename
      a.download = 'video_results'; 
      // Set the href to the blob URL
      a.href = url;
      // Append the link to the body (required for Firefox)
      document.body.appendChild(a);
      // Trigger the download by simulating a click
      a.click();
      // Remove the link after triggering the download
      document.body.removeChild(a);
      // Release the blob URL to free up resources
      window.URL.revokeObjectURL(url);
  
    } catch (error) {
      console.error('Error downloading video results', error);
    }
  };

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  return (
    <section className="sm:pt-10 md:pt-12 sm:pb-20 md:pb-40">
      <ToastContainer />
      <Container>
        <div className="sm:rounded-2xl md:rounded-[40px] px-6 py-10 -mx-6 sm:mx-0 sm:p-9 bg-white" style={{ boxShadow: "0px 20px 146.1px -5px rgba(67, 21, 168, 0.1)" }}>
          <div className="flex items-center justify-between mb-8 md:mb-12 gap-8">
            <h3 className="text-2xl md:text-4xl font-semibold text-dark">{video.title}</h3>
            <a href= "/video" className="text-[#323232]">
              <Xmark />
            </a>
          </div>
      
          <div className="rounded-2xl overflow-hidden aspect-video md:aspect-auto md:h-auto relative z-0 mb-8" style={{ height: '600px' }}>
            {hasVideoResults ? (
              <iframe
              key={video.id}
              src={`http://localhost:3000/chart/index.html?data=${encodeURIComponent(`http://127.0.0.1:5000/videos/get_graph_data/${video.id}`)}&video=${encodeURIComponent(`http://127.0.0.1:5000/videos/video/${video.id}`)}`}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
            ) : (
              isPlaying ? (
                <video controls autoPlay className="w-full h-full object-contain">
                  <source src={`http://127.0.0.1:5000/videos/video/${video.id}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <>
                  <img src={`http://127.0.0.1:5000/uploads/${video.banner}`} alt="Video Banner" className="w-full h-full object-cover" />
                  <button onClick={toggleVideoPlay} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <PlayButton className="w-14 h-14 md:w-auto md:h-auto" />
                  </button>
                </>
              )
            )}
          </div>
      
        

          
          <div>
            {hasVideoResults ? (
              <>
              <p className="text-center font-bold text-2x1"> Attention Threshold</p>
              <div className="py-5">
              <Slider
                aria-label="Temperature"
                defaultValue={30}
                valueLabelDisplay="auto"
                shiftStep={30}
                step={10}
                marks
                min={0}
                max={100}
              />
              </div>
                <button className="block rounded-full w-fit px-11 py-3.5 mx-auto text-base leading-8 font-semibold text-white bg-primary transition-all hover:bg-blue-600 mb-6 cursor-pointer" onClick={downloadResults}>
                  Download Result
                </button>
                <div className="flex justify-center test-base font-semibold">
                  <p>Press the link to download the results.</p>
                </div>
              </>  
              ) : (
              <>
                <button id="analyzeButton" className="block rounded-full w-fit px-11 py-3.5 mx-auto text-base leading-8 font-semibold text-white bg-primary transition-all hover:bg-blue-600 mb-6 cursor-pointer" onClick={analyzeVideoById}>
                  Analyze Video
                </button>
                <div className="flex flex-col justify-center items-center test-base font-semibold">
                <p>Video must be 30 FPS for accurate results.</p>
                <br />
                <p>Video analysis may take up to 5 minutes. Please be patient.</p>
                </div>

              </>
            )}
          </div>

          

        </div>
      </Container>
    </section>
  );
}
