import classes from './comment-list.module.css'

function CommentList({items}) {
  if (!items || items.length === 0) {
    return <p>No comments yet.</p>
  }

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items.map(item => {
        return <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      })}
    </ul>
  )
}

export default CommentList
