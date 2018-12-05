// tslint:disable:no-string-literal

import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Content } from '../../actions/book';
import { CircularProgress, FlatButton, Dialog, TextField } from 'material-ui';
import { Card, CardHeader, CardMedia, CardActions } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';

import './index.css';

const styles: { [key: string]: React.CSSProperties } = {
  cardMedia: {
    backgroundColor: '#f8f8f8',
  },
  img: {
    display: 'block',
    margin: 'auto auto',
    minWidth: '20%',
    maxWidth: '50%',
    width: '35%'
  },
  flatButton: {
    
  }
};

export interface Props {
  book: Content;
  isMyBook: boolean;
  loading: boolean;
  tranfering: boolean;
  purchasing: boolean;
  error: string;
  configLoading: boolean;
  currentAddress: string;
}

export interface DispProps {
  getBook(contentHash: string);
  purchaseContent(contentHash: string, price: number);
  transferBook(to: string, contentHash: string);
}

type IProps = Props & DispProps & RouteComponentProps<{ contentHash: string }>;
type State = {
  contentHash: string,
  transferTo: string,
  isOpenTransfer: boolean,
};

export default class BookDetailComponent extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      contentHash: this.props.match.params.contentHash,
      transferTo: '',
      isOpenTransfer: false,
    };
  }

  componentDidMount() {
    this.props.getBook(this.state.contentHash);
  }

  componentWillReceiveProps(nextProps: IProps) {
    const { configLoading, currentAddress, purchasing, error, tranfering } = nextProps;
    if ((!configLoading && (this.props.configLoading || currentAddress !== this.props.currentAddress)) ||
        (!purchasing && this.props.purchasing && !error) ||
        (!tranfering && this.props.tranfering && !error)) {
        nextProps.getBook(this.state.contentHash);
    }
  }

  get actionButton () {
    const { book, isMyBook } = this.props;
    if (isMyBook) {
      return (
        <>
        <FlatButton key="view" label="View" primary={true} onClick={(e) => this.onOpenContent(book)} />
        <FlatButton key="tranfer" label="Transfer" primary={true} onClick={(e) => this.handleClickTransfer(e)} />
        </>
      );
    } else {
      return (
        <>
        <FlatButton key="send" label="Purchase" primary={true} onClick={(e) => this.handleClickPurchase(book, e)} />
        </>
      );
    }
  }

  get sendView() {
    const actions = [
      <FlatButton key="send" label="Send" primary={true} onClick={() => this.onTransferContent()} />,
    ];
    return (
      <Dialog
        title="Tranfer content"
        actions={actions}
        modal={false}
        open={!!this.state.isOpenTransfer}
        onRequestClose={this.handleClose}
      >
        <TextField
          hintText=""
          floatingLabelText="Transfer to"
          onChange={this.onChangeAddress}
        />
      </Dialog>
    );
  }

  render() {
    const { loading, configLoading, book } = this.props;
    if (loading || configLoading) {
      return <CircularProgress size={50} thickness={5} />;
    }
    return (
      <div >
        {this.props.tranfering || this.props.purchasing ? <LinearProgress mode="indeterminate" /> : null}
        <div className="content">
          {this.props.error ? <div>{this.props.error}</div> : null}
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
                    <span>Price: {book.price} ETH</span>
                  </div>
                </>
              }
            />
            <CardMedia mediaStyle={styles.cardMedia}>
              <img src={book.thumbnail} style={styles.img} />
            </CardMedia>
            <CardActions>
              {this.actionButton}
            </CardActions>
          </Card>
        </div>
        {this.sendView}
      </div>
    );
  }

  private handleClickPurchase = (book, e) => {
    e.stopPropagation();
    this.props.purchaseContent(book.contentHash, book.price);
  }

  private handleClickTransfer = (e) => {
    e.stopPropagation();
    this.setState({isOpenTransfer: true});    
  }

  private onOpenContent = (content: Content) => {
    const win = window.open(content.contentPath, '_blank');
    if (win) {
      win.focus();
    }
  }

  private handleClose = () => {
    this.setState({transferTo: '', isOpenTransfer: false});
  }

  private onChangeAddress = (e, newValue) => {
    this.setState({transferTo: newValue});
  }

  private onTransferContent = () => {
    const { transferTo } = this.state;
    const { book } = this.props;
    this.setState({transferTo: '', isOpenTransfer: false});
    this.props.transferBook(transferTo, book.contentHash);
  }
}
