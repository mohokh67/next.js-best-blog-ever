import Link from 'next/link';

export default (props) => {
  if (props.show) {
    return (
      <div className="notification is-danger">
        <p>
          <strong>Unfortunately</strong> we can't validate your user.Try to{' '}
          <strong>sign out</strong> from the top right corner of this page and
          login agian and if you still have the same issue contact our{' '}
          <Link href="#">
            <a>support team</a>
          </Link>
          .
        </p>
      </div>
    );
  }
  return null;
};
