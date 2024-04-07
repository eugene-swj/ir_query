import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {

  const base_url = 'http://localhost:8983/solr/steamreviews/select';
  const facet_url = '&facet=true&facet.field=label&facet.range=playtime_at_review&f.playtime_at_review.facet.range.start=0&f.playtime_at_review.facet.range.end=450000&f.playtime_at_review.facet.range.gap=100000';
  const end_url = '&indent=true&rows='
  const navigate = useNavigate();

  //Display states
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showParam, setShowParam] = useState(false);
  const [prevURL, setPrevURL] = useState("");
  const [showScroll, setShowScroll] = useState(false);
  
  //Query Responses
  const [numFound, setNumFound] = useState(null);
  const [gameExist, setGameExist] = useState(null);
  const [queryTime, setQueryTime] = useState(null);
  const [result, setResult] = useState([]);
  const [gameInfo, setGameInfo] = useState();
  const [displayRows, setDisplayRows] = useState("10");

  //Facet Fields
  const [positivelabel, setPositiveLabel] = useState("");
  const [negativelabel, setNegativeLabel] = useState("");
  const [neutrallabel , setNeutralLabel] = useState("");
  const [zeroRange, setZeroRange] = useState("");
  const [oneRange, setOneRange] = useState("");
  const [twoRange, setTwoRange] = useState("");
  const [threeRange, setThreeRange] = useState("");
  const [fourRange, setFourRange] = useState("");
  
  //User Query Fields
  const [gamequery, setGameQuery] = useState(""); //Game query
  const [paramquery, setParamQuery] = useState("");
  const [rows, setRows] = useState("10");

  //Prevent refresh when enter
  const checkKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      SolrQuery();
    }
  }
  //Scroll to top button
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 100) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  });
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
  }

  //Facet filter
  const toggleFilter = async () => {
    const pos_checkbox = document.getElementById('positive');
    const neg_checkbox = document.getElementById('negative');
    const neu_checkbox = document.getElementById('neutral');

    let filterpositive = pos_checkbox.checked;
    let filternegative = neg_checkbox.checked;
    let filterneutral = neu_checkbox.checked;

    //Check status of filter checkboxes
    let filter_label_str = ''; //eg. &fq=label(positive%20OR%20negative)
    if ((filterpositive&&filternegative&&filterneutral)||(!filterpositive&&!filternegative&&!filterneutral)) //All or none selected
    {filter_label_str = '';}
    if (filterpositive && !filternegative && !filterneutral) //Positive selected
    {filter_label_str = '&fq=label:(positive)';}
    if (!filterpositive && filternegative && !filterneutral) //Negative selected
    {filter_label_str = '&fq=label:(negative)';}
    if (!filterpositive && !filternegative && filterneutral) //Neutral selected
    {filter_label_str = '&fq=label:(neutral)';}
    if (filterpositive && filternegative && !filterneutral) //Positive and negative selected
    {filter_label_str = '&fq=label:(positive%20OR%20negative)';}
    if (filterpositive && !filternegative && filterneutral) //Positive and neutral selected
    {filter_label_str = '&fq=label:(positive%20OR%20neutral)';}
    if (!filterpositive && filternegative && filterneutral) //Negative and neutral selected
    {filter_label_str = '&fq=label:(neutral%20OR%20negative)';}

    const zero_checkbox = document.getElementById('0to1');
    const one_checkbox = document.getElementById('1to2');
    const two_checkbox = document.getElementById('2to3');
    const three_checkbox = document.getElementById('3to4');
    const four_checkbox = document.getElementById('4to5');
    
    let filterzero = zero_checkbox.checked;
    let filterone = one_checkbox.checked;
    let filtertwo = two_checkbox.checked;
    let filterthree = three_checkbox.checked;
    let filterfour = four_checkbox.checked;

    let filter_range_str = ''
    if ((filterzero && filterone && filtertwo && filterthree && filterfour) || (!filterzero && !filterone && !filtertwo && !filterthree && !filterfour))
    {filter_range_str = '';}
    if (filterzero && !filterone && !filtertwo && !filterthree && !filterfour) //0 to 100,000
    {filter_range_str = '&fq=playtime_at_review:[0%20TO%20100000]';}
    if (filterzero && filterone && !filtertwo && !filterthree && !filterfour) //0 to 200,000
    {filter_range_str = '&fq=playtime_at_review:[0%20TO%20200000]';}
    if (filterzero && filterone && filtertwo && !filterthree && !filterfour) //0 to 300,000
    {filter_range_str = '&fq=playtime_at_review:[0%20TO%20300000]';}
    if (filterzero && filterone && filtertwo && filterthree && !filterfour) //0 to 400,000
    {filter_range_str = '&fq=playtime_at_review:[0%20TO%20400000]';}
    if (filterzero && !filterone && filtertwo && !filterthree && !filterfour) //0 to 100,000 OR 200,000 to 300,000
    {filter_range_str = '&fq=playtime_at_review:([0%20TO%20100000]%20OR%20[200000%20TO%20300000])';}
    if (filterzero && !filterone && filtertwo && filterthree && !filterfour) //0 to 100,000 OR 200,000 to 400,000
    {filter_range_str = '&fq=playtime_at_review:([0%20TO%20100000]%20OR%20[200000%20TO%20400000])';}
    if (filterzero && !filterone && filtertwo && filterthree && filterfour) //0 to 100,000 OR 200,000 to 500,000
    {filter_range_str = '&fq=playtime_at_review:([0%20TO%20100000]%20OR%20[200000%20TO%20500000]';}
    if (filterzero && !filterone && !filtertwo && filterthree && !filterfour) //0 to 100,000 OR 300,000 to 400,000
    {filter_range_str = '&fq=playtime_at_review:([0%20TO%20100000]%20OR%20[300000%20TO%20400000])';}
    if (filterzero && !filterone && !filtertwo && filterthree && filterfour) //0 to 100,000 OR 300,000 to 500,000
    {filter_range_str = '&fq=playtime_at_review:([0%20TO%20100000]%20OR%20[300000%20TO%20500000])';}
    if (filterzero && !filterone && !filtertwo && !filterthree && filterfour) //0 to 100,000 OR 400,000 to 500,000
    {filter_range_str = '&fq=playtime_at_review:([0%20TO%20100000]%20OR%20[400000%20TO%20500000])';}

    if (!filterzero && filterone && !filtertwo && !filterthree && !filterfour) //100,000 to 200,000
    {filter_range_str = '&fq=playtime_at_review:[100000%20TO%20200000]';}
    if (!filterzero && filterone && filtertwo && !filterthree && !filterfour) //100,000 to 300,000
    {filter_range_str = '&fq=playtime_at_review:[100000%20TO%20300000]';}
    if (!filterzero && filterone && filtertwo && filterthree && !filterfour) //100,000 to 400,000
    {filter_range_str = '&fq=playtime_at_review:[100000%20TO%20400000]';}
    if (!filterzero && filterone && filtertwo && filterthree && filterfour) //100,000 to 500,000
    {filter_range_str = '&fq=playtime_at_review:[100000%20TO%20500000]';}
    if (!filterzero && filterone && !filtertwo && filterthree && !filterfour) //100,000 to 200,000 or 300,000 to 400,000
    {filter_range_str = '&fq=playtime_at_review:([100000%20TO%20200000]%20OR%20[300000%20TO%20400000])';}
    if (!filterzero && filterone && !filtertwo && filterthree && filterfour) //100,000 to 200,000 or 300,000 to 500,000
    {filter_range_str = '&fq=playtime_at_review:([100000%20TO%20200000]%20OR%20[300000%20TO%20500000])';}
    if (!filterzero && filterone && !filtertwo && !filterthree && filterfour) //100,000 to 200,000 or 400,000 to 500,000
    {filter_range_str = '&fq=playtime_at_review:([100000%20TO%20200000]%20OR%20[400000%20TO%20500000])';}

    if (!filterzero && !filterone && filtertwo && !filterthree && !filterfour) //200,000 to 300,000
    {filter_range_str = '&fq=playtime_at_review:[200000%20TO%20300000]';}
    if (!filterzero && !filterone && filtertwo && filterthree && !filterfour) //200,000 to 400,000
    {filter_range_str = '&fq=playtime_at_review:[200000%20TO%20300000]';}
    if (!filterzero && !filterone && filtertwo && filterthree && filterfour) //200,000 to 500,000
    {filter_range_str = '&fq=playtime_at_review:[200000%20TO%20300000]';}
    if (!filterzero && !filterone && filtertwo && !filterthree && filterfour) //200,000 to 300,000 or 400,000 to 500,000
    {filter_range_str = '&fq=playtime_at_review:([200000%20TO%20300000]%20OR%20[400000%20TO%20500000])';}


    if (!filterzero && !filterone && !filtertwo && filterthree && !filterfour) //300,000 to 400,000
    {filter_range_str = '&fq=playtime_at_review:[300000%20TO%20400000]';}
    if (!filterzero && !filterone && !filtertwo && filterthree && filterfour) //300,000 to 500,000
    {filter_range_str = '&fq=playtime_at_review:[300000%20TO%20500000]';}

    if (!filterzero && !filterone && !filtertwo && !filterthree && filterfour) //400,000 to 500,000
    {filter_range_str = '&fq=playtime_at_review:[400000%20TO%20500000]';}


    // console.log(filter_range_str);
    try {
      let url = prevURL + filter_label_str +filter_range_str + end_url + rows;
      const res = await axios.get(url);
      const data = res.data;
        
      // console.log(data);
      setNumFound(data.response.numFound);
      setDisplayRows(rows);
      setQueryTime(data.responseHeader.QTime);
      setResult(data.response.docs);
    } catch {
      alert("Somthing went wrong. Please try again.");
    }
   
  }

  const processLabelFacetFields = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) {
      return null; // Return null if the input is not an array or is empty
    }

    let result = null;
  
    for (let i = 0; i < arr.length; i += 2) {
      const key = arr[i];
      const value = arr[i + 1];
      // console.log(key + ':' + value)
      if (result === null) {
        result = {};
      }
      result[key] = value;
    }
    setPositiveLabel(result['positive']);
    setNegativeLabel(result['negative']);
    setNeutralLabel(result['neutral']);
  }

  const processRangeFacetFields = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) {
      return null; // Return null if the input is not an array or is empty
    }

    let result = null;
  
    for (let i = 0; i < arr.length; i += 2) {
      const key = arr[i];
      const value = arr[i + 1];
      // console.log(key + ':' + value)
      if (result === null) {
        result = {};
      }
      result[key] = value;
    }
    setZeroRange(result['0']);
    setOneRange(result['100000']);
    setTwoRange(result['200000']);
    setThreeRange(result['300000']);
    setFourRange(result['400000']);

  }

  const SolrQuery = async () => {
    if (gamequery !== "") //if query is empty
    {
      setLoading(true);
      setShow(false);

      getQueryResult(); //query game
      
      navigate('/');
      // navigate(`/query?${gamequery}`);
    }
    else {
      alert("Please enter a game in the search bar.")
    }
  } 

  const getQueryResult = async () => {
    const url = base_url + '?q=game_name:'+ gamequery +'&fl=game_id,game_name&rows=1'
    try {
      const res = await axios.get(url);
      const data = res.data;
      setGameExist(data.response.docs.length);
      setQueryTime(data.responseHeader.QTime);
      // console.log(data.response.docs);
      setGameInfo(data.response.docs);
  
      
      if(gameExist !== 0) {
        let url = base_url + '?q=game_name:'+ gamequery;
        
        if(paramquery !== "") {
          url = url+ '%20AND%20document:' + paramquery;
        }
        setPrevURL(url);
        url = url + facet_url + end_url + rows;

        // console.log(url);  
        const res = await axios.get(url);
        const data = res.data;
        
        console.log(data);
        processRangeFacetFields(data.facet_counts.facet_ranges.playtime_at_review.counts);
        processLabelFacetFields(data.facet_counts.facet_fields.label);
        // console.log(data.response.docs);
        
        setNumFound(data.response.numFound);
        setDisplayRows(rows);
        setQueryTime(data.responseHeader.QTime);
        setResult(data.response.docs);
        
        setLoading(false);
        setShow(true);
        
      }
      else{
        setResult([]);
        setLoading(false);
        setShow(true);
      }
    } catch {
        setShow(false);
        alert("Something went wrong. Please try again later.");
    }
    
  }

  return (
    <div class=" bg-gradient-to-r from-[#00ADEE] to-black min-h-screen flex flex-col items-center overflow-x-hidden">
      {/* Web Title */}
      <div class="flex w-full justify-center items-center mt-5">
        <svg class="fill-current flex-shrink-0 mx-5" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><defs><linearGradient id="A" x2="116.626" x1="116.626" y2="60" y1="-173" gradientUnits="userSpaceOnUse"><stop stop-color="#111d2e" offset="0"/><stop stop-color="#051839" offset=".212"/><stop stop-color="#0a1b48" offset=".407"/><stop stop-color="#132e62" offset=".581"/><stop stop-color="#144b7e" offset=".738"/><stop stop-color="#136497" offset=".873"/><stop stop-color="#1387b8" offset="1"/></linearGradient></defs><path d="M4.89-23c14.393 48 58.916 83 111.6 83C180.84 60 233 7.84 233-56.5S180.84-173 116.5-173C54.76-173 4.24-124.97.25-64.24 7.8-51.58 10.732-43.75 4.892-23z" fill="url(#A)" transform="matrix(.274678 0 0 .274678 -.020737 47.519313)"/><path d="M30.33 23.985l.003.158-7.83 11.375c-1.268-.058-2.54.165-3.748.662-.532.217-1.03.483-1.498.79L.062 29.893c0 0-.398 6.546 1.26 11.424l12.156 5.016c.6 2.728 2.48 5.12 5.242 6.27a8.88 8.88 0 0 0 11.603-4.782c.49-1.18.717-2.42.684-3.656L42.21 36.16l.275.005c6.705 0 12.155-5.466 12.155-12.18a12.18 12.18 0 0 0-12.155-12.174c-6.702 0-12.155 5.46-12.155 12.174zm-1.88 23.05c-1.454 3.49-5.466 5.147-8.953 3.694-1.61-.67-2.823-1.898-3.524-3.362l3.957 1.64a5.04 5.04 0 0 0 6.591-2.719 5.05 5.05 0 0 0-2.715-6.601l-4.1-1.695c1.578-.6 3.372-.62 5.05.077 1.7.703 3 2.027 3.696 3.72s.692 3.56-.01 5.246M42.486 32.1c-4.464 0-8.098-3.64-8.098-8.113a8.12 8.12 0 0 1 8.098-8.111 8.12 8.12 0 0 1 8.1 8.111 8.12 8.12 0 0 1-8.1 8.113m-6.068-8.126c0-3.366 2.725-6.095 6.08-6.095s6.084 2.73 6.084 6.095a6.09 6.09 0 0 1-6.084 6.093 6.09 6.09 0 0 1-6.081-6.093z" fill="#fff"/></svg>
        <h1 class="text-4xl font-bold text-gray-100">Steam Review Searcher</h1>
      </div>

      {/* Top */}
      <div class="flex flex-col w-full items-center">
        {/* Search bar */}
        <form class="flex flex-col" autoComplete='off' onKeyDown={(e) => checkKeyDown(e)}>
          <div class="flex flex-row w-full justify-between items-center mt-10 z-20">
            <div class="w-56"></div>
            <div class="flex">
              <input id="game_query" type="text" placeholder="Search for your game" onChange={(e) => setGameQuery(e.target.value)}
                class="w-full md:w-80 text-lg px-3 h-10 rounded-l-full border-2 bg-transparent text-white font-semibold placeholder-white border-sky-500 focus:outline-none focus:" />
              
              <button onClick={() => SolrQuery()} type="button" class="bg-sky-500 hover:bg-sky-800 text-lg text-white rounded-r-full px-2 md:px-3 py-0 md:py-1">Search</button>
            </div>
            <div class="w-56 flex justify-end">
              <button type="button" id='toggleParam' class={"flex rounded-lg text-center items-center text-lg font-medium text-white cursor-pointer transistion-all duration-100 ease-in-out " + (showParam ? 'translate-y-[60px]':'translate-y-0')} onClick={()=>setShowParam(!showParam)}>
                Search more
                <svg id="down" class={"h-8 w-8 text-sky-300 " + (showParam ? 'hidden':'')}  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="18" y1="13" x2="12" y2="19" />  <line x1="6" y1="13" x2="12" y2="19" /></svg>
                <svg id="up"   class={"h-8 w-8 text-sky-300 " + (showParam ? '':'hidden')}  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="18" y1="11" x2="12" y2="5" />  <line x1="6" y1="11" x2="12" y2="5" /></svg>
              </button>
            </div>
          </div>
          {showParam ? 
          <div id="additional_param" class="flex flex-row mt-5 justify-center">
            <div class="flex items-center">
              <input id="game_query" type="text" placeholder="Search within review" onChange={(e) => setParamQuery(e.target.value)}
                    class="w-full md:w-70 px-3 h-10 mr-6 rounded-full border-2 bg-transparent text-lg text-white font-semibold placeholder-white border-sky-500 focus:outline-none focus:" />
              
              <div class="flex items-center text-lg">
                <p class="font-medium text-white pr-2">Display</p>
                <select id="row" onChange={(e) => setRows(e.target.value)} class="h-10 bg-transparent justify-center overflow-visible focus:outline-none focus:border-sky-500 text-white rounded-lg">
                  <option class="text-black" value="10">10</option>
                  <option class="text-black" value="20">20</option>
                  <option class="text-black" value="30">30</option>
                  <option class="text-black" value="40">40</option>
                </select>
                <p class="font-medium text-white pl-2">rows</p>
              </div>
              
            </div>
          </div>
          :<></>}
          
        </form>

        {/* Divider */}
        <h3 id="divider" class="flex items-center w-full max-w-4xl mt-4">
          <span class="flex-grow bg-gray-200 opacity-[.65] rounded h-1"></span>
        </h3>
      </div>
      {loading ? (<div class="text-white text-lg mt-5">Loading Results...</div>):<></>}
      {show ? ( <>

      <div id="content" class="flex flex-row justify-between w-full">
            
        <div id="left" class="z-10 w-56 mt-10 h-fit p-3 bg-white rounded-lg shadow dark:bg-gray-700 ">
          <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white border-b-2 border-gray-200 border-opacity-90">
            Filter
          </h6>
          <ul id="label-filter"class="space-y-2 text-sm mb-4" >
            <p>Label</p>
            <li class="flex items-center"> {/*onChange={() => setFilterPositive(!filterpositive)}*/}
              <input id="positive" type="checkbox" value="positive" onClick={() => toggleFilter()} defaultChecked={false}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="positive" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Positive ({positivelabel})
              </label>
            </li>

            <li class="flex items-center"> {/* onChange={() => setFilterNegative(!filternegative)} */}
              <input id="negative" type="checkbox" value="negative" onClick={() => toggleFilter()} defaultChecked={false}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="negative" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Negative ({negativelabel})
              </label>
            </li>

            <li class="flex items-center"> {/*onChange={() => setFilterNeutral(!filterneutral)} */}
              <input id="neutral" type="checkbox" value="neutral" onClick={() => toggleFilter()} defaultChecked={false}
                class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

              <label for="neutral" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Neutral ({neutrallabel})
              </label>
            </li>
          </ul>
          <ul class="space-y-2 text-sm">
            <span>{'Playtime (hours)'}</span>
            <li class="flex items-center">
                <input id="0to1" type="checkbox" value="0to1" onClick={() => toggleFilter()} defaultChecked={false}
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                <label for="0to1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  0 - 100,000 ({zeroRange})
                </label>
              </li>
            <li class="flex items-center">
                <input id="1to2" type="checkbox" value="1to2" onClick={() => toggleFilter()} defaultChecked={false}
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                <label for="1to2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  100,000 - 200,000 ({oneRange})
                </label>
              </li>
            <li class="flex items-center">
                <input id="2to3" type="checkbox" value="2to3" onClick={() => toggleFilter()} defaultChecked={false}
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                <label for="2to3" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  200,000 - 300,000 ({twoRange})
                </label>
              </li>
            <li class="flex items-center">
                <input id="3to4" type="checkbox" value="3to4" onClick={() => toggleFilter()} defaultChecked={false}
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                <label for="3to4" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  300,000 - 400,000 ({threeRange})
                </label>
              </li>
            <li class="flex items-center">
                <input id="4to5" type="checkbox" value="4to5" onClick={() => toggleFilter()} defaultChecked={false}
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                <label for="4to5" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  400,000 - 500,000 ({fourRange})
                </label>
              </li>
          </ul>
        </div>

        <div id="middle" class="flex flex-col">
          <div>
              {/* Game Info [Start] */}
              {gameInfo?.map((game) => { //Display queried game box art and title
                return (
                <div key={game.id} class="flex h-28 justify-center mt-10 items-center w-full rounded-md cursor-pointer transition hover:scale-110" onClick={()=>window.open('https://store.steampowered.com/app/'+ game.game_id +'_blank')}>

                  {/* Game Image */}
                  <img class="h-28 fill-current ml-4 mr-10" alt="box_art.jpg" src={'https://steamcdn-a.akamaihd.net/steam/apps/'+ game.game_id + '/library_600x900_2x.jpg'}/>

                  {/* Game Title */}
                  <h2 class="text-3xl text-gray-100 mr-4 font-semibold">{game.game_name}</h2>

                </div>
              )
              })}
              {/* Game Info [End] */}
            
            <div class="w-full text-center text-white font-medium mt-6">{numFound} results in {queryTime} milliseconds</div>
            <div class="w-full text-center text-white font-medium mt-2">{"( Showing "+ displayRows +" rows )"}</div>


          </div>

          {/* Game Reviews [Start]*/}
          <section class="h-auto flex flex-col flex-none antialiased text-gray-600 p-4 mb-5 overscroll-none overflow-y-auto">
            <div class="">
            {result?.map((docs) => {
              return (
              <div key={docs.id} class={docs.username === '' ? "hidden":" max-w-2xl min-h-56 mx-auto bg-gradient-to-r from-[#1e7a9b] to-[#323d54] shadow-lg rounded-lg mb-5"}>
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
                        {/* <a class="flex-shrink-0 flex items-center justify-center text-indigo-600 w-10 h-10 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2" href="#0">
                          <span class="block font-bold"><span class="sr-only">Read more</span></span>
                        </a> */}
                        <div class="flex-shrink-0 flex has-tooltip items-center justify-center w-10 h-10 ml-2">
                          <span class="tooltip rounded shadow-lg p-1 text-gray-100 bg-[#1e7a9b] ml-32 capitalize">{docs.label}</span>
                          
                          {docs.label === 'positive' ? 
                          <svg class="h-8 w-8 text-white fill-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                          :<></>}
                          {docs.label === 'negative' ?
                          <svg class="h-8 w-8 text-white fill-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" /></svg>
                          :<></>}
                          {docs.label === 'neutral' ?
                          <svg class="h-8 w-8 text-white fill-stone-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                          :<></>}
                        </div>  
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
        </div>
        <div id="right" class="w-56"></div>
      </div>
      
      </> 
      ) : (<></>)}
    
    <button id="scrollButton" class={"fixed bottom-6 right-6 rounded-full " + (showScroll ? '': 'hidden')} onClick={scrollToTop}>
      <svg class="h-10 w-10 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
    </button>
    </div>
  );
}

export default App;
