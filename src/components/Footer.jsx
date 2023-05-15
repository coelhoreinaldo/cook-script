import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../style/Footer.css';

function Footer() {
  const history = useHistory();
  const location = history.location.pathname;
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <button
        type="button"
        className={ location.includes('drinks') ? 'selected' : 'unselected' }
        onClick={ () => history.push('/drinks') }
      >
        <img
          src={ drinkIcon }
          alt="drinks-button"
          data-testid="drinks-bottom-btn"
        />
      </button>

      <button
        type="button"
        className={ location.includes('meals') ? 'selected' : 'unselected' }
        onClick={ () => history.push('/meals') }
      >
        <img
          src={ mealIcon }
          alt="meals-button"
          data-testid="meals-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
