import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  console.log("saleListings:", saleListings);
  console.log("offerListings:", offerListings);
  console.log("rentListings:", rentListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="">
      {/* Top */}
      <div className=" flex flex-col gap-6 p-7 px-3 max-w-6xl mx-auto">
        <h1 className="text-neutral-800 font-bold text-3xl lg:text-6xl">
          Find your next <span className="font-bold bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">perfect</span>
          <br />
          place with ease
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm ">
          A plugin that provides utilities for visually truncating text after
          <br />a fixed number of lines.
        </p>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm hover:text-neutral-600 font-bold text-yellow-500"
        >
          {" "}
          Let´s get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {saleListings &&
          saleListings.length > 0 &&
          saleListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="flex flex-wrap justify-center">
      {/* listing results for offer sale and rent*/}

      {/* -------------Listing results for Offer-------------------- */}

      <div className="max-w-6xl w-auto p-3 flex flex-col gap-8 my-10 ">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className=" ">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-xs sm:text-sm hover:text-neutral-600 font-bold text-yellow-500"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* -------------Listing results for Sale-------------------- */}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-xs sm:text-sm hover:text-neutral-600  text-yellow-500 font-bold "
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4  w-auto">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {/* -------------isting results for Rent-------------------- */}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-xs sm:text-sm  hover:text-neutral-600 font-bold text-yellow-500"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 w-auto">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
