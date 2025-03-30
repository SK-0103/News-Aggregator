import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Container, Form, Button, Pagination, Card } from 'react-bootstrap';
import NewsCard from '../components/news/NewsCard';
import Loader from '../components/layout/Loader';
import Message from '../components/layout/Message';
import { listNews, searchNews, getNewsByBias } from '../redux/actions/newsActions';
import { listSources } from '../redux/actions/sourceActions';

const NewsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  
  const [bias, setBias] = useState('CENTER');
  const [page, setPage] = useState(1);
  const [limit] = useState(20); // Increased from 12 to 20 articles per page

  const newsList = useSelector((state) => state.newsList);
  const { loading: loadingList, error: errorList, news, pages } = newsList;

  const newsByBias = useSelector((state) => state.newsByBias);
  const { loading: loadingBias, error: errorBias, news: biasNews, total: biasTotal } = newsByBias;

  const newsSearch = useSelector((state) => state.newsSearch);
  const { 
    loading: loadingSearch, 
    error: errorSearch, 
    news: searchResults 
  } = newsSearch;
  
  const sourceList = useSelector((state) => state.sourceList);
  const { sources } = sourceList;

  useEffect(() => {
    dispatch(listSources());
    dispatch(getNewsByBias(bias));
  }, [dispatch, bias]);

  const biases = [
    'LEFT',
    'CENTER',
    'RIGHT'
  ];

  const handleBiasChange = (e) => {
    setBias(e.target.value);
    setPage(1);
  };

  const handleResetFilters = () => {
    setBias('CENTER');
    setPage(1);
    dispatch(getNewsByBias('CENTER'));
  };

  // Articles to display based on current active filter/search
  const articlesToDisplay = searchQuery 
    ? searchResults 
    : biasNews;

  const totalPages = searchQuery 
    ? Math.ceil(searchResults.length / limit) 
    : Math.ceil(biasTotal / limit);

  return (
    <Container className="py-4">
      <Row>
        <Col md={3} className="mb-4">
          <Card className="mb-3">
            <Card.Body>
              <h5 className="mb-3">Political Bias</h5>
              
              <Form.Group>
                <Form.Label>Select Bias</Form.Label>
                <Form.Select value={bias} onChange={handleBiasChange}>
                  {biases.map((b) => (
                    <option key={b} value={b}>
                      {b.replace('-', ' ')}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="mt-3">
                <Button 
                  variant="outline-secondary" 
                  onClick={handleResetFilters}
                  disabled={bias === 'CENTER'}
                >
                  Reset to Center
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Active Filters Summary */}
          {bias !== 'CENTER' && (
            <Card className="mt-3">
              <Card.Body>
                <h5 className="mb-3">Active Filter</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <span className="text-primary">Bias:</span> {bias.replace('-', ' ')}
                  </li>
                </ul>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={9}>
          <h1 className="mb-4">News Articles</h1>
          
          {searchQuery && (
            <div className="mb-4">
              <h4>
                Search Results for: "{searchQuery}"
                <Button 
                  variant="link" 
                  className="ms-2"
                  onClick={() => window.location.href = '/news'}
                >
                  Clear Search
                </Button>
              </h4>
            </div>
          )}

          {loadingSearch || loadingList || loadingBias ? (
            <Loader />
          ) : errorSearch || errorList || errorBias ? (
            <Message variant="danger">{errorSearch || errorList || errorBias}</Message>
          ) : articlesToDisplay.length === 0 ? (
            <Message variant="info">No news articles found</Message>
          ) : (
            <>
              <Row>
                {articlesToDisplay.map((article) => (
                  <Col key={article._id} sm={12} md={6} lg={4} className="mb-4">
                    <NewsCard article={article} />
                  </Col>
                ))}
              </Row>
              
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination>
                    <Pagination.First 
                      disabled={page === 1} 
                      onClick={() => setPage(1)} 
                    />
                    <Pagination.Prev 
                      disabled={page === 1} 
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
                    />
                    
                    {[...Array(totalPages).keys()].map((x) => (
                      <Pagination.Item
                        key={x + 1}
                        active={x + 1 === page}
                        onClick={() => setPage(x + 1)}
                      >
                        {x + 1}
                      </Pagination.Item>
                    ))}
                    
                    <Pagination.Next
                      disabled={page === totalPages}
                      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    />
                    <Pagination.Last
                      disabled={page === totalPages}
                      onClick={() => setPage(totalPages)}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default NewsPage;
