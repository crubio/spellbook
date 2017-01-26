import React, { PropTypes } from 'react'

const SpellPosts = ({posts}) => (
  <div className="spell-book-container">
    {posts.map((post, i) =>
      <ul key={i} className="panel panel-default">
        <li className="panel-heading"><h3>{post.name}</h3></li>
        <li className="panel-body" dangerouslySetInnerHTML={{ __html: post.desc }} ></li>
        <li className="panel-body"><strong>page: </strong>{post.page}</li>
        <li className="panel-body"><strong>range: </strong>{post.range}</li>
        <li className="panel-body"><strong>req' components: </strong>{post.components}</li>
        <li className="panel-body"><strong>mats: </strong>{post.material}</li>
        <li className="panel-body"><strong>ritual: </strong>{post.ritual}</li>
        <li className="panel-body"><strong>duration: </strong>{post.duration}</li>
        <li className="panel-body"><strong>concentration: </strong>{post.concentration}</li>
        <li className="panel-body"><strong>time to cast: </strong>{post.casting_time}</li>
        <li className="panel-body"><strong>spell lvl: </strong>{post.level}</li>
        <li className="panel-body"><strong>school: </strong>{post.school}</li>
        <li className="panel-body"><strong>class: </strong>{post.class}</li>
      </ul>
    )}
  </div>
)

SpellPosts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default SpellPosts
