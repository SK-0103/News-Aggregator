import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <h5>News Aggregator</h5>
            <p className="text-muted">
              Compare news from different perspectives and sources, all in one place.
            </p>
          </Col>
          <Col md={3} className="mb-3 mb-md-0">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white">Home</a>
              </li>
              <li>
                <a href="/news" className="text-white">News</a>
              </li>
              <li>
                <a href="/sources" className="text-white">Sources</a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/news/category/politics" className="text-white">Politics</a>
              </li>
              <li>
                <a href="/news/category/business" className="text-white">Business</a>
              </li>
              <li>
                <a href="/news/category/technology" className="text-white">Technology</a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="my-3 bg-secondary" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} News Aggregator. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
