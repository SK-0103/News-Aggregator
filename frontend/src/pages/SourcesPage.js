import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Badge, Form, InputGroup, Button, Pagination } from 'react-bootstrap';
import { FaSearch, FaGlobe } from 'react-icons/fa';
import Loader from '../components/layout/Loader';
import Message from '../components/layout/Message';
import { listSources, getSourcesByBias } from '../redux/actions/sourceActions';

const SourcesPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [biasFilter, setBiasFilter] = useState('all');
  const [filteredSources, setFilteredSources] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const sourceList = useSelector((state) => state.sourceList);
  const { loading, error, sources, pages } = sourceList;

  const sourceByBias = useSelector((state) => state.sourceByBias);
  const { 
    loading: loadingBias, 
    error: errorBias, 
    sources: biasFilteredSources 
  } = sourceByBias;

  useEffect(() => {
    if (biasFilter !== 'all') {
      dispatch(getSourcesByBias(biasFilter));
    } else {
      dispatch(listSources(page, limit));
    }
  }, [dispatch, biasFilter, page, limit]);

  useEffect(() => {
    // Apply search filter on sources from either regular list or bias filtered list
    const sourcesToFilter = biasFilter !== 'all' ? biasFilteredSources : sources;
    
    if (sourcesToFilter) {
      const filtered = searchTerm 
        ? sourcesToFilter.filter(source => 
            source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            source.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : sourcesToFilter;
      
      setFilteredSources(filtered);
      setTotalPages(biasFilter !== 'all' ? Math.ceil(filtered.length / limit) : pages);
    }
  }, [sources, biasFilteredSources, searchTerm, biasFilter, limit, pages]);

  const handleBiasChange = (e) => {
    setBiasFilter(e.target.value);
    setPage(1); // Reset to first page when changing filters
    setSearchTerm(''); // Clear search when changing bias filter
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is applied in the useEffect above
  };

  const resetFilters = () => {
    setBiasFilter('all');
    setSearchTerm('');
    setPage(1);
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

  const getBiasLabel = (bias) => {
    return bias === 'unknown' 
      ? 'Unknown Bias' 
      : bias.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">News Sources</h1>
      <p className="lead mb-4">
        Browse our collection of news sources from across the political spectrum. 
        Each source is rated for political bias and reliability.
      </p>
      
      <Row className="mb-4">
        <Col md={4} className="mb-3 mb-md-0">
          <Form.Group>
            <Form.Label>Filter by Political Bias</Form.Label>
            <Form.Select value={biasFilter} onChange={handleBiasChange}>
              <option value="all">All Biases</option>
              <option value="left">Left</option>
              <option value="center-left">Center Left</option>
              <option value="center">Center</option>
              <option value="center-right">Center Right</option>
              <option value="right">Right</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={8}>
          <Form.Label>Search Sources</Form.Label>
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" type="submit">
                <FaSearch />
              </Button>
              {(searchTerm || biasFilter !== 'all') && (
                <Button 
                  variant="outline-secondary" 
                  onClick={resetFilters}
                >
                  Clear
                </Button>
              )}
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {loading || loadingBias ? (
        <Loader />
      ) : error || errorBias ? (
        <Message variant="danger">{error || errorBias}</Message>
      ) : filteredSources.length === 0 ? (
        <Message variant="info">No sources found matching your criteria</Message>
      ) : (
        <>
          <Row>
            {filteredSources
              .slice((page - 1) * limit, page * limit)
              .map((source) => (
                <Col key={source._id} md={4} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h4>{source.name}</h4>
                        {source.logoUrl && (
                          <img 
                            src={source.logoUrl} 
                            alt={source.name} 
                            className="source-logo"
                            style={{ maxWidth: '60px', maxHeight: '30px' }}
                          />
                        )}
                      </div>
                      <Badge 
                        className={`mb-3 ${getBiasClass(source.politicalBias)}`}
                        pill
                      >
                        {getBiasLabel(source.politicalBias)}
                      </Badge>
                      <p className="text-muted small">{source.description}</p>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>Reliability:</strong> {source.reliability}/10
                          </div>
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FaGlobe className="me-1" /> Visit Site
                          </a>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
          
          {/* Pagination */}
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
    </Container>
  );
};

export default SourcesPage;
