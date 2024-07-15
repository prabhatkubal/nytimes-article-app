import React, { useState, useEffect } from "react";
import axios from "../../api/config";
import "./ArticleList.css";
import CommonLoader from "../Common/CommonLoader";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [period, setPeriod] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/${period}.json`); // Fetch most viewed articles in the last 7 days
        setArticles(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [period]);

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <div className="article-list">
      <h1>NY Times Most Popular Articles</h1>
      <div className="period-buttons">
        <button
          className={`period-button ${period === 1 ? "active" : ""}`}
          onClick={() => handlePeriodChange(1)}
        >
          1 Day
        </button>
        <button
          className={`period-button ${period === 7 ? "active" : ""}`}
          onClick={() => handlePeriodChange(7)}
        >
          7 Days
        </button>
        <button
          className={`period-button ${period === 30 ? "active" : ""}`}
          onClick={() => handlePeriodChange(30)}
        >
          30 Days
        </button>
      </div>
      {loading ? (
        <CommonLoader />
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id} className="article-item">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="article-title"
              >
                {article.title}
              </a>
              <p className="article-abstract">{article.abstract}</p>
              <p className="article-metadata">
                Published: {article.published_date}
              </p>
              {article.media && article.media.length > 0 && (
                <div className="article-image-container">
                  <img
                    src={article.media[0]["media-metadata"][2].url}
                    alt={article.title}
                    className="article-image"
                  />
                </div>
              )}
              <hr className="divider" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticleList;
