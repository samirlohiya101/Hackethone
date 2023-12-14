// // Import necessary libraries
// import Head from "next/head";
// import styles from "../styles/Home.module.css";
// import { useState, useEffect } from "react";
// import mapboxgl from "mapbox-gl";
// import * as turf from "@turf/turf";
// import Autosuggest from "react-autosuggest";

// export default function Home() {
//   const [Map, setMap] = useState();
//   const [pageIsMounted, setPageIsMounted] = useState(false);
//   const [fromValue, setFromValue] = useState("");
//   const [toValue, setToValue] = useState("");
//   const [fromSuggestions, setFromSuggestions] = useState([]);
//   const [toSuggestions, setToSuggestions] = useState([]);
//   const locations = [
//     {
//       name: "Chennai",
//       coordinates: [80.2785, 13.0878],
//     },
//     {
//       name: "New York",
//       coordinates: [-74.006, 40.7128],
//     },
//   ];

//   mapboxgl.accessToken =
//     "pk.eyJ1Ijoic3VyYWpzaW5naGJpc2h0IiwiYSI6ImNscTN1ajZmMDAwYWYyaWxvemJkeXh4bXcifQ.GVY_1nPPxmbhnCl_O_OnMg";

//   useEffect(() => {
//     setPageIsMounted(true);
//     const map = new mapboxgl.Map({
//       container: "map",
//       style: "mapbox://styles/mapbox/light-v10",
//       center: [80.2785, 13.0878], // New York coordinates
//       zoom: 4.5,
//     });

//     map.addControl(new mapboxgl.NavigationControl(), "top-right");
//     setMap(map);
//   }, []);

//   useEffect(() => {
//     if (pageIsMounted && Map) {
//       Map.on("load", () => {
//         // Call the function to add location markers
//         addLocationMarkers(locations);
//         // Call the function to add interconnected routes
//         addInterconnectedRoutes(locations);
//       });
//     }
//   }, [pageIsMounted, Map, locations]);

//   const getSuggestions = async (inputValue, type) => {
//     const inputLength = inputValue.trim().length;

//     // Simulated API endpoint
//     const apiUrl =
//       type === "source"
//         ? "https://jsonplaceholder.typicode.com/users"
//         : "https://jsonplaceholder.typicode.com/todos";
//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();

//       // Return all suggestions when input length is 0
//       if (inputLength === 0) {
//         return data.map((item) => ({ label: item.name, value: item.id }));
//       }

//       // Filter and return suggestions based on input value
//       return data
//         .filter((item) =>
//           item.name.toLowerCase().includes(inputValue.toLowerCase())
//         )
//         .map((item) => ({ label: item.name, value: item.id }));
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//       return [];
//     }
//   };

//   const renderSuggestion = (suggestion) => <div>{suggestion.label}</div>;

//   const onFromInputChange = (event, { newValue }) => {
//     setFromValue(newValue);
//   };

//   const onToInputChange = (event, { newValue }) => {
//     setToValue(newValue);
//   };

//   const onFromSuggestionsFetchRequested = ({ value }) => {
//     getSuggestions(value, "source").then((suggestions) => {
//       setFromSuggestions(suggestions);
//     });
//   };

//   const onToSuggestionsFetchRequested = ({ value }) => {
//     getSuggestions(value, "destination").then((suggestions) => {
//       setToSuggestions(suggestions);
//     });
//   };

//   const onFromSuggestionsClearRequested = () => {
//     setFromSuggestions([]);
//   };

//   const onToSuggestionsClearRequested = () => {
//     setToSuggestions([]);
//   };

//   const onFromSuggestionSelected = (event, { suggestion }) => {
//     setFromValue(suggestion.label);
//     // You can perform additional actions here, like updating the map based on the selected location
//   };

//   const onToSuggestionSelected = (event, { suggestion }) => {
//     setToValue(suggestion.label);
//     // You can perform additional actions here, like updating the map based on the selected location
//   };

//   // Add location markers
//   const addLocationMarkers = (locations) => {
//     locations.forEach((location) => {
//       const el = document.createElement("div");
//       el.className = "location-marker";

//       new mapboxgl.Marker(el, { offset: [0, -23] })
//         .setLngLat(location.coordinates)
//         .addTo(Map);

