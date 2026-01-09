import React from "react";
import image from "/news/news-1.png";
import getImgURL from "../../utils/ImgURLcreator";
import { Link } from "react-router-dom";
const NewsCard = ({ newsItem }) => {
  console.log(newsItem);

  return (
    <div className=" flex items-center justify-center mx-16 hover:scale-102 transition-transform duration-300 ease ">
      {/* left text side */}
      <div>
        <Link to="./">
          <h2 className="mb-3 text-[20px] text-secondary hover:text-blue-800">
            {newsItem.title.length > 200
              ? `${newsItem.title.slice(0, 30)}...`
              : newsItem.title}
          </h2>
        </Link>
        <div className="h-[1.5px] w-10 bg-primary mb-6 rounded-sm"></div>
        <p className="max-w-md text-xs text-secondary">
          {newsItem.description.length > 140
            ? `${newsItem.description.slice(0, 140)}...`
            : newsItem.description}
        </p>
      </div>
      {/* right side image */}
      <div className=" ml-4 pr-6">
        <Link to="./">
          <img
            src={getImgURL("news", `${newsItem.coverImage}.png`)}
            alt=""
            className=""
          />
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
