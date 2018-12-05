import { bindActionCreators } from 'redux';
import { Action, StoreState  } from '../../types/';
import { connect, Dispatch } from 'react-redux';
import BookDetailComponent, { Props, DispProps } from '../../components/book-detail';
import { getBook, bookDetailPurchase, transferBook } from '../../actions/book-detail';

const mapStateToProps = (state: StoreState): Props => ({
  book: state.bookDetail.book,
  isMyBook: state.bookDetail.isMyBook,
  loading: state.bookDetail.loading,
  tranfering: state.bookDetail.transfering,
  purchasing: state.bookDetail.purchasing,
  error: state.bookDetail.error,
  configLoading: state.configuration.loading,
  currentAddress: state.configuration.currentAddress,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispProps => ({
  getBook: bindActionCreators((contentHash) => getBook(contentHash), dispatch),
  purchaseContent: bindActionCreators((contentHash: string, price: number) => bookDetailPurchase({contentHash, price}), dispatch),
  transferBook: bindActionCreators((to, contentHash) => transferBook({to, contentHash}), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailComponent);
