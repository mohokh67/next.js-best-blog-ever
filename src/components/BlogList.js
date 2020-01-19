import BlogItem from './BlogItem';

export default (props) => (
  <div>
    {props.blogs.map((blog) => (
      <BlogItem key={blog.id} blog={blog} />
    ))}
  </div>
);