//       el.addEventListener("click", () => {
//         // Handle marker click if needed
//       });
//     });
//   };

//   // Add interconnected routes with curves
//   const addInterconnectedRoutes = (locations) => {
//     const bounds = new mapboxgl.LngLatBounds();

//     locations.forEach((location, i) => {
//       const el = document.createElement("div");
//       el.className = "location-marker";

//       new mapboxgl.Marker(el, { offset: [0, -23] })
//         .setLngLat(location.coordinates)
//         .addTo(Map);

//       if (i < locations.length - 1) {
//         const start = location.coordinates;
//         const end = locations[i + 1].coordinates;

//         // Use turf.lineIntersect to interpolate points along the air route
//         const airLine = turf.lineString([start, end]);
//         const curvedAirLine = turf.bezierSpline({
//           type: "LineString",
//           coordinates: [start, [start[0], end[1]], end],
//         });

//         if (curvedAirLine && curvedAirLine.geometry.coordinates.length > 1) {
//           Map.addSource(`air-route-${i}`, {
//             type: "geojson",
//             data: {
//               type: "Feature",
//               properties: {},
//               geometry: curvedAirLine.geometry,
//             },
//           });

//           Map.addLayer({
//             id: `air-route-${i}`,
//             type: "line",
//             source: `air-route-${i}`,
//             layout: { "line-join": "round", "line-cap": "round" },
//             paint: { "line-color": "green", "line-dasharray": [2, 2] },
//           });

//           bounds.extend(curvedAirLine.geometry.coordinates);
//         } else {
//           console.error(
//             `Error creating curved air line between locations ${i} and ${i + 1}`
//           );
//         }

//         // Simulate waterway route (modify this part based on actual data)
//         const waterwayCoordinates = [
//           [start[0], start[1] - 1], // Slightly below the air route
//           [end[0], end[1] - 1], // Slightly below the air route
//         ];

//         Map.addSource(`waterway-route-${i}`, {
//           type: "geojson",
//           data: {
//             type: "Feature",
//             properties: {},
//             geometry: {
//               type: "LineString",
//               coordinates: waterwayCoordinates,
//             },
//           },
//         });

//         Map.addLayer({
//           id: `waterway-route-${i}`,
//           type: "line",
//           source: `waterway-route-${i}`,
//           layout: { "line-join": "round", "line-cap": "round" },
//           paint: { "line-color": "blue", "line-dasharray": [2, 2] },
//         });

//         bounds.extend(waterwayCoordinates);
//       } else {
//         bounds.extend(location.coordinates);
//       }
//     });

//     Map.fitBounds(bounds, { padding: 50, maxZoom: 5 });
//   };

//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Mapbox Store Location</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//         <link
//           href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css"
//           rel="stylesheet"
//         />
//       </Head>
//       <main className={styles.main}>
//         <div className={styles.autoCard}>
//           {/* Autosuggest for "From" */}
//           <Autosuggest
//             suggestions={fromSuggestions}
//             onSuggestionsFetchRequested={onFromSuggestionsFetchRequested}
//             onSuggestionsClearRequested={onFromSuggestionsClearRequested}
//             getSuggestionValue={(suggestion) => suggestion.label}
//             renderSuggestion={renderSuggestion}
//             inputProps={{
//               placeholder: "From",
//               value: fromValue,
//               onChange: onFromInputChange,
//             }}
//             onSuggestionSelected={onFromSuggestionSelected}
//           />

//           {/* Autosuggest for "To" */}
//           <Autosuggest
//             suggestions={toSuggestions}
//             onSuggestionsFetchRequested={onToSuggestionsFetchRequested}
//             onSuggestionsClearRequested={onToSuggestionsClearRequested}
//             getSuggestionValue={(suggestion) => suggestion.label}
//             renderSuggestion={renderSuggestion}
//             inputProps={{
//               placeholder: "To",
//               value: toValue,
//               onChange: onToInputChange,
//             }}
//             onSuggestionSelected={onToSuggestionSelected}
//           />
//         </div>
//         <div id="map" className="map"></div>
//       </main>
//       <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js"></script>
//       <script src="https://unpkg.com/@turf/turf"></script>
//     </div>
//   );
// }
