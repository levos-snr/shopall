import React from "react";

const FashionArticles = () => {
  const articles = [
    {
      title: "Clothes Retail KPIs 2021 Guide for Clothes Executives.",
      category: "Fashion",
      author: "Mr Admin",
      date: "June 18, 2024",
      image: "https://media.licdn.com/dms/image/v2/D4D12AQGPCed4zlkFCA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1678631732312?e=1729123200&v=beta&t=1WfTGAfPPUR64EqFDEnPceqTVZ0tktQFHmwbgjxMhMI",
    },
    {
      title: "EBT Vendor: Claim Your Share of SNAP Online Revenue.",
      category: "Shoes",
      author: "Mr John",
      date: "June 18, 2024",
      image: "https://static01.nyt.com/images/2021/03/30/multimedia/28xp-shoes-09/28xp-shoes-09-superJumbo.jpg?quality=75&auto=webp",
    },
    {
      title: "Curbside Fashion Trends: How to Win the Pickup Battle.",
      category: "Electronics",
      author: "Mr Pawar",
      date: "June 18, 2024",
      image: "https://scontent.fnbo9-1.fna.fbcdn.net/v/t39.30808-6/310442032_427305346185641_6403058296917815630_n.png?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeEDCQwCasBorYmRMaYyjbLvxknAGEQ1xrLGScAYRDXGsvlQqp_HCQjpmGrjLrd4gqprG3l05G1J_njnPI708bhl&_nc_ohc=Q9X0W24K1qEQ7kNvgE_jelM&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fnbo9-1.fna&oh=00_AYBbiMYwR1a9mi-67FUC1rWuf4Bm3cBH2kNTSKvUs-25JQ&oe=66C1A394",
    },
    {
      title: "Curbside Fashion Trends: How to Win the Pickup Battle.",
      category: "Clothes",
      author: "Mr Wick",
      date: "June 18, 2024",
      image: "https://www.cato.org/sites/cato.org/files/styles/hero_impact_desktop/public/2023-11/fast-fashion2.jpeg?itok=9XNZrGt7",
    },
  ];

  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-sm text-pink-500 mb-2">{article.category}</h3>
              <h4 className="text-lg font-semibold text-gray-800">{article.title}</h4>
              <p className="text-xs text-gray-500 mt-2">
                By {article.author} / {article.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FashionArticles;
