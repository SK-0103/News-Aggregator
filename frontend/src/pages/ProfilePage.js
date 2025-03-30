import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container, Card, Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaBookmark, FaNewspaper } from 'react-icons/fa';
import Message from '../components/layout/Message';
import Loader from '../components/layout/Loader';
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstants';
import NewsCard from '../components/news/NewsCard';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  // Simulated saved articles for demonstration
  // In a real app, these would come from an API endpoint
  const [savedArticles, setSavedArticles] = useState([
    {
      _id: 'saved1',
      title: 'Example Saved Article 1',
      description: 'This is an example of a saved article for demonstration purposes.',
      urlToImage: 'https://via.placeholder.com/800x400?text=News+Image',
      publishedAt: new Date().toISOString(),
      source: {
        name: 'Example Source',
        logoUrl: 'https://via.placeholder.com/100x50?text=Logo'
      },
      politicalBias: 'center'
    },
    {
      _id: 'saved2',
      title: 'Example Saved Article 2',
      description: 'This is another example of a saved article for demonstration purposes.',
      urlToImage: 'https://via.placeholder.com/800x400?text=News+Image',
      publishedAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
      source: {
        name: 'Another Source',
        logoUrl: 'https://via.placeholder.com/100x50?text=Logo'
      },
      politicalBias: 'center-left'
    }
  ]);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  useEffect(() => {
    if (success) {
      setSuccessMessage('Profile updated successfully');
      // Clear success message after 3 seconds
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      setPassword('');
      setConfirmPassword('');
    }
  };

  const removeArticle = (id) => {
    // In a real app, this would dispatch an action to remove the article from saved items
    setSavedArticles(savedArticles.filter(article => article._id !== id));
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={12} className="mb-4">
          <h1 className="mb-4">My Profile</h1>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Tabs defaultActiveKey="profile" id="profile-tabs" className="mb-4">
            <Tab eventKey="profile" title={<span><FaUser className="me-2" /> Profile Settings</span>}>
              <Card className="shadow-sm p-4">
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {successMessage && <Message variant="success">{successMessage}</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password (leave blank to keep current)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Update Profile
                  </Button>
                </Form>
              </Card>
            </Tab>

            <Tab eventKey="saved" title={<span><FaBookmark className="me-2" /> Saved Articles</span>}>
              <Card className="shadow-sm p-4">
                <h4 className="mb-4">Your Saved Articles</h4>
                {savedArticles.length === 0 ? (
                  <Message variant="info">You don't have any saved articles yet</Message>
                ) : (
                  <Row>
                    {savedArticles.map((article) => (
                      <Col key={article._id} sm={12} md={6} className="mb-4">
                        <NewsCard article={article} />
                        <div className="text-end mt-2">
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => removeArticle(article._id)}
                          >
                            Remove from Saved
                          </Button>
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
              </Card>
            </Tab>

            <Tab eventKey="preferences" title={<span><FaNewspaper className="me-2" /> News Preferences</span>}>
              <Card className="shadow-sm p-4">
                <h4 className="mb-4">Customize Your News Feed</h4>
                <Form>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="preferredCategories">
                        <Form.Label>Preferred Categories</Form.Label>
                        <div>
                          {['Politics', 'Business', 'Technology', 'Entertainment', 'Sports', 'Science'].map((category) => (
                            <Form.Check
                              key={category}
                              type="checkbox"
                              id={`category-${category.toLowerCase()}`}
                              label={category}
                              className="mb-2"
                            />
                          ))}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="preferredSources">
                        <Form.Label>Preferred Sources</Form.Label>
                        <div>
                          {['CNN', 'BBC', 'Fox News', 'Reuters', 'AP', 'The New York Times'].map((source) => (
                            <Form.Check
                              key={source}
                              type="checkbox"
                              id={`source-${source.replace(/\s+/g, '-').toLowerCase()}`}
                              label={source}
                              className="mb-2"
                            />
                          ))}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>Political Spectrum Preference</Form.Label>
                    <Form.Range />
                    <div className="d-flex justify-content-between">
                      <small>Left</small>
                      <small>Center</small>
                      <small>Right</small>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Email Notifications</Form.Label>
                    <Form.Check
                      type="switch"
                      id="daily-digest"
                      label="Daily News Digest"
                      className="mb-2"
                    />
                    <Form.Check
                      type="switch"
                      id="breaking-news"
                      label="Breaking News Alerts"
                      className="mb-2"
                    />
                    <Form.Check
                      type="switch"
                      id="weekly-summary"
                      label="Weekly Summary"
                      className="mb-2"
                    />
                  </Form.Group>

                  <Button variant="primary">
                    Save Preferences
                  </Button>
                </Form>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
