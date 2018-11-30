// tslint:disable:no-string-literal

import * as React from 'react';
import { Content } from '../../actions/book';
import { CircularProgress, IconButton } from 'material-ui';
import { GridList, GridTile } from 'material-ui/GridList';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';

export interface Props {
  books: Content[];
  loading: boolean;
  error: string;
  configLoading: boolean;
  currentAddress: string;
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

  componentWillReceiveProps(nextProps: IProps) {
    const { configLoading, currentAddress } = nextProps;
    if (!configLoading && (this.props.configLoading || currentAddress !== this.props.currentAddress)) {
      nextProps.listBooks();
    }
  }

  render() {
    const { loading, configLoading } = this.props;
    if (loading || configLoading) {
      return <CircularProgress size={50} thickness={5} />;
    }
    return (
      <div >
        <GridList
          cellHeight={180}
        >
          {this.props.books.map((content) => (
            <GridTile
              key={content.contentPath}
              title={`Title: ${content.title}`}
              subtitle={<span>Price: <b>{`${content.price} ETH`}</b></span>}
              actionIcon={<IconButton onClick={(e) => this.handleClickPurchase(content, e)}><ActionShoppingCart /></IconButton>}
            >
              <img src={content.thumbnail} />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }

  private handleClickPurchase = (content, e) => {
    console.log('click');
  }
}