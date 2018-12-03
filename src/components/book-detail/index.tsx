// tslint:disable:no-string-literal

import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Content } from '../../actions/book';
import { CircularProgress, FlatButton } from 'material-ui';
import { Card, CardHeader, CardMedia, CardActions } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';

import './index.css';

const styles = {
  img: {
    minWidth: '20%',
    maxWidth: '50%',
    width: '35%'
  }
};

export interface Props {
  book: Content;
  loading: boolean;
  tranfering: boolean;
  purchasing: boolean;
  bookError: string;
  configLoading: boolean;
  currentAddress: string;
}

export interface DispProps {
  getBook(contentHash: string);
  purchaseContent(contentHash: string, price: number);
  transferBook(to: string, contentHash: string);
}

type IProps = Props & DispProps & RouteComponentProps<{contentHash: string}>; 
type State = {
  contentHash: string,
  transferTo: string,
};

export default class BookDetailComponent extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      contentHash: this.props.match.params.contentHash,
      transferTo: '',
    };
  }

  componentDidMount() {
    this.props.getBook(this.state.contentHash);
  }

  render() {
    const { loading, configLoading, book } = this.props;
    if (loading || configLoading) {
      return <CircularProgress size={50} thickness={5} />;
    }
    return (
      <div >
        {this.props.tranfering ? <LinearProgress mode="indeterminate" /> : null}
        <div className="content">
          <Card>
            <CardHeader
              subtitleStyle={{}}
              title={`ID: ${book.contentHash}`}
              subtitle={
                <>
                <div>
                <span>Title: {book.title}</span>
                </div>
                <div>
                <span>Price: {book.price}</span>
                </div>
                </>
              }
            />
            <CardMedia>
              <img src={book.thumbnail} style={styles.img} />
            </CardMedia>
            <CardActions>
              <FlatButton key="send" label="Purchase" primary={true} onClick={(e) => this.handleClickPurchase(book, e)} />,
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }

  private handleClickPurchase = (book, e) => {
    e.stopPropagation();
    this.props.purchaseContent(book.contentHash, book.price);
  }
}
