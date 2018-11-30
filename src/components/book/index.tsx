import * as React from 'react';
import { Content } from '../../actions/book';

export interface Props {
  books: Content[];
  loading: boolean;
  error: string;
}

export interface DispProps {
  listBooks();
}

type IProps = Props & DispProps; 
type State = {
  contentIsChoosing: number,
};

export default class BookComponent extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      contentIsChoosing: -1,
    };
  }

  componentWillMount() {
    this.props.listBooks();
  }
  render() {
    return (
      <div>
        My books
      </div>
    );
  }
}