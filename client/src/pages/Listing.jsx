import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import Contact from "../components/Contact";

function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && <p className="text-center my-7 text-2xl">Error loading..</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url})center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center m-5 bg-slate-100 ">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[25%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          {/* -----------------Info Container ----------------------------- */}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4 ">
           {/* -----------------> Titulo  <-----------*/}
            <p className=" text-2xl font-semibold">{listing.name}</p>
            {/* -----------------> Preço  <-----------*/}
            <p className=" text-slate-600  text-2xl font-semibold">
              {listing.offer
                ? new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                    minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                  }).format(listing.discountPrice)
                : new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(listing.regularPrice)}
              {listing.type === "rent" && " /month"}{" "}
            </p>
             {/* -----------------> Morada  <-----------*/}
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm hover:underline">
              <FaMapMarkerAlt className="text-green-700" />
              <a
                href={"https://www.google.com/maps/place/?q=" + listing.address}
                target="_blank"
                rel="noopener noreferrer"
              >
                {listing.address}
              </a>
            </p>
            <div className="flex gap-4">
              <p className="bg-red-700 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-700 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {listing.offer
                    ? new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(listing.discountPrice)
                    : new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(listing.regularPrice)}{" "}
                  OFF{" "}
                </p>
              )}
            </div>
            <p className="text-slate-800 py-5">
              <span className="font-semibold text-slate-500  ">
                Description:{" "}
              </span>
              {listing.description}
            </p>
            <ul className="text-green-700 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap font-semibold text-sm">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap font-semibold text-sm">
                <FaBath className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} baths`
                  : `${listing.bedrooms} bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap font-semibold text-sm">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap font-semibold text-sm">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Not Furnished"}
              </li>
            </ul>
            {currentUser && !contact && listing.userRef !== currentUser._id && (
              <button
                onClick={() => setContact(true)}
                className="bg-neutral-800 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
export default Listing;
