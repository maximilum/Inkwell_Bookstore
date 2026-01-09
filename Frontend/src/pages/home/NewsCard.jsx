import React from "react";
import image from "/news/news-1.png";
import getImgURL from "../../utils/ImgURLcreator";

const NewsCard = ({ newsItem }) => {
  console.log(newsItem);

  return (
    <div className=" flex items-center justify-center ">
      {/* left text side */}
      <div>
        <h2 className="mb-3 text-[16px] text-secondary">
          {newsItem.title.length > 30
            ? `${newsItem.title.slice(0, 30)}...`
            : newsItem.title}
        </h2>
        <div className="h-[1.5px] w-10 bg-primary mb-6 rounded-sm"></div>
        <p className="max-w-md text-xs text-secondary">
          {newsItem.description.length > 140
            ? `${newsItem.description.slice(0, 140)}...`
            : newsItem.description}
        </p>
      </div>
      {/* right side image */}
      <div className=" ml-12">
        <img
          src={getImgURL("news", `${newsItem.coverImage}.png`)}
          alt=""
          className=""
        />
      </div>
    </div>
  );
};

export default NewsCard;
