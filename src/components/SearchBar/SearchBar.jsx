import { useState } from 'react';
import css from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleInputChange = e => {
    setValue(e.currentTarget.value.toLowerCase().trim());
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit(value);
    setValue(value);
  };

  return (
    <header className={css.SearchBar}>
      <form onSubmit={handleFormSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={value}
        />
      </form>
    </header>
  );
};

export default SearchBar;

// handleInputChange = e => {
//   this.setState({ value: e.currentTarget.value.toLowerCase().trim() });
// };

// handleFormSubmit = e => {
//   e.preventDefault();
//   this.props.onSubmit(this.state.value);
//   this.setState({ value: '' });
// };
