import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';

const NewsCard = ({ article }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getBiasClass = (bias) => {
    switch (bias) {
      case 'LEFT':
        return 'bias-left';
      case 'CENTER':
        return 'bias-center';
      case 'RIGHT':
        return 'bias-right';
      default:
        return 'bias-unknown';
    }
  };

  // Helper function to format bias text
  const formatBiasText = (bias) => {
    if (!bias) return 'Unknown Bias';
    const biasText = bias.toUpperCase();
    return biasText === 'UNKNOWN' ? 'Unknown Bias' : biasText.replace('-', ' ');
  };

  // Helper function to safely get article text
  const getArticleText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <Card className="news-card h-100 shadow-sm">
      {article?.urlToImage && (
        <div className="overflow-hidden">
          <Card.Img 
            variant="top" 
            src={article.urlToImage} 
            alt={article.title}
            className="news-card-img" 
          />
        </div>
      )}
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Badge 
            className={getBiasClass(article?.source?.bias)}
            pill
          >
            {formatBiasText(article?.source?.bias)}
          </Badge>
          <small className="text-muted d-flex align-items-center">
            <FaClock className="me-1" size={12} />
            {article?.publishedAt ? formatDate(article.publishedAt) : 'Unknown Date'}
          </small>
        </div>
        <Card.Title as="h5" className="mb-2">
          {article?.title || 'No Title Available'}
        </Card.Title>
        <Card.Text className="text-muted mb-3">
          {getArticleText(article?.description)}
        </Card.Text>
        <div className="mt-auto">
          <div className="d-flex align-items-center mb-2">
            <small className="text-muted">
              {article?.source?.name || 'Unknown Source'}
            </small>
          </div>
          {article?.url && (
            <Link 
              to={`/news/${article.url}`} 
              className="btn btn-outline-primary btn-sm w-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </Link>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;
