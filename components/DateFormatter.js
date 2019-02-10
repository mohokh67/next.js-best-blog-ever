import moment from 'moment';

export default props => <span>{moment.unix(props.timestamp).fromNow()}</span>;
