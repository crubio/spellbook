import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import SpellPosts from '../components/SpellPosts'
import ReactDOM from 'react-dom'

class App extends Component {
  static propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = {search: ''};
  }


  handleSearch = event => {
    this.setState({search: event.target.value.toLowerCase()});
  }

  componentDidMount() {
    const { dispatch, selectedReddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
  }

  handleChange = nextReddit => {
    this.props.dispatch(selectReddit(nextReddit))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedReddit } = this.props
    dispatch(invalidateReddit(selectedReddit))
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  render() {
    console.log('the state: ',this.state);
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    const search = this.state.search;

    /* handle filtering */
    let filteredPosts = this.props.posts.filter(function(row){
      name = row.name.toLowerCase();
      if (name.indexOf(search) > -1) {
        return row;
      }
    })

    this.handleSearch = this.handleSearch.bind(this)

    switch (selectedReddit) {
      case('spellbook'):
        return (
          <div>
            <Picker value={selectedReddit}
                    onChange={this.handleChange}
                    options={[ 'DnDnext', 'spellbook' ]} />

            {!isFetching &&
              <form onSubmit={this.handleSearch}>
                <label>
                  Search:  <input
                  defaultValue=''
                  type="text"
                  ref={(input) => this.input = input}
                  onChange={this.handleSearch.bind(this)} />
                </label>
              </form>
            }

            <p className="picker-data">
              {lastUpdated &&
                <span>
                  Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                  This is type '{selectedReddit}'.
                  {' '}
                </span>
              }
              {!isFetching &&
                <a href="#"
                   onClick={this.handleRefreshClick}>
                  Refresh
                </a>
              }
            </p>

            {isEmpty
              ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
              : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                  <SpellPosts posts={filteredPosts} />
                </div>
            }
          </div>
        )
      default:
        return (
          <div>
            <Picker value={selectedReddit}
                    onChange={this.handleChange}
                    options={[ 'DnDnext', 'spellbook' ]} />
            <p>
              {lastUpdated &&
                <span>
                  Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                  This is type '{selectedReddit}'.
                  {' '}
                </span>
              }
              {!isFetching &&
                <a href="#"
                   onClick={this.handleRefreshClick}>
                  Refresh
                </a>
              }
            </p>

            {isEmpty
              ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
              : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                  <Posts posts={posts} />
                </div>
            }
          </div>
        )
    }
  }
}

const mapStateToProps = state => {
  const { selectedReddit, postsByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
