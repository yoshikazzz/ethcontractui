import { bindActionCreators } from 'redux';
import { Action, StoreState  } from '../../types/';
import { connect, Dispatch } from 'react-redux';
import BookComponent, { Props, DispProps } from '../../components/book';
import { listBooks } from '../../actions/book';

const mapStateToProps = (state: StoreState): Props => ({
  books: state.book.books,
  loading: state.book.loading,
  error: state.book.error,
  configLoading: state.configuration.loading,
  currentAddress: state.configuration.currentAddress,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispProps => ({
  listBooks: bindActionCreators(listBooks, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookComponent);
