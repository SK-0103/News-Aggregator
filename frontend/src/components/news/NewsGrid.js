import React from 'react';
import { Row, Col } from 'react-bootstrap';
import NewsCard from './NewsCard';
import Message from '../layout/Message';

const NewsGrid = ({ articles, columns = 3 }) => {
  if (!articles || articles.length === 0) {
    return <Message variant="info">No news articles found</Message>;
  }

  // Calculate column size based on the number of columns
  const colSize = 12 / columns;

  return (
    <Row>
      {articles.map((article) => (
        <Col 
          key={article._id} 
          sm={12} 
          md={columns > 2 ? 6 : 12} 
          lg={colSize} 
          className="mb-4"
        >
          <NewsCard article={article} />
        </Col>
      ))}
    </Row>
  );
};

export default NewsGrid;
