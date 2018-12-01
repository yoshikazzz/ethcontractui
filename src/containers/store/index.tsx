import { bindActionCreators } from 'redux';
import { Action, StoreState  } from '../../types/';
import { connect, Dispatch } from 'react-redux';
import StoreComponent, { Props, DispProps } from '../../components/store';
import { storeListContents, storePurchaseContent } from '../../actions/store';

const mapStateToProps = (state: StoreState): Props => ({
  contents: state.store.contents,
  loading: state.store.loading,
  purchasing: state.store.purchasing,
  error: state.store.error,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispProps => ({
  listStoreContents: bindActionCreators(storeListContents, dispatch),
  purchaseContent: bindActionCreators((contentHash: string, price: number) => storePurchaseContent({contentHash, price}), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreComponent);
