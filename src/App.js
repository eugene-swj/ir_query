import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [show, setShow] = useState(false);

  return (
    <div class="bg-gray-400 min-h-screen w-full flex flex-col items-center">
      <div class="flex flex-col bg-gray-400 w-full h-24 items-center">
        {/* Search bar */}
        <form class="flex flex-row gap-3 mt-10">
          <div class="flex">
            <input type="text" placeholder="Search for your keyword"
              class="w-full md:w-80 px-3 h-10 rounded-l-full border-2 border-sky-500 focus:outline-none focus:border-sky-800" />

            <button onClick={() => setShow(!show)} type="submit" class="bg-sky-500 hover:bg-sky-800 text-white rounded-r-full px-2 md:px-3 py-0 md:py-1">Search</button>
          </div>
          <select id="filterType"
            class="md:w-30 h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded-lg px-2 md:px-3 py-0 md:py-1 tracking-wider">
            <option value="All" selected="">All</option>
            <option value="Filter1">Filter 1</option>
            <option value="Filter2">Filter 2</option>
            <option value="Filter3">Filter 3</option>
          </select>
        </form>

        {/* Divider */}
        <h3 class="flex items-center w-full max-w-4xl mt-2">
          <span class="flex-grow bg-gray-200 opacity-[.65] rounded h-1"></span>
        </h3>

      </div>

      <section class={show ? "flex flex-col justify-center antialiased text-gray-600 p-4 w-2xl mb-5 h-auto overscroll-none overflow-auto" : "hidden"}>
        <div class="h-full">
          <div class="max-w-2xl mx-auto bg-indigo-600 shadow-lg rounded-lg mb-5">
            <div class="px-6 py-5">
              <div class="flex items-start">
                {/* Icon */}
                {/* <svg class="fill-current flex-shrink-0 mr-5" width="30" height="30" viewBox="0 0 30 30">
                  <path class="text-indigo-300" d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z" />
                  <path class="text-indigo-200" d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z" />
                  <path class="text-indigo-500" d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z" />
                </svg> */}
                {/* Card content  */}
                <div class="flex-grow truncate">
                  {/* Card header */}
                  <div class="w-full sm:flex justify-between items-center mb-3">
                    {/* Title */}
                    <h2 class="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">Simple Design Tips</h2>
                    {/* Like and comment buttons */}
                    <div class="flex-shrink-0 flex items-center space-x-3 sm:ml-2">
                      <button class="flex items-center text-left text-sm font-medium text-indigo-100 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100">
                        <svg class="w-4 h-4 flex-shrink-0 mr-2 fill-current text-gray-300 group-hover:text-gray-200" viewBox="0 0 16 16">
                          <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
                        </svg>
                        <span>498 <span class="sr-only">likes</span></span>
                      </button>
                      <button class="flex items-center text-left text-sm font-medium text-indigo-100 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100">
                        <svg class="w-4 h-4 flex-shrink-0 mr-2 fill-current text-gray-300 group-hover:text-gray-200" viewBox="0 0 16 16">
                          <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7Zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8Z" />
                        </svg>
                        <span>64 <span class="sr-only">comments</span></span>
                      </button>
                    </div>
                  </div>
                  {/* Card body */}
                  <div class="flex items-end justify-between whitespace-normal">
                    {/* Paragraph */}
                    <div class="max-w-md text-indigo-100">
                      <p class="mb-2">Lorem ipsum dolor sit amet, consecte adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.</p>
                    </div>
                    {/* <!-- More link --> */}
                    <a class="flex-shrink-0 flex items-center justify-center text-indigo-600 w-10 h-10 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2" href="#0">
                      <span class="block font-bold"><span class="sr-only">Read more</span></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="max-w-2xl mx-auto bg-indigo-600 shadow-lg rounded-lg mb-5">
            <div class="px-6 py-5">
              <div class="flex items-start">
                {/* Icon */}
                {/* <svg class="fill-current flex-shrink-0 mr-5" width="30" height="30" viewBox="0 0 30 30">
                  <path class="text-indigo-300" d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z" />
                  <path class="text-indigo-200" d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z" />
                  <path class="text-indigo-500" d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z" />
                </svg> */}
                {/* Card content  */}
                <div class="flex-grow truncate">
                  {/* Card header */}
                  <div class="w-full sm:flex justify-between items-center mb-3">
                    {/* Title */}
                    <h2 class="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">Simple Design Tips</h2>
                    {/* Like and comment buttons */}
                    <div class="flex-shrink-0 flex items-center space-x-3 sm:ml-2">
                      <button class="flex items-center text-left text-sm font-medium text-indigo-100 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100">
                        <svg class="w-4 h-4 flex-shrink-0 mr-2 fill-current text-gray-300 group-hover:text-gray-200" viewBox="0 0 16 16">
                          <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
                        </svg>
                        <span>498 <span class="sr-only">likes</span></span>
                      </button>
                      <button class="flex items-center text-left text-sm font-medium text-indigo-100 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100">
                        <svg class="w-4 h-4 flex-shrink-0 mr-2 fill-current text-gray-300 group-hover:text-gray-200" viewBox="0 0 16 16">
                          <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7Zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8Z" />
                        </svg>
                        <span>64 <span class="sr-only">comments</span></span>
                      </button>
                    </div>
                  </div>
                  {/* Card body */}
                  <div class="flex items-end justify-between whitespace-normal">
                    {/* Paragraph */}
                    <div class="max-w-md text-indigo-100">
                      <p class="mb-2">Lorem ipsum dolor sit amet, consecte adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.</p>
                    </div>
                    {/* <!-- More link --> */}
                    <a class="flex-shrink-0 flex items-center justify-center text-indigo-600 w-10 h-10 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2" href="#0">
                      <span class="block font-bold"><span class="sr-only">Read more</span></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="max-w-2xl mx-auto bg-indigo-600 shadow-lg rounded-lg mb-5">
            <div class="px-6 py-5">
              <div class="flex items-start">
                {/* Icon */}
                {/* <svg class="fill-current flex-shrink-0 mr-5" width="30" height="30" viewBox="0 0 30 30">
                  <path class="text-indigo-300" d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z" />
                  <path class="text-indigo-200" d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z" />
                  <path class="text-indigo-500" d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z" />
                </svg> */}
                {/* Card content  */}
                <div class="flex-grow truncate">
                  {/* Card header */}
                  <div class="w-full sm:flex justify-between items-center mb-3">
                    {/* Title */}
                    <h2 class="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">Simple Design Tips</h2>
                    {/* Like and comment buttons */}
                    <div class="flex-shrink-0 flex items-center space-x-3 sm:ml-2">
                      <button class="flex items-center text-left text-sm font-medium text-indigo-100 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100">
                        <svg class="w-4 h-4 flex-shrink-0 mr-2 fill-current text-gray-300 group-hover:text-gray-200" viewBox="0 0 16 16">
                          <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
                        </svg>
                        <span>498 <span class="sr-only">likes</span></span>
                      </button>
                      <button class="flex items-center text-left text-sm font-medium text-indigo-100 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100">
                        <svg class="w-4 h-4 flex-shrink-0 mr-2 fill-current text-gray-300 group-hover:text-gray-200" viewBox="0 0 16 16">
                          <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7Zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8Z" />
                        </svg>
                        <span>64 <span class="sr-only">comments</span></span>
                      </button>
                    </div>
                  </div>
                  {/* Card body */}
                  <div class="flex items-end justify-between whitespace-normal">
                    {/* Paragraph */}
                    <div class="max-w-md text-indigo-100">
                      <p class="mb-2">Lorem ipsum dolor sit amet, consecte adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.</p>
                    </div>
                    {/* <!-- More link --> */}
                    <a class="flex-shrink-0 flex items-center justify-center text-indigo-600 w-10 h-10 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2" href="#0">
                      <span class="block font-bold"><span class="sr-only">Read more</span></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="max-w-2xl mx-auto bg-indigo-600 shadow-lg rounded-lg mb-5">
            <div class="px-6 py-5">
              <div class="flex items-start">
                {/* Icon */}
                {/* <svg class="fill-current flex-shrink-0 mr-5" width="30" height="30" viewBox="0 0 30 30">
                  <path class="text-indigo-300" d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z" />
                  <path class="text-indigo-200" d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z" />
                  <path class="text-indigo-500" d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z" />
                </svg> */}
                {/* Card content  */}
                <div class="flex-grow truncate">
                  {/* Card header */}
                  <div class="w-full sm:flex justify-between items-center mb-3">
                    {/* Title */}
                    <h2 class="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">Simple Design Tips</h2>
                    {/* Like and comment buttons */}
                    <div class="flex-shrink-0 flex items-center space-x-3 sm:ml-2">
                      <button class="flex items-center text-left text-sm font-medium text-indigo-100 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100">
                        <svg class="w-4 h-4 flex-shrink-0 mr-2 fill-current text-gray-300 group-hover:text-gray-200" viewBox="0 0 16 16">
                          <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
                        </svg>
                        <span>498 <span class="sr-only">likes</span></span>
                      </button>
                      <button class="flex items-center text-left text-sm font-medium text-indigo-100 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100">
                        <svg class="w-4 h-4 flex-shrink-0 mr-2 fill-current text-gray-300 group-hover:text-gray-200" viewBox="0 0 16 16">
                          <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7Zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8Z" />
                        </svg>
                        <span>64 <span class="sr-only">comments</span></span>
                      </button>
                    </div>
                  </div>
                  {/* Card body */}
                  <div class="flex items-end justify-between whitespace-normal">
                    {/* Paragraph */}
                    <div class="max-w-md text-indigo-100">
                      <p class="mb-2">Lorem ipsum dolor sit amet, consecte adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.</p>
                    </div>
                    {/* <!-- More link --> */}
                    <a class="flex-shrink-0 flex items-center justify-center text-indigo-600 w-10 h-10 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2" href="#0">
                      <span class="block font-bold"><span class="sr-only">Read more</span></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default App;
