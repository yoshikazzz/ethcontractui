import * as React from 'react';
import { CircularProgress, IconButton } from 'material-ui';
import { GridList, GridTile } from 'material-ui/GridList';
import { Content } from '../../actions/store';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import LinearProgress from 'material-ui/LinearProgress';

import './index.css';

export interface Props {
  contents: Content[];
  loading: boolean;
  purchasing: boolean;
  error: string;
}

export interface DispProps {
  listStoreContents();
  purchaseContent(contentHash: string, price: number);
}

type IProps = Props & DispProps;
type State = {
  contentIsChoosing: number,
};

export default class Store extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      contentIsChoosing: -1,
    };
  }

  componentWillMount() {
    this.props.listStoreContents();
  }
  render() {
    const { loading, purchasing, error } = this.props;
    if (loading) {
      return <CircularProgress size={50} thickness={5} />;
    }
    return (
      <div>
        {purchasing ? <LinearProgress mode="indeterminate" /> : null}
        <div className="content">
          {error ? <div>{error}</div> : null}
          <GridList
            cellHeight={180}
          >
            {this.props.contents.map((content) => (
              <GridTile
                key={content.contentPath}
                title={`Title: ${content.title}`}
                subtitle={<span>Price: <b>{`${content.price} ETH`}</b></span>}
                actionIcon={<IconButton onClick={(e) => this.handleClickPurchase(content, e)}>
                              <ActionShoppingCart />
                            </IconButton>}
              >
                <img onClick={() => this.onOpenContent(content)} className="content-thumbnail" src={content.thumbnail} />
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }

  private handleClickPurchase = (content, e) => {
    e.stopPropagation();
    this.props.purchaseContent(content.contentHash, content.price);
  }

  private onOpenContent = (content: Content) => {
    const win = window.open(`/#/book/${content.contentHash}`, '_blank');
    if (win) {
      win.focus();
    }
  }
}