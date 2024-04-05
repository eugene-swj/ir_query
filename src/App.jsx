import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {

  const base_url = 'http://localhost:8983/solr/steamreviews/select';
  // const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showParam, setShowParam] = useState(false);
  const [useParam, setUseParam] = useState(false);
  
  //Query Responses
  const [numFound, setNumFound] = useState(null);
  const [gameExist, setGameExist] = useState(null);
  const [queryTime, setQueryTime] = useState(null);
  const [result, setResult] = useState([]);
  const [gameInfo, setGameInfo] = useState();

  //User Query Field
  const [gamequery, setGameQuery] = useState(""); //Game query
  const [paramquery, setParamQuery] = useState("");

  const SolrQuery = async () => {
    if (gamequery !== "") //if query is empty
    {
      setShow(false);
      //Process query string
      // setGameQuery(gamequery.replace(/ AND /i,"").replace(/ OR /i,""));
      // setParamQuery(paramquery.replace(/ AND /i,"").replace(/ OR /i,""));

      getGameName(); //query game

      setShow(true);
      // navigate(`/query?${gamequery}`);
    }
    else {
      alert("Please enter a game in the search bar.")
    }
  } 

  const getGameName = async () => {
    const url = base_url + '?q=game_name:'+ gamequery +'&fl=game_id,game_name&rows=1'
    const res = await axios.get(url);
    const data = res.data;
    setGameExist(data.response.docs.length);
    setQueryTime(data.responseHeader.QTime);
    console.log(data.response.docs);
    setGameInfo(data.response.docs);

    
    if(gameExist !== 0) {
      let url = base_url + '?q=game_name:'+ gamequery;
      
      if(useParam) {
        url = url+ '&fq=document:' + paramquery;
      }

      url = url + '&indent=true&rows=10';

      const res = await axios.get(url);
      const data = res.data;
      console.log(data);
      console.log(data.response.docs);
      setNumFound(data.response.numFound);
      setQueryTime(data.responseHeader.QTime);
      setResult(data.response.docs);
      
    }
    else{
      setResult([]);
    }
  }

  const checkKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      SolrQuery();
    }
  }
  return (
    <div class=" bg-gradient-to-r from-[#00ADEE] to-black min-h-screen w-screen flex flex-col items-center ">
      {/* Web Title */}
      <div class="flex w-full justify-center items-center mt-5">
        <svg class="fill-current flex-shrink-0 mx-5" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><defs><linearGradient id="A" x2="116.626" x1="116.626" y2="60" y1="-173" gradientUnits="userSpaceOnUse"><stop stop-color="#111d2e" offset="0"/><stop stop-color="#051839" offset=".212"/><stop stop-color="#0a1b48" offset=".407"/><stop stop-color="#132e62" offset=".581"/><stop stop-color="#144b7e" offset=".738"/><stop stop-color="#136497" offset=".873"/><stop stop-color="#1387b8" offset="1"/></linearGradient></defs><path d="M4.89-23c14.393 48 58.916 83 111.6 83C180.84 60 233 7.84 233-56.5S180.84-173 116.5-173C54.76-173 4.24-124.97.25-64.24 7.8-51.58 10.732-43.75 4.892-23z" fill="url(#A)" transform="matrix(.274678 0 0 .274678 -.020737 47.519313)"/><path d="M30.33 23.985l.003.158-7.83 11.375c-1.268-.058-2.54.165-3.748.662-.532.217-1.03.483-1.498.79L.062 29.893c0 0-.398 6.546 1.26 11.424l12.156 5.016c.6 2.728 2.48 5.12 5.242 6.27a8.88 8.88 0 0 0 11.603-4.782c.49-1.18.717-2.42.684-3.656L42.21 36.16l.275.005c6.705 0 12.155-5.466 12.155-12.18a12.18 12.18 0 0 0-12.155-12.174c-6.702 0-12.155 5.46-12.155 12.174zm-1.88 23.05c-1.454 3.49-5.466 5.147-8.953 3.694-1.61-.67-2.823-1.898-3.524-3.362l3.957 1.64a5.04 5.04 0 0 0 6.591-2.719 5.05 5.05 0 0 0-2.715-6.601l-4.1-1.695c1.578-.6 3.372-.62 5.05.077 1.7.703 3 2.027 3.696 3.72s.692 3.56-.01 5.246M42.486 32.1c-4.464 0-8.098-3.64-8.098-8.113a8.12 8.12 0 0 1 8.098-8.111 8.12 8.12 0 0 1 8.1 8.111 8.12 8.12 0 0 1-8.1 8.113m-6.068-8.126c0-3.366 2.725-6.095 6.08-6.095s6.084 2.73 6.084 6.095a6.09 6.09 0 0 1-6.084 6.093 6.09 6.09 0 0 1-6.081-6.093z" fill="#fff"/></svg>
        <h1 class="text-4xl font-bold text-gray-100">Steam Review Searcher</h1>
      </div>

      {/* Top */}
      <div class="flex flex-col w-full items-center">
        {/* Search bar */}
        <form class="flex flex-col" autoComplete='off' onKeyDown={(e) => checkKeyDown(e)}>
          <div class="flex flex-row gap-3 mt-10 z-20">
            <div class="flex">
              <input id="game_query" type="text" placeholder="Search for your game" onChange={(e) => setGameQuery(e.target.value)}
                class="w-full md:w-80 px-3 h-10 rounded-l-full border-2 bg-transparent text-white font-semibold placeholder-white border-sky-500 focus:outline-none focus:" />
              
              <button onClick={() => SolrQuery()} type="button" class="bg-sky-500 hover:bg-sky-800 text-white rounded-r-full px-2 md:px-3 py-0 md:py-1">Search</button>
            </div>
            <select id="filterType"
              class="md:w-30 h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded-lg px-2 md:px-3 py-0 md:py-1 tracking-wider">
              <option value="All" selected="">All</option>
              <option value="Filter1">Positive</option>
              <option value="Filter2">Negative</option>
              <option value="Filter3">Neutral</option>
            </select>
            <div id='toggleParam' class={"content-end cursor-pointer transistion-all duration-100 ease-in-out " + (showParam ? ' translate-y-14':'translate-y-0')} onClick={()=>setShowParam(!showParam)}>
              <svg id="down" class={"h-8 w-8 text-sky-300 " + (showParam ? 'hidden':'')}  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="18" y1="13" x2="12" y2="19" />  <line x1="6" y1="13" x2="12" y2="19" /></svg>
              <svg id="up"   class={"h-8 w-8 text-sky-300 " + (showParam ? '':'hidden')}  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="18" y1="11" x2="12" y2="5" />  <line x1="6" y1="11" x2="12" y2="5" /></svg>
            
            </div>
          </div>
          {showParam ? 
          <div id="additional_param" class="flex flex-row mt-5 justify-between">
            <div class="flex items-center">
              <input id="game_query" type="text" placeholder="Search for review" onChange={(e) => setParamQuery(e.target.value)}
                    class="w-full md:w-80 px-3 h-10 rounded-full border-2 bg-transparent text-white font-semibold placeholder-white border-sky-500 focus:outline-none focus:" />
              
              <div class="inline-flex items-center">
                <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="checkbox">
                  <input type="checkbox"
                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    id="checkbox" onChange={() => setUseParam(!useParam)}/>
                  <span
                    class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                      stroke="currentColor" stroke-width="1">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </span>
                </label>
              </div>
              
            </div>
             
            {/* <div id="untoggleParam" class="cursor-pointer" onClick={()=>setShowParam(!showParam)}>
              <svg class="h-8 w-8 text-sky-300"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="18" y1="11" x2="12" y2="5" />  <line x1="6" y1="11" x2="12" y2="5" /></svg>
            </div> */}
            
          </div>
          
          :<></>}
          
        </form>

        {/* Divider */}
        <h3 class="flex items-center w-full max-w-4xl mt-4">
          <span class="flex-grow bg-gray-200 opacity-[.65] rounded h-1"></span>
        </h3>
      </div>

      {show ? ( <>

      {/* Game Info [Start] */}
      {gameInfo?.map((game) => { //Display queried game box art and title
        return (
        <div class="flex h-28 justify-center mt-10 items-center w-fit rounded-md cursor-pointer transition hover:scale-110" onClick={()=>window.open('https://store.steampowered.com/app/'+ game.game_id +'_blank')}>

          {/* Game Image */}
          <img class="h-28 fill-current ml-4 mr-10" alt="box_art.jpg" src={'https://steamcdn-a.akamaihd.net/steam/apps/'+ game.game_id + '/library_600x900_2x.jpg'}/>

          {/* Game Title */}
          <h2 class="text-3xl text-gray-100 mr-4 font-semibold">{game.game_name}</h2>

        </div>
      )
      })}
      {/* Game Info [End] */}
      
      <div class="w-full text-center text-white font-medium mt-6">{numFound} results in {queryTime} milliseconds</div>
      <div class="w-full text-center text-white font-medium mt-2">{"( Showing 10 rows )"}</div>
      {/* Game Reviews [Start]*/}
      <section class="h-auto flex flex-col flex-none antialiased text-gray-600 p-4 w-2xl mb-5 overscroll-none overflow-y-auto">
        <div class="">
        {result?.map((docs) => {
          return (
          <div key={docs.id} class={docs.username === '' ? "hidden":"max-w-2xl mx-auto bg-gradient-to-r from-[#1e7a9b] to-[#323d54] shadow-lg rounded-lg mb-5"}>
            <div class="px-6 py-5">
              <div class="flex items-start">
                {/* Card content [Start] */}
                <div class="flex-grow truncate">
                  {/* Card header [Start]*/}
                  <div class="w-full sm:flex justify-between items-center mb-3">
                    {/* Username and Profile URL [Start]*/}
                    <div class="flex items-center has-tooltip rounded p-1 cursor-pointer" onClick={()=> window.open(docs.profileURL,"_blank")}>
                      <span class="tooltip rounded shadow-lg p-1 text-gray-100 bg-[#323d54] -mt-20 ml-10">View User Profile</span>
                      {/* User Avatar */}
                      <img class=" h-10 w-10 rounded-full fill-current flex-shrink-0 mr-5" alt="avatar.jpg" src={docs.avatarURL}/>
                      
                      <h2 class="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0 cursor-pointer">{docs.username}</h2>
                      
                    </div>
                    {/* Username and Profile URL [End] */}
                    {/* Playtime at review */}
                    <div class="flex-shrink-0 flex items-center sm:ml-2 text-gray-100 space-x-2">
                      <div class="flex items-center text-left text-sm font-medium ">Playtime At Review:</div>
                      <div>{docs.playtime_at_review} hours</div>
                    </div>
                  </div>
                  {/* Card header [End] */}

                  {/* Card body [Start]*/}
                  <div class="flex items-end justify-between whitespace-normal ml-14">
                    {/* Paragraph */}
                    <div id="content" class="max-w-md max-h-28 text-indigo-100 overflow-y-auto">
                      {/* <p class="mb-2">Lorem ipsum dolor sit amet, consecte adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore Lorem ipsum dolor sit amet, consecte adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore Lorem ipsum dolor sit amet, consecte adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore Lorem ipsum dolor sit amet, consecte adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore Lorem ipsum dolor sit amet, consecte adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore Lorem ipsum dolor sit amet, consecte adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.</p> */}
                      <p class="mb-2 whitespace-pre-wrap">{docs.document}</p>
                      {/* <div class="bottom-0 left-0 right-0 z-0 h-8 bg-gradient-to-b from-white from-5% to-black"></div> */}
                    </div>
                    {/* <!-- More link --> */}
                    <a class="flex-shrink-0 flex items-center justify-center text-indigo-600 w-10 h-10 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2" href="#0">
                      {/* <span class="block font-bold"><span class="sr-only">Read more</span></span> */}
                    <svg class="h-8 w-8 text-cyan-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                    </a>
                  </div>
                  {/* Card body [End] */}
                </div>
                {/* Card content [End] */}
              </div>
            </div>
          </div>

          ); 
        })}
                    
        </div>
      </section>
      {/* Game reviews [End] */}
      </> 
      ) : (<></>)}
    </div>
   
  );
}

export default App;
