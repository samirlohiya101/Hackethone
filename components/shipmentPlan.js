// src/components/CardFilter.js
import React, { useEffect, useState } from "react";
import Image from "next/image";
const Shipment = () => {
  // Placeholder data for filters
  const filters = ["Fastest", "Cheapest", "Greenest "];
  const cards = ["card1", "card2", "card3"];
  const [isActive, setIsActive] = useState();
  useEffect(() => {}, [isActive]);
  return (
    <div className="flex flex-col items-start m-4">
      <div className="flex mb-4">
        {filters.map((filter, index) => (
          <div
            key={index}
            className="bg-gray-200 px-4 py-2 mr-2 cursor-pointer"
          >
            {filter}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap flex-col w-full">
        {/* Replace this with your card component */}
        {/* <div className="w-[45%] h-36 border border-gray-300 m-2 flex justify-center items-center mt-10">
          Plan1
        </div>
        <div className="w-[45%] h-36 border border-gray-300  m-2 flex justify-center items-center">
          Plan 2
        </div>
        <div className="w-[45%] h-36 border border-gray-300 m-2 flex justify-center items-center">
          Plan 3
        </div> */}
        {cards.map((card, index) => (
          <div
            key={index}
            className={`w-[45%] h-36 border rounded-md m-2 flex flex-col p-3  mt-10 gap-3 ${
              isActive === index
                ? "border-green-600 border-4"
                : "border-gray-300"
            }`}
            onClick={() => setIsActive(index)}
          >
            <div className="flex items-start gap-3">
              <button className="bg-[#d00cf7] rounded-md h-8 w-20">
                Fastest
              </button>
              <button className="bg-[#f7c10c] rounded-md h-8 w-20">
                Robust
              </button>
            </div>
            <div className="flex gap2">
              <p>
                Sea | Delivery on{" "}
                <span className="font-semibold">14-feb-2024</span> | Est.{" "}
                <span className="font-semibold">45-56 days</span>
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <b>Mundra</b> ---
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="18"
                viewBox="0 0 576 512"
              >
                <path d="M192 32c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32V64h48c26.5 0 48 21.5 48 48V240l44.4 14.8c23.1 7.7 29.5 37.5 11.5 53.9l-101 92.6c-16.2 9.4-34.7 15.1-50.9 15.1c-19.6 0-40.8-7.7-59.2-20.3c-22.1-15.5-51.6-15.5-73.7 0c-17.1 11.8-38 20.3-59.2 20.3c-16.2 0-34.7-5.7-50.9-15.1l-101-92.6c-18-16.5-11.6-46.2 11.5-53.9L96 240V112c0-26.5 21.5-48 48-48h48V32zM160 218.7l107.8-35.9c13.1-4.4 27.3-4.4 40.5 0L416 218.7V128H160v90.7zM306.5 421.9C329 437.4 356.5 448 384 448c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 501.7 417 512 384 512c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 437.2 165.1 448 192 448c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z" />
              </svg>
              ---
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              New York Port ---
              <Image
                src="/images/blimp.png"
                alt="Blimp"
                width={30}
                height={30}
              />
              ---
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              Amazon Fulfillment Warehouse,Texas
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shipment;
