import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import Listing from "../pages/Listing";

function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://us.123rf.com/450wm/charmphoto/charmphoto1908/charmphoto190800043/128386026-new-built-house-on-green-meadow-under-blue-sky.jpg?ver=6"
          }
          alt="image of the property"
          className="h-[320] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2">
          <div className=" flex flex-col gap-2 w-full">
            <p className="text-lg font-semibold text-slate-700 truncate">
              {listing.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationOn className="h-4 w-4 text-green-700 " />
            <p className="text-sm text-gray-600 truncate w-full">
              <a
                href={"https://www.google.com/maps/place/?q=" + listing.address}
                target="_blank"
                rel="noopener noreferrer"
              >
                {listing.address}
              </a>
            
            </p>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-3 ">
            {listing.description}
          </p>
          <p className="text-slate-500 font-semibold ">
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
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms`
                : `${listing.bathrooms} bathroom`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItem;
