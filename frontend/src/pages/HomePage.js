import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NewsCard from '../components/news/NewsCard';
import Loader from '../components/layout/Loader';
import Message from '../components/layout/Message';
import { listNews } from '../redux/actions/newsActions';
import { FaNewspaper, FaBalanceScale, FaGlobe } from 'react-icons/fa';

const HomePage = () => {
  const dispatch = useDispatch();
  const newsList = useSelector((state) => state.newsList);
  const { loading, error, news } = newsList;

  useEffect(() => {
    dispatch(listNews(1, 6)); // Load 6 latest news articles
  }, [dispatch]);

  return (
    <>
      <div className="py-5 bg-light rounded-3 mb-4">
        <Container>
          <h1 className="display-5 fw-bold mb-4">See All Sides of the Story</h1>
          <p className="fs-4 mb-4">
            Compare how news stories are reported differently across the political spectrum and from various sources.
            Get the full picture, not just one perspective.
          </p>
          <Button as={Link} to="/news" variant="primary" size="lg">
            Browse All News
          </Button>
        </Container>
      </div>

      <Container>
        <h2 className="text-center mb-5">How Our News Aggregation Works</h2>
        <Row className="justify-content-center mb-5">
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm text-center p-3">
              <div className="text-primary mb-3">
                <FaNewspaper size={50} />
              </div>
              <h4>Aggregated Coverage</h4>
              <p>
                We collect news stories from hundreds of sources across the political spectrum
                in real-time.
              </p>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm text-center p-3">
              <div className="text-primary mb-3">
                <FaBalanceScale size={50} />
              </div>
              <h4>Political Bias Rating</h4>
              <p>
                Each news source is rated for political bias, enabling you to see different 
                perspectives on the same story.
              </p>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm text-center p-3">
              <div className="text-primary mb-3">
                <FaGlobe size={50} />
              </div>
              <h4>Global Coverage</h4>
              <p>
                Get news from multiple countries and languages, all translated and categorized 
                for easy comparison.
              </p>
            </Card>
          </Col>
        </Row>

        <h2 className="mb-4">Latest News</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              {news.map((article) => (
                <Col key={article.url} sm={12} md={6} lg={4} className="mb-4">
                  <NewsCard article={article} />
                </Col>
              ))}
            </Row>
            <div className="text-center mt-4">
              <Button as={Link} to="/news" variant="outline-primary">
                View All News
              </Button>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default HomePage;
