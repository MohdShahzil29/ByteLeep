import React from "react";
import { Helmet } from "react-helmet";

const SeoLayout = ({ title, description, keywords }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Helmet>
    </div>
  );
};

SeoLayout.defaultProps = {
    title: "Byte Leep",
    description: "Byte Leep - A Eduction Platform",
    keywords: "Education,Web development, Web Broswer IDE",
  };
  

export default SeoLayout;
