import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Profile.css';
import { ProfileContext } from '../context/ProfileProvider';

function Profile() {
  const { getEmail, submitButton } = useContext(ProfileContext);
  return (
    <>
      <Header />
      <section className="profile-container">
        <h3 data-testid="profile-email">{ getEmail ? getEmail.email : []}</h3>
        <div className="btn-container">
          <button
            data-testid="profile-done-btn"
            type="button"
            onClick={ () => submitButton('done') }
          >
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            type="button"
            onClick={ () => submitButton('favorite') }
          >
            Favorite Recipes
          </button>
          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={ () => submitButton('logout') }
          >
            Logout
          </button>
        </div>
      </section>
      <Footer />

    </>
  );
}

export default Profile;
