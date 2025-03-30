import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Container, Form, Button, Pagination, Card } from 'react-bootstrap';
import NewsCard from '../components/news/NewsCard';
import Loader from '../components/layout/Loader';
import Message from '../components/layout/Message';
import { listNews, searchNews, getNewsByCategory, getNewsByBias } from '../redux/actions/newsActions';
import { listSources } from '../redux/actions/sourceActions';

const NewsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  
  const [category, setCategory] = useState('all');
  const [bias, setBias] = useState('all');
  const [source, setSource] = useState('all');
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const newsList = useSelector((state) => state.newsList);
  const { loading, error, news, pages } = newsList;

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
  }, [dispatch]);

  const applyFilters = () => {
    if (searchQuery) {
      dispatch(searchNews(searchQuery));
    } else if (category !== 'all') {
      dispatch(getNewsByCategory(category));
    } else if (bias !== 'all') {
      dispatch(getNewsByBias(bias));
    } else {
      dispatch(listNews(page, limit));
    }
  };

  const categories = [
    'all',
    'general', 
    'business', 
    'entertainment', 
    'health', 
    'science', 
    'sports', 
    'technology'
  ];

  const biases = [
    'all',
    'LEFT',
    'CENTER',
    'RIGHT'
  ];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setBias('all');
    setSource('all');
    setPage(1);
    applyFilters();
  };

  const handleBiasChange = (e) => {
    setBias(e.target.value);
    setCategory('all');
    setSource('all');
    setPage(1);
    applyFilters();
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);
    setCategory('all');
    setBias('all');
    setPage(1);
    applyFilters();
  };

  const handleResetFilters = () => {
    setCategory('all');
    setBias('all');
    setSource('all');
    setPage(1);
    dispatch(listNews(page, limit));
  };

  // Articles to display based on current active filter/search
  const articlesToDisplay = searchQuery 
    ? searchResults 
    : news;

  return (
    <Container className="py-4">
      <Row>
        <Col md={3} className="mb-4">
          <Card className="mb-3">
            <Card.Body>
              <h5 className="mb-3">Filters</h5>
              
              {/* Category Filter */}
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select value={category} onChange={handleCategoryChange}>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Bias Filter */}
              <Form.Group className="mb-3">
                <Form.Label>Political Bias</Form.Label>
                <Form.Select value={bias} onChange={handleBiasChange}>
                  {biases.map((b) => (
                    <option key={b} value={b}>
                      {b === 'all' ? 'All Biases' : b.replace('-', ' ')}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Source Filter */}
              <Form.Group>
                <Form.Label>News Source</Form.Label>
                <Form.Select value={source} onChange={handleSourceChange}>
                  <option value="all">All Sources</option>
                  {sources?.map((source) => (
                    <option key={source.id} value={source.id}>
                      {source.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="mt-3">
                <Button 
                  variant="outline-secondary" 
                  onClick={handleResetFilters}
                  disabled={category === 'all' && bias === 'all' && source === 'all'}
                >
                  Reset Filters
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Active Filters Summary */}
          {(category !== 'all' || bias !== 'all' || source !== 'all') && (
            <Card className="mt-3">
              <Card.Body>
                <h5 className="mb-3">Active Filters</h5>
                <ul className="list-unstyled">
                  {category !== 'all' && (
                    <li className="mb-2">
                      <span className="text-primary">Category:</span> {category.charAt(0).toUpperCase() + category.slice(1)}
                    </li>
                  )}
                  {bias !== 'all' && (
                    <li className="mb-2">
                      <span className="text-primary">Bias:</span> {bias.replace('-', ' ')}
                    </li>
                  )}
                  {source !== 'all' && (
                    <li className="mb-2">
                      <span className="text-primary">Source:</span> {sources?.find(s => s.id === source)?.name || source}
                    </li>
                  )}
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

          {loadingSearch || loading ? (
            <Loader />
          ) : errorSearch || error ? (
            <Message variant="danger">{errorSearch || error}</Message>
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
              
              {!searchQuery && pages > 1 && (
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
                    
                    {[...Array(pages).keys()].map((x) => (
                      <Pagination.Item
                        key={x + 1}
                        active={x + 1 === page}
                        onClick={() => setPage(x + 1)}
                      >
                        {x + 1}
                      </Pagination.Item>
                    ))}
                    
                    <Pagination.Next
                      disabled={page === pages}
                      onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
                    />
                    <Pagination.Last
                      disabled={page === pages}
                      onClick={() => setPage(pages)}
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
