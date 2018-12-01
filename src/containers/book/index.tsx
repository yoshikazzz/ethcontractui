import { bindActionCreators } from 'redux';
import { Action, StoreState  } from '../../types/';
import { connect, Dispatch } from 'react-redux';
import BookComponent, { Props, DispProps } from '../../components/book';
import { listBooks, transferBook } from '../../actions/book';

const mapStateToProps = (state: StoreState): Props => ({
  books: state.book.books,
  loading: state.book.loading,
  tranfering: state.book.transfering,
  purchasing: state.store.purchasing,
  bookError: state.book.error,
  storeError: state.store.error,
  configLoading: state.configuration.loading,
  currentAddress: state.configuration.currentAddress,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispProps => ({
  listBooks: bindActionCreators(listBooks, dispatch),
  transferBook: bindActionCreators((to, contentHash) => transferBook({to, contentHash}), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookComponent);
