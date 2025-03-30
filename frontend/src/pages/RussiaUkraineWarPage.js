import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Button, Card, Pagination } from 'react-bootstrap';
import NewsCard from '../components/news/NewsCard';
import Loader from '../components/layout/Loader';
import Message from '../components/layout/Message';
import { searchNews } from '../redux/actions/newsActions';

const RussiaUkraineWarPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const newsSearch = useSelector((state) => state.newsSearch);
  const { 
    loading: loadingSearch, 
    error: errorSearch, 
    news: searchResults,
    totalResults
  } = newsSearch;

  useEffect(() => {
    dispatch(searchNews('russia ukraine war'));
  }, [dispatch]);

  const totalPages = Math.ceil((totalResults || searchResults?.length || 0) / limit);

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="mb-4">Russia-Ukraine War News</h1>
          
          {loadingSearch ? (
            <Loader />
          ) : errorSearch ? (
            <Message variant="danger">{errorSearch}</Message>
          ) : searchResults.length === 0 ? (
            <Message variant="info">No news articles found</Message>
          ) : (
            <>
              <Row>
                {searchResults.map((article) => (
                  <Col key={article.url} sm={12} md={6} lg={4} className="mb-4">
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

export default RussiaUkraineWarPage;
