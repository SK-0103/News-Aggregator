import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Badge, Tabs, Tab, Button } from 'react-bootstrap';
import { FaArrowLeft, FaClock, FaNewspaper, FaExternalLinkAlt } from 'react-icons/fa';
import Loader from '../components/layout/Loader';
import Message from '../components/layout/Message';
import { getNewsDetails } from '../redux/actions/newsActions';
import { getSourcesByBias } from '../redux/actions/sourceActions';

const NewsComparisonPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [relatedArticles, setRelatedArticles] = useState([]);

  const newsDetails = useSelector((state) => state.newsDetails);
  const { loading, error, news } = newsDetails;

  const sourceByBias = useSelector((state) => state.sourceByBias);
  const { sources } = sourceByBias;

  useEffect(() => {
    dispatch(getNewsDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (news && news.source) {
      // Get sources with similar and opposite bias for comparison
      dispatch(getSourcesByBias(news.politicalBias));

      // In a real app, you would fetch actual related articles here
      // For this example, we'll simulate related articles
      setRelatedArticles([
        {
          _id: 'related1',
          title: 'Related perspective from another source',
          description: 'This is a different perspective on the same story from a source with similar political bias.',
          source: {
            name: 'Similar Bias Source',
            politicalBias: news.politicalBias,
          },
          publishedAt: new Date().toISOString(),
          url: '#',
        },
        {
          _id: 'related2',
          title: 'Alternative view on this story',
          description: 'This is an alternative perspective on the same story from a source with a different political bias.',
          source: {
            name: 'Different Bias Source',
            politicalBias: news.politicalBias === 'left' ? 'right' : 
                           news.politicalBias === 'right' ? 'left' : 
                           news.politicalBias === 'center-left' ? 'center-right' : 
                           news.politicalBias === 'center-right' ? 'center-left' : 'center',
          },
          publishedAt: new Date().toISOString(),
          url: '#',
        },
      ]);
    }
  }, [dispatch, news]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getBiasClass = (bias) => {
    switch (bias) {
      case 'left':
        return 'bias-left';
      case 'center-left':
        return 'bias-center-left';
      case 'center':
        return 'bias-center';
      case 'center-right':
        return 'bias-center-right';
      case 'right':
        return 'bias-right';
      default:
        return 'bias-unknown';
    }
  };

  return (
    <Container className="py-4">
      <Button 
        as={Link} 
        to="/news" 
        variant="outline-primary" 
        className="mb-4"
      >
        <FaArrowLeft className="me-2" /> Back to News
      </Button>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : news ? (
        <>
          <Row className="mb-4">
            <Col>
              <h1 className="mb-3">{news.title}</h1>
              <div className="d-flex flex-wrap align-items-center mb-3">
                <Badge 
                  className={`me-3 ${getBiasClass(news.politicalBias)}`}
                  pill
                >
                  {news.politicalBias === 'unknown' ? 'Unknown Bias' : news.politicalBias.replace('-', ' ')}
                </Badge>
                <div className="me-3 d-flex align-items-center">
                  <FaNewspaper className="me-1" />
                  <span>{news.source ? news.source.name : 'Unknown Source'}</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaClock className="me-1" />
                  <small>{news.publishedAt ? formatDate(news.publishedAt) : 'Unknown Date'}</small>
                </div>
              </div>
              {news.urlToImage && (
                <img 
                  src={news.urlToImage} 
                  alt={news.title} 
                  className="img-fluid rounded mb-4" 
                  style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                />
              )}
            </Col>
          </Row>

          <Row className="mb-5">
            <Col>
              <Tabs defaultActiveKey="article" id="news-tabs" className="mb-4">
                <Tab eventKey="article" title="Article">
                  <Card.Body>
                    <div className="mb-4">
                      <h5>Description</h5>
                      <p>{news.description}</p>
                    </div>
                    <div className="mb-4">
                      <h5>Full Content</h5>
                      <p>{news.content}</p>
                    </div>
                    {news.author && (
                      <div className="mb-4">
                        <h5>Author</h5>
                        <p>{news.author}</p>
                      </div>
                    )}
                    <div className="text-center mt-4">
                      <a 
                        href={news.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        <FaExternalLinkAlt className="me-2" /> Read Original Article
                      </a>
                    </div>
                  </Card.Body>
                </Tab>
                <Tab eventKey="source" title="About the Source">
                  {news.source && (
                    <Card.Body>
                      <h4>{news.source.name}</h4>
                      <Badge 
                        className={`mb-3 ${getBiasClass(news.source.politicalBias)}`}
                        pill
                      >
                        {news.source.politicalBias === 'unknown' ? 'Unknown Bias' : news.source.politicalBias.replace('-', ' ')}
                      </Badge>
                      <p>{news.source.description}</p>
                      <div>
                        <strong>Reliability Score:</strong> {news.source.reliability}/10
                      </div>
                      <div className="mt-3">
                        <a 
                          href={news.source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary"
                        >
                          <FaExternalLinkAlt className="me-2" /> Visit Source Website
                        </a>
                      </div>
                    </Card.Body>
                  )}
                </Tab>
              </Tabs>
            </Col>
          </Row>

          <h3 className="mb-4">Compare Perspectives</h3>
          <Row>
            {relatedArticles.map((article) => (
              <Col key={article._id} md={6} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Badge 
                        className={getBiasClass(article.source.politicalBias)}
                        pill
                      >
                        {article.source.politicalBias === 'unknown' ? 'Unknown Bias' : article.source.politicalBias.replace('-', ' ')}
                      </Badge>
                      <small className="text-muted">{formatDate(article.publishedAt)}</small>
                    </div>
                    <Card.Title as="h5">{article.title}</Card.Title>
                    <Card.Text>{article.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="text-muted">{article.source.name}</span>
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                      >
                        Read More
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="mt-5">
            <h3 className="mb-4">Sources with Similar Coverage</h3>
            <Row>
              {sources && sources.slice(0, 4).map((source) => (
                <Col key={source._id} md={3} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <h5>{source.name}</h5>
                      <Badge 
                        className={`mb-2 ${getBiasClass(source.politicalBias)}`}
                        pill
                      >
                        {source.politicalBias === 'unknown' ? 'Unknown Bias' : source.politicalBias.replace('-', ' ')}
                      </Badge>
                      <p className="text-muted small">{source.description.substring(0, 100)}...</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </>
      ) : (
        <Message variant="info">No article found</Message>
      )}
    </Container>
  );
};

export default NewsComparisonPage;
