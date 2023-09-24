import { Component } from 'react';
import css from './Searchbar.module.css';
import { CiSearch } from 'react-icons/ci';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '280px',
  position: 'top',
  distance: '60px',
  opacity: 1,
});

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    if (query.trim() === '') {
      return Notiflix.Notify.warning('Enter the text in the search field');
    }
    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.formBtn}>
            <CiSearch className={css.formIcon} />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
