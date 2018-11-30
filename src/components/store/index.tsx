import * as React from 'react';
import { CircularProgress, IconButton } from 'material-ui';
import { GridList, GridTile } from 'material-ui/GridList';
import { Content } from '../../actions/store';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';

export interface Props {
  contents: Content[];
  loading: boolean;
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
    return (
      <div>
        {this.props.loading ? <CircularProgress size={50} thickness={5} /> : null}
        <div >
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
                <img src={content.thumbnail} />
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }

  private handleClickPurchase = (content, e) => {
    this.props.purchaseContent(content.contentHash, content.price);
  }
}