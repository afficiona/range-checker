import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moviesActions from './../../actions/movies';

import './styles.scss';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onFilterSet = (e, type) => {
      const { value } = e.target;
      this.props.actions.setFilter(type, value);

      const filters = {};
      if (this.props.LangaugeFilter) {
        filters.EventLanguage = this.props.LangaugeFilter;
      }
      if (this.props.GenreFilter) {
        filters.EventGenre = this.props.GenreFilter;
      }
      console.log(this.props.LangaugeFilter, this.props.GenreFilter);
      this.props.actions.getMoviesList({
        ...filters,
        [type]: value
      });
    }
  }

  render() {
    return (
      <div className="app__header">
        {this.props.LanguagesList && (
          <div className="app__header__toolbar">
            <select name="languageFilter" onChange={e => this.onFilterSet(e, 'EventLanguage')}>
              {this.props.LanguagesList.map(language => (
                <option value={language}>{language}</option>
              ))}
            </select>
          </div>
        )}
        {this.props.GenresList && (
          <div className="app__header__toolbar">
            <select name="genreFilter" onChange={e => this.onFilterSet(e, 'EventGenre')}>
              {this.props.GenresList.map(genres => (
                <option value={genres}>{genres}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  
};

function mapStateToProps({ Movies }) {
  return {
    IsLanguagesLoading: Movies.getIn(['filters', 'languages', 'isFetching']),
    LanguagesError: Movies.getIn(['filters', 'languages', 'error']),
    LanguagesList: Movies.getIn(['filters', 'languages', 'data']),

    IsGenresLoading: Movies.getIn(['filters', 'genres', 'isFetching']),
    GenresError: Movies.getIn(['filters', 'genres', 'error']),
    GenresList: Movies.getIn(['filters', 'genres', 'data']),

    LangaugeFilter: Movies.getIn(['filters', 'selected', 'EventLanguage']),
    GenreFilter: Movies.getIn(['filters', 'selected', 'EventGenre']),
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    ...moviesActions,
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

