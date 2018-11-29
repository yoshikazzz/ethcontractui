import * as React from 'react';
import { Content } from '../../actions/store';

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
        {`Content count: ${this.props.contents.length}`}
        {
          this.props.contents.map(content => (
            <div
              key={content.contentPath}
              onClick={() => {
                this.props.purchaseContent(content.contentHash, content.price);
              }}
            >
              <span>{`Title: ${content.title}, Price: ${content.price} Finney`}</span>
            </div>
          ))
        }
      </div>
    );
  }
}