import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ProfileContext } from '../context/ProfileProvider';

function Profile() {
  const { getEmail, submitButton } = useContext(ProfileContext);
  return (
    <div>
      <Header />
      <section>
        <h2 data-testid="profile-email">{ getEmail }</h2>
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
        <button data-testid="profile-logout-btn" type="button">Logout</button>
      </section>
      <Footer />

    </div>
  );
}

export default Profile;
