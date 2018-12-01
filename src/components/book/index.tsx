// tslint:disable:no-string-literal

import * as React from 'react';
import { Content } from '../../actions/book';
import { CircularProgress, IconButton } from 'material-ui';
import { GridList, GridTile } from 'material-ui/GridList';
import ContentSend from 'material-ui/svg-icons/content/send';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';

import './index.css';

export interface Props {
  books: Content[];
  loading: boolean;
  tranfering: boolean;
  purchasing: boolean;
  bookError: string;
  storeError: string;
  configLoading: boolean;
  currentAddress: string;
}

export interface DispProps {
  listBooks();
  transferBook(to: string, contentHash: string);
}

type IProps = Props & DispProps; 
type State = {
  selectedContent: string,
  transferTo: string,
};

export default class BookComponent extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedContent: '',
      transferTo: '',
    };
  }

  componentDidMount() {
    this.props.listBooks();
  }

  componentWillReceiveProps(nextProps: IProps) {
    const { configLoading, currentAddress, purchasing, storeError, tranfering, bookError } = nextProps;
    if ((!configLoading && (this.props.configLoading || currentAddress !== this.props.currentAddress)) ||
        (!purchasing && this.props.purchasing && !storeError) ||
        (!tranfering && this.props.tranfering && !bookError)) {
      nextProps.listBooks();
    }
  }

  get sendView() {
    const actions = [
      <FlatButton key="send" label="Send" primary={true} onClick={this.onTransferContent} />,
    ];
    return (
      <Dialog
        title="Tranfer content"
        actions={actions}
        modal={false}
        open={!!this.state.selectedContent}
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
    const { loading, configLoading } = this.props;
    if (loading || configLoading) {
      return <CircularProgress size={50} thickness={5} />;
    }
    return (
      <div >
        {this.props.tranfering ? <LinearProgress mode="indeterminate" /> : null}
        <div className="content">
          {this.props.bookError ? <div>{this.props.bookError}</div> : null}
          <GridList
            cellHeight={180}
            padding={30}
          >
            {this.props.books.map((content) => (
              <GridTile
                key={content.contentPath}
                title={`Title: ${content.title}`}
                subtitle={<span>Price: <b>{`${content.price} ETH`}</b></span>}
                actionIcon={<IconButton onClick={(e) => this.onSelectContent(content, e)}><ContentSend /></IconButton>}
              >
                <img src={content.thumbnail} />
              </GridTile>
            ))}
          </GridList>
        </div>
        {this.sendView}
      </div>
    );
  }

  private onSelectContent = (content: Content, e) => {
    this.setState({selectedContent: content.contentHash});
  }

  private handleClose = () => {
    this.setState({selectedContent: '', transferTo: ''});
  }

  private onChangeAddress = (e, newValue) => {
    this.setState({transferTo: newValue});
  }

  private onTransferContent = () => {
    const { transferTo, selectedContent } = this.state;
    console.log(transferTo, selectedContent);
    this.setState({selectedContent: '', transferTo: ''});
    this.props.transferBook(transferTo, selectedContent);
  }
}
